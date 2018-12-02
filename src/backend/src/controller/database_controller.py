import parentdir
from src.controller.database import db
from src.model.database_model import Association, MilestoneAssociation, Skill, Time, Users


class DatabaseController:
    """Class to handle everything about table-manipulation"""

    @staticmethod
    def search(query):
        """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
        Search through all users with a query from the backend controller.
        Finds all users that fulfill all restrictions, and all users that fulfill some but not all.
        """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
        has_some = []
        # list of all users
        users = database_controller.get_all_users()
        has_all = users
        for user in users:
            for skill, min_level in query.items():
                # check if user has each skill on required level, add to has_all
                skill_id = database_controller.get_skill_id(skill)
                skill_assoc = database_controller.get_assoc(skill_id=skill_id, level=min_level)
                if user in skill_assoc:
                    if user not in has_some:
                        has_some.add(user)
                else:
                    has_all.remove(user)
        for user in has_all:
            if user in has_some:
                has_some.remove(user)

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
        m = MilestoneAssociation(name=name)
        m.user_assoc = user
        m.time_assoc = mdate
        mskill.milestone_association.append(m)
    
    @staticmethod
    def get_all_users():
        return Users.query.all()

    @staticmethod
    def get_skill_id(skillname):
        return Skill.query.filter_by(name=skillname).first().id

    @staticmethod
    def get_assoc(**kwargs):
        return Association.query.filter_by(**{key: value for key, value in kwargs if value is not None}).all()

    @staticmethod
    def get_skill(skillname):
        return Skill.query.filter_by(name=skillname).first()

    @staticmethod
    def get_user(username):
        return Users.query.filter_by(username=username).first()


database_controller = DatabaseController()
