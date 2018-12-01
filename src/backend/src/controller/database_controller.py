import parentdir
from src.controller.database import db


def handle_query(self, query):
    print()
    #Accepts the query from REST-API and hands it to database_handler, returns JSON
    results = database_handler.search(self,query)
    if(results is None):
        raise ValueError
    return json.dumps(results)


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
        '''Deletes a colum of the users-table, based on the given username.'''
        delete_this = users.query.filter_by(username=username1).first()
        db.session.delete(delete_this)
        db.session.commit()

    @staticmethod
    def search(query):
        alistlevel = []
        # lsite aller level
        alistname = []
        # liste aller usernamen
        data = skill.query.filter_by(name = query).all()
        for skill1 in data:
            alistlevel.append(skill1.give_level())
            for users1 in skill1.has_user:
                alistname.append(users1.give_name())

        name_skilllevel = zip(alistname, alistlevel)
        name_skilllevel_dict = dict(name_skilllevel)
        if not name_skilllevel_dict:
            return None
        # dict von Usernames in Verbindung mit Skilllevel
        big_dict = dict(skill= query,result= name_skilllevel_dict)
        # print(big_dict)
        return big_dict


database_controller = DatabaseController()
