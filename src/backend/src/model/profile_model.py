"""Contains model for Profiles"""
from model.model import Model


class ProfileModel(Model):

    """This class converts a user to a JSON to hand over to the frontend"""

    def __init__(self, username, name, skills=None):
        self.username = username
        self.skills = skills
        self.name = name
        
    def jsonable(self):
        jsonable_skills = list()
        if self.skills:
            for skill in self.skills:
                jsonable_skills.append(skill.jsonable())
        return dict(username=self.username, name=self.name, skills=jsonable_skills)
