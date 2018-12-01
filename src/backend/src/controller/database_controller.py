import parentdir
from src.controller.database import db
from src.model.database_model import Association, MilestoneAssociation, Skill, Time, Users


class DatabaseController:
    """Class to handle everything about table-manipulation"""
    def add_skill(self, skill1, level1):
        """Adds skill to database."""
        object_name = skill(name = skill1, level = level1)
        db.session.add(object_name)
        db.session.commit()

    @staticmethod
    def add_user(username1):
        """Adds user to database. is optional and is NULL if not given."""
        object_name = users(username=username1)
        db.session.add(object_name)
        db.session.commit()

    @staticmethod
    def delete_user(username1):
        """Deletes a colum of the users-table, based on the given username."""
        delete_this = users.query.filter_by(username=username1).first()
        db.session.delete(delete_this)
        db.session.commit()

    @staticmethod
    def search(query):
        alistlevel = []
        # lsite aller level
        alistname = []
        # liste aller usernamen
        data = skill.query.filter_by(name=query)
        for skill1 in data:
            alistlevel.append(skill1.give_level())
            for users1 in skill1.has_user:
                alistname.append(users1.give_name())

        name_skilllevel = zip(alistname, alistlevel)
        name_skilllevel_dict = dict(name_skilllevel)
        if not name_skilllevel_dict:
            return None
        # dict von Usernames in Verbindung mit Skilllevel
        big_dict = dict(skill=query, result=name_skilllevel_dict)
        # print(big_dict)
        return big_dict

    @staticmethod
    def set_skill(username, skills):
        ctime = Time()
        user = Users.query.filter_by(username=username).first()
        db.session.add(ctime)
        for skill, level in skills.items():
            new_skill = Skill.query.filter_by(name=skill).first()
            assoc = Association(level=level)
            assoc.skill_assoc = new_skill
            assoc.time_assoc = ctime
            user.users_association.append(assoc)
        db.commit()

    @staticmethod
    def add_milestone(username, skill, date, name):
        user = Users.query.filter_by(username=username).first()
        mskill = Skill.query.filter_by(name=skill).first()
        mdate = Time(time=date)
        m = MilestoneAssociation(name=name)
        m.user_assoc = user
        m.time_assoc = mdate
        mskill.milestone_association.append(m)


database_controller = DatabaseController()
