"""Contains the backend controller"""
import datetime
from model.logout_model import LogoutModel
from model.profile_model import ProfileModel
from model.search_model import SearchModel
from controller.authentication_controller import authentication_controller
from controller.database_controller import database_controller


class Controller:
    """Singleton, calls DatabaseController and AuthenticationController. Returns JSONs from models to APIs
       Acts as a facade to the Database controller and AuthenticationController.
    """
    @staticmethod
    def login(username, password):
        name = authentication_controller.login(username, password)
        user_skills = database_controller.get_skills(username)
        if not database_controller.exists(username):
            database_controller.create_user(username, name)
        return dict(user=ProfileModel(username, name, user_skills).jsonable(),
                    allSkills=database_controller.get_all_skill_names())

    @staticmethod
    def logout(username):
        authentication_controller.logout(username)
        return LogoutModel(username)

    @staticmethod
    def search(query):
        print(query)
        results = database_controller.search(query)
        return SearchModel(query, results).jsonable()

    @staticmethod
    def set_skills(username, skills):
        database_controller.set_skills(username, skills)
        user_skills = database_controller.get_skills(username)
        name = authentication_controller.get_name(username)
        return ProfileModel(username, name, user_skills)

    @staticmethod
    def add_milestone(username, skill, date, comment, level):
        date = datetime.datetime.strptime(date, "%Y-%m-%d").date()
        database_controller.add_milestone(username, skill, date, comment, level)
        user_skills = database_controller.get_skills(username)
        name = authentication_controller.get_name(username)
        return ProfileModel(username, name, user_skills)


controller = Controller()
