"""Contains the backend controller"""
import sys

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
        return dict(user=ProfileModel(username, name, user_skills).jsonable())

    @staticmethod
    def logout(username):
        if not controller.is_connected(username):
            raise PermissionError
        authentication_controller.logout(username)
        return LogoutModel(username).jsonable()

    @staticmethod
    def get_all_skill_names(username=None):
        # if username is not None, a POST request was sent -> requires login
        if username and not controller.is_connected(username):
            raise PermissionError
        all_skill_names = database_controller.get_all_skill_names(username)
        if username:
            return dict(username=username, allSkills=all_skill_names[0])
        return dict(allSkills=all_skill_names[0], categories=all_skill_names[1])

    @staticmethod
    def create_skill(username, skillname, category):
        if not controller.is_connected(username):
            raise PermissionError
        database_controller.create_skill(username, skillname, category)

    @staticmethod
    def search(username, query):
        print("got to Controller.search", file=sys.stderr)
        if not controller.is_connected(username):
            raise PermissionError
        results = database_controller.search(query)
        return SearchModel(query, results).jsonable()

    @staticmethod
    def create_skill(username, skillname, level, category):
        """Create a new skill in the database, called from CreateSkill-API"""
        if not controller.is_connected(username):
            database_controller.create_skill(skillname, category)
            database_controller.set_skills(username, dict(skillname=level))
            user_skills = database_controller.get_skills(username)
            name = authentication_controller.get_name(username)
            return ProfileModel(username, name, user_skills).jsonable()
        raise PermissionError

    @staticmethod
    def set_skills(username, skills):
        if not controller.is_connected(username):
            raise PermissionError
        database_controller.set_skills(username, skills)
        user_skills = database_controller.get_skills(username)
        name = authentication_controller.get_name(username)
        return ProfileModel(username, name, user_skills).jsonable()

    @staticmethod
    def add_milestone(username, skill, date, comment, level):
        if not controller.is_connected(username):
            raise PermissionError
        date = datetime.datetime.strptime(date, "%Y-%m-%d").date()
        database_controller.add_milestone(username, skill, date, comment, level)
        user_skills = database_controller.get_skills(username)
        name = authentication_controller.get_name(username)
        return ProfileModel(username, name, user_skills).jsonable()

    @staticmethod
    def is_connected(username):
        """Checks if the current user is in the dict of open connections.
            Args:
                username (`str`): the username of the current user
            Returns:
                `boolean`: `True` if username is a key in connections of `AuthenticationController`, `False` otherwise.
        """
        try:
            if username in list(authentication_controller.connections.items())[0]:
                return True
            return False
        except IndexError:
            return False

    @staticmethod
    def get_all_skill_names():
        return dict(allSkills=database_controller.get_all_skill_names())


controller = Controller()
