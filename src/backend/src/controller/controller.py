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
        if not database_controller.exists(username):
            database_controller.create_user(username, name)
        user_skills = database_controller.get_skills(username)
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
        print(all_skill_names, file=sys.stderr)
        if username:
            return dict(username=username, allSkills=all_skill_names[0])
        return dict(allSkills=all_skill_names[0], categories=all_skill_names[1])

    @staticmethod
    def create_skill(username, skillname, category):
        if not controller.is_connected(username):
            raise PermissionError
        database_controller.create_skill(skillname, category)

    @staticmethod
    def search(username, query):
        if not controller.is_connected(username):
            raise PermissionError
        results = database_controller.search(query)
        return SearchModel(query, results).jsonable()

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
    def add_guidelines(username, skillname, guidelines):
        """Adds guideline for each level of given skill.
            Args:
                  username (`str`): the username of the current user
                  skillname(`str`): the name of the skill
                  guidelines(`dict(int=level)`: each level gets assigned a guideline text
        """
        if not controller.is_connected(username):
            raise PermissionError
        database_controller.add_guidelines(skillname, guidelines)

    @staticmethod
    def remove_skill(username, skillname, from_db=False):
        """Remove a skill either from the user's profile or the whole database.
           Args:
               username (`str`): the username of the current user
               skillname(`str`): the name of the skill
               from_db(`boolean`): deletes skill from database, if True, else only from user's profile
        """
        if not controller.is_connected(username):
            raise PermissionError
        if from_db:
            database_controller.remove_skill_from_database(skillname)
        else:
            database_controller.remove_skill(username, skillname)
        user_skills = database_controller.get_skills(username)
        name = authentication_controller.get_name(username)
        return ProfileModel(username, name, user_skills).jsonable()


controller = Controller()
