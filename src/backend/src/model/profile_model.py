"""Contains model for Profiles"""
import set_root_backend
from src.model.model import Model


class ProfileModel(Model):

    """This class converts a user to a JSON to hand over to the frontend"""

    def __init__(self, username, skills=None):
        self.username = username
        self.skills = skills

    def jsonable(self):
        jsonable_skills = list()
        if self.skills:
            for skill in self.skills:
                jsonable_skills.append(skill.jsonable())
        return dict(username=self.username, skills=jsonable_skills)
