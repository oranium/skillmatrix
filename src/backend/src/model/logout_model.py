"""Contains model for Logout"""
from src.model.model import Model
import json


class LogoutModel(Model):

    """This class converts the logged out user to a JSON to hand over to the frontend"""

    def __init__(self, user):
        self.user = user

    def to_json(self):
        return json.dumps(dict(user=self.user))
