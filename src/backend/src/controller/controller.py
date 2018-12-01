"""Contains the backend controller"""
from model.logout_model import LogoutModel
from model.profile_model import ProfileModel
from model.search_model import SearchModel
from src.controller.authentication_controller import authentication_controller
from src.controller.database_controller import database_controller


class Controller:
    """Singleton, calls DatabaseController and AuthenticationController. Returns JSONs from models to APIs"""
    @staticmethod
    def login(user, password):
        authentication_controller.login(user, password)
        user_skills = database_controller.skills(user)
        return ProfileModel(user, user_skills)

    @staticmethod
    def logout(user):
        authentication_controller.logout(user)
        return LogoutModel(user)

    @staticmethod
    def search(query):
        results = database_controller.search(query)
        return SearchModel(query, results)

    @staticmethod
    def set_skills(user, skills):
        database_controller.set_skills(user, skills)
        return True

    @staticmethod
    def add_milestone(user, skill, milestone):
        database_controller.add_milestone(user, skill, milestone)
        return True


controller = Controller()
