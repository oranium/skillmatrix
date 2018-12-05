"""Contains model for Logout"""
import set_root_backend
from src.model.model import Model


class LogoutModel(Model):

    """This class converts the logged out user to a JSON to hand over to the frontend"""

    def __init__(self, username):
        self.user = username

    def jsonable(self):
        return dict(user=self.username)
