"""Contains model for Profiles"""
import set_root_backend
from src.model.model import Model
import json


class ProfileModel(Model):

    """This class converts a user to a JSON to hand over to the frontend"""

    def __init__(self, username, skills=None):
        self.username = username
        self.skills = skills

    def to_json(self):
        json_skills = list()
        if self.skills:
            for skill in self.skills:
                json_skills.append(skill.to_json())
        model = dict(username=self.username, skills=json_skills)
        return json.dumps(model)
