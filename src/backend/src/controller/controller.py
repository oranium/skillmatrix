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
        """Authenticates user with AD.
            Args:
                username(`str`): name of the user
                password(`str`): password of the user
            Returns:
                `dict`: profile of the logged in user as JSON-ready `ProfileModel`
        """

        name = authentication_controller.login(username, password)
        if not database_controller.exists(username):
            database_controller.create_user(username, name)
        user_skills = database_controller.get_skills(username)
        return dict(user=ProfileModel(username, name, user_skills).jsonable())

    @staticmethod
    def logout(username):
        """Logs user out of Application.
            Args:
                username(`str`): name of the user
            Returns:
                `dict("user"=str)`: username in dict
            Raises:
                PermissionError if user is not logged in
        """
        if not controller.is_connected(username):
            raise PermissionError
        authentication_controller.logout(username)
        return LogoutModel(username).jsonable()

    @staticmethod
    def get_all_skill_names(username=None):
        """Gets all skillnames of user or of the whole database, depending on username arg.
            Args:
                username(`str`, optional): name of the user, defaults to None
            Returns:
                `dict("allSkills"=[str], "categories"=[str])`: JSON-ready list of skills and root categories.
            Raises:
                PermissionError if username is given and user is not logged in
        """
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
        """Creates a new skill in the database
            Args:
                username(`str`): name of the user
                skillname(`str`): name of the skill
                category(`str`): name of parent category of new skill
            Raises:
                PermissionError if user is not logged in
        """
        if not controller.is_connected(username):
            raise PermissionError
        database_controller.create_skill(skillname, category)

    @staticmethod
    def search(username, query):
        """Searches users in database with given number of skill/level pairs.
            Args:
                username(`str`): name of the user
                query(`dict(str=int)`): skillname:min_levl pairs
            Returns:
                `dict`: JSON-Ready `SearchModel`
            Raises:
                PermissionError if user is not logged in
        """
        if not controller.is_connected(username):
            raise PermissionError
        results = database_controller.search(query)
        return SearchModel(query, results).jsonable()

    @staticmethod
    def set_skills(username, skills):
        """Adds Skills to user or changes the level.
            Args:
                username(`str`): name of the user
                skills(`dict(str=int)`): skillname:level pairs
            Returns:
                `dict`: updated JSON-ready profile of the user
            Raises:
                PermissionError if user is not logged in
        """
        if not controller.is_connected(username):
            raise PermissionError
        database_controller.set_skills(username, skills)
        user_skills = database_controller.get_skills(username)
        name = authentication_controller.get_name(username)
        return ProfileModel(username, name, user_skills).jsonable()

    @staticmethod
    def add_milestone(username, skillname, date, comment, level):
        """Adds a milestone to skill of a user
            Args:
                username(`str`): name of the user
                skillname(`str`): name of the skill
                date(`str`): date in "YYYY-MM-DD" format
                comment(`str`): comment/text for the milestone
                level(`int`): level of skill for user
            Returns:
                `dict`: updated JSON-ready profile of the user
            Raises:
                PermissionError if user is not logged in
        """
        if not controller.is_connected(username):
            raise PermissionError
        date = datetime.datetime.strptime(date, "%Y-%m-%d").date()
        database_controller.add_milestone(username, skillname, date, comment, level)
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
                  guidelines(`list`): guideline text for each level in order - list of length 5
            Raises:
                PermissionError if user is not logged in
        """
        if not controller.is_connected(username):
            raise PermissionError
        database_controller.create_guidelines(skillname, guidelines)

    @staticmethod
    def remove_skill(username, skillname, from_db):
        """Remove a skill either from the user's profile or the whole database.
           Args:
               username (`str`): the username of the current user
               skillname(`str`): the name of the skill
               from_db(`boolean`): deletes skill from database, if True, else only from user's profile
           Raises:
               PermissionError if user is not logged in
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

    @staticmethod
    def remove_milestone(username, skillname, level, date):
        """Removes a milestone from user.
            Args:
                  username(`str`): name of the user
                  skillname(`str`): name of the skill
                  level(`int`): level of skill at milestone date
                  date(`str`): date of milestone in format "YYYY-MM-DD"
            Returns:
                `ProfileModel`: updated ProfileModel of the user.
            Raises:
                `PermissionError` if user ist not logged in.
        """
        if not controller.is_connected(username):
            raise PermissionError
        database_controller.remove_milestone(username, skillname, level, date)
        user_skills = database_controller.get_skills(username)
        name = authentication_controller.get_name(username)
        return ProfileModel(username, name, user_skills).jsonable()




controller = Controller()
