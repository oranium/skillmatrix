"""Contains model for Profiles"""
from model.model import Model


class ProfileModel(Model):

    """This class converts a user to a JSON to hand over to the frontend"""

    def __init__(self, username, forename, surname, skills=None):
        self.username = username
        self.skills = skills
        self.forename = forename
        self.surname = surname
        
    def jsonable(self):
        jsonable_skills = list()
        if self.skills:
            for skill in self.skills:
                jsonable_skills.append(skill.jsonable())
        return dict(username=self.username, forename=self.forename, surname=self.surname, skills=jsonable_skills)
