import parentdir
import sys

from model.profile_model import ProfileModel
from model.skill_model import SkillModel
from src.controller.database import db
from src.model.database_model import Association, MilestoneAssociation, Skill, Time, Users


class DatabaseController:
    """Class to handle everything about table-manipulation"""

    @staticmethod
    def search(query):
        """ dict(str=int) -> dict(str=[ProfileModel],str=[ProfileModel]
        Search through all users with a query from the backend controller.
        Finds all users that fulfill all restrictions, and all users that fulfill some but not all.
        """
        has_some = []
        # list of all users
        users = database_controller.get_all_users()
        # has_all starts off with every user, removes those who don't have one of the required skills
        has_all = users.copy()
        # iterate through every user and look up their skills
        for user in users:
            print("searching through skills of " + user.username)
            for skill, min_level in query.items():
                # get the skill_id from the database
                skill_id = database_controller.get_skill_id(skill)
                # get the association of the user with current skill and according minimum level
                skill_assoc = database_controller.get_assocs(users_id=user.id,
                                                             skill_id=skill_id,
                                                             level=min_level,
                                                             type="first")
                # skill_assoc will be None if the user does not have the skill on the desired level or higher
                if skill_assoc is not None:
                    print("{0} has {1} at least on level {2}".format(user.username, skill, min_level))
                    # adds user to has_some, in case he does not have other skills
                    if user not in has_some:
                        has_some.append(user)
                # if the user does not have the current skill at the required level, he gets removed from has_all
                else:
                    print("{0} has {1} not on level {2}".format(user.username, skill, min_level))
                    if user in has_all:
                        has_all.remove(user)
        # remove intersection of has_all and has_some
        for user in has_all:
            if user in has_some:
                has_some.remove(user)
        # extract ProfileModels from the results and return them in a dictionary
        has_all = database_controller.get_profile_models(has_all)
        has_some = database_controller.get_profile_models(has_some)
        # sort the results by descending order of sum of queried skills
        has_all.sort(key=lambda p: database_controller.sum_relevant_skills(p, list(query.keys())), reverse=True)
        has_some.sort(key=lambda p: database_controller.sum_relevant_skills(p, list(query.keys())), reverse=True)
        return dict(has_all=has_all, has_some=has_some)

    @staticmethod
    def set_skill(username, skills):
        ctime = Time()
        user = database_controller.get_username(username)
        db.session.add(ctime)
        for skill, level in skills.items():
            new_skill = database_controller.get_skill(skill)
            assoc = Association(level=level)
            assoc.skill_assoc = new_skill
            assoc.time_assoc = ctime
            assoc.users_assoc = user
        db.session.commit()

    @staticmethod
    def add_milestone(username, skill, date, name):
        user = database_controller.get_user(username)
        mskill = database_controller.get_skill(skill)
        mdate = Time(time=date)
        db.session.add(mdate)
        m = MilestoneAssociation(name=name)
        m.skill_milestone_assoc = mskill
        m.time_milestone_assoc = mdate
        m.users_milestone_assoc = user
        db.session.commit()

    @staticmethod
    def get_milestones(username, skillname):
        muser = database_controller.get_user_id(username)
        mskillid = database_controller.get_skill_id(skillname)
        milestonelist = MilestoneAssociation.query.filter(MilestoneAssociation.milestone_users_id == muser,
                                                          MilestoneAssociation.milestone_skill_id == mskillid).all()
        return milestonelist

    # TODO: un-hardcode this
    @staticmethod
    def get_assocs(**kwargs):
        if kwargs["type"] == "first":
            assoc = Association.query.filter(Association.level >= kwargs["level"],
                                             Association.users_id == kwargs["users_id"],
                                             Association.skill_id == kwargs["skill_id"]).first()
        else:
            assoc = Association.query.filter_by(users_id=kwargs["users_id"]).all()
        return assoc

    @staticmethod
    def get_all_users():
        return Users.query.all()

    @staticmethod
    def get_skill_id(skillname):
        return Skill.query.filter_by(name=skillname).first().id

    @staticmethod
    def get_skill(skillname):
        return Skill.query.filter_by(name=skillname).first()

    @staticmethod
    def get_user_id(username):
        return Users.query.filter_by(username=username).first().id

    @staticmethod
    def get_user(username):
        return Users.query.filter_by(username=username).first()

    @staticmethod
    def get_skill_from_id(skill_id):
        return Skill.query.filter_by(id=skill_id).first()

    @staticmethod
    def get_max_level(level, skill_id, user_id):
        return Association.query.filter(Association.level >= level,
                                        Association.skill_id == skill_id,
                                        Association.users_id == user_id).all()[-1].level

    @staticmethod
    def get_profile_models(users):
        """[Users] -> [ProfileModel]"""
        profile_models = []
        # iterate over the users
        for user in users:
            skill_models = []
            found_skills = []
            # finds all associations for the current user
            associations = database_controller.get_assocs(users_id=user.id, type="all")
            # searches for the highest level of each skill in associations and adds the resulting SkillModel to a list
            for association in associations:
                skill = database_controller.get_skill_from_id(association.skill_id)
                max_level = database_controller.get_max_level(association.level, skill.id, user.id)
                # a user can have up to 5 associations for the same skill - this prevents duplicates
                if skill.name not in found_skills:
                    skill_models.append(SkillModel(skill.name, max_level))
                    found_skills.append(skill.name)
            # creates ProfileModel from username and list of SkillModel
            profile_models.append(ProfileModel(user.username, skill_models))
        return profile_models

    @staticmethod
    def sum_relevant_skills(profile, skills):
        """ProfileModel,[str] -> int
        Takes a ProfileModel and a list of skills and checks for the sum of the levels of corresponding skills.
        Used as a key for ordering search results.
        """
        rel_sum = 0
        # look for every skill in list of skills
        for skill in skills:
            for skill_model in profile.skills:
                if skill_model.skill_name.lower() == skill.lower():
                    rel_sum += skill_model.level
        print("returning {0} for {1}".format(rel_sum, profile.username))
        return rel_sum


database_controller = DatabaseController()
