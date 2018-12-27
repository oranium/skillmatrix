from controller.database import db
from model.profile_model import ProfileModel
from model.skill_model import SkillModel
from model.milestone_model import MilestoneModel
from model.database_model import Association, MilestoneAssociation, Skill, Date, Users, Hierachy


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
    def set_skills(username, skills):
        """ Set a number of skills to given level for given user.
            Args:
                username (str): username to set skill for.
                skills (dict(str=int)): The skill names and levels to add.
            Raises:
                NameError: if skill name is not in the database.
        """
        cdate = Date()
        user = database_controller.get_user(username)
        db.session.add(cdate)
        db.session.commit()
        for skill, level in skills.items():
            new_skill = database_controller.get_skill(skill)
            if not new_skill:
                raise NameError('The Skill {0} does not exist in the database!'.format(skill))
            database_controller.add_milestone(username, skill, cdate.date, "Level {0}".format(level), level)
            assoc = Association(level=level)
            assoc.skill_assoc = new_skill
            assoc.date_assoc = cdate
            assoc.users_assoc = user
        db.session.commit()

    @staticmethod
    def add_milestone(username, skill, date, comment, level):
        user = database_controller.get_user(username)
        mskill = database_controller.get_skill(skill)
        mdate = Date(date=date)
        db.session.add(mdate)
        m = MilestoneAssociation(comment=comment, level=level)
        m.skill_milestone_assoc = mskill
        m.date_milestone_assoc = mdate
        m.users_milestone_assoc = user
        db.session.commit()

    @staticmethod
    def get_milestones(username, skillname):
        muser = database_controller.get_user_id(username)
        mskillid = database_controller.get_skill_id(skillname)
        milestonelist = MilestoneAssociation.query.filter(MilestoneAssociation.milestone_users_id == muser,
                                                          MilestoneAssociation.milestone_skill_id == mskillid).all()
        milestone_models = []
        for milestone in milestonelist:
            date = database_controller.get_date_from_id(milestone.milestone_date_id).date
            level = milestone.level
            milestone_models.append(MilestoneModel(date, milestone.comment, level))
        return milestone_models

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
    def get_sub_categorys(parent):
    #parent is a skillname
        childlist= Hierachy.query.filter_by().all()


    @staticmethod
    def create_hierachy(parent,child):
    #parent and child are skillnames
        parentobject= database_controller.get_skill(parent)
        childobject= database_controller.get_skill(child)
        x = Hierachy()
        x.parent_skill_assoc = parentobject
        x.child_skill_assoc = childobject
        db.session.add(x)
        db.session.commit()



    @staticmethod
    def get_all_skill_names():
        skills = Skill.query.all()
        skill_names = []
        for skill in skills:
            skill_names.append(skill.name)
        return skill_names

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
    def get_date_from_id(date_id):
        return Date.query.filter_by(id=date_id).first()

    @staticmethod
    def get_user_from_id(user_id):
        return Users.query.filter_by(id=user_id).first()

    @staticmethod
    def get_skill_from_id(skill_id):
        return Skill.query.filter_by(id=skill_id).first()

    @staticmethod
    def create_skill(skillname, category):
        """Create a skill in the database.
           Args:
                skillname (str): Name of the skill to add.
                category (str, None): Category that the skill belongs to. Root level category if None
        """
        skill = Skill(name=skillname, category=category)
        db.session.add(skill)
        db.session.commit()

    @staticmethod
    def exists(username):
        """Check if a user exists in the database.
           Args:
               username (str): the username to check
            Returns:
                bool: True if user exists, false otherwise.
        """
        if Users.query.filter_by(username=username).first():
            return True
        return False

    @staticmethod
    def get_skills(username):
        """Get all skills of a user and return them as a `list` of `SkillModel`s
            Args:
                username (`str`): whose skills to return
            Returns:
                `[SkillModel]`  
        """
        if database_controller.exists(username):
            user_id = Users.query.filter_by(username=username).first().id
            assocs = Association.query.filter_by(users_id=user_id).all()
            skill_models = []
            found_skills = []
            for assoc in assocs:
                skill = database_controller.get_skill_from_id(assoc.skill_id)
                if skill not in found_skills:
                    milestones = database_controller.get_milestones(username, skill.name)
                    level = database_controller.get_recent_level(skill.id, user_id)
                    skill_models.append(SkillModel(skill.name, level, category=skill.category, milestones=milestones))
                    found_skills.append(skill)
            return skill_models
        return None

    @staticmethod
    def create_user(username, name):
        """Create a user in the database.
           Args:
               username (str): the username of the user to add - should be identical to the Active Directory username.
               name (str): The full name of the user to add.
        """
        db.session.add(Users(username=username, name=name))
        db.session.commit()

    @staticmethod
    def get_recent_level(skill_id, user_id):
        return Association.query.filter(Association.skill_id == skill_id,
                                        Association.users_id == user_id).all()[-1].level

    @staticmethod
    def get_profile_models(users):
        """[Users] -> [ProfileModel]"""
        profile_models = []
        # iterate over the users
        for user in users:
            # gets the SkillModels of the user
            skill_models = database_controller.get_skills(user.username)
            # creates ProfileModel from username and list of SkillModel
            profile_models.append(ProfileModel(user.username, user.username, skill_models))
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
