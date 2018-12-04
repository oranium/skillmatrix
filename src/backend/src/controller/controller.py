"""Contains the backend controller"""
import set_root_backend
from src.model.logout_model import LogoutModel
from model.profile_model import ProfileModel
from model.search_model import SearchModel
from src.controller.authentication_controller import authentication_controller
from src.controller.database_controller import database_controller
import datetime


class Controller:
    """Singleton, calls DatabaseController and AuthenticationController. Returns JSONs from models to APIs"""
    @staticmethod
    def login(username, password):
        authentication_controller.login(username, password)
        user_skills = database_controller.skills(username)
        return ProfileModel(username, user_skills)

    @staticmethod
    def logout(username):
        authentication_controller.logout(username)
        return LogoutModel(username)

    @staticmethod
    def search(query):
        print(query)
        results = database_controller.search(query)
        return SearchModel(query, results).to_json()

    @staticmethod
    def set_skills(username, skills):
        database_controller.set_skills(username, skills)
        return True

    @staticmethod
    def add_milestone(username, skill, date, name):
        date = datetime.datetime.strptime(date, "%Y-%m-%d").date()
        database_controller.add_milestone(username, skill, date, name)
        return True


controller = Controller()
