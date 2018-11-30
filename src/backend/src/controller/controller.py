"""Contains the backend controller"""


class Controller:

    """Singleton, calls BackendController and AuthenticationController. Returns JSONs from models to APIs"""
    __instance = None

    @staticmethod
    def get_instance():
        pass

    def __init__(self):
        pass

    def login(self,user,password):
        pass

    def logout(self,user):
        pass

    def search(self, query):
        pass

    def set_skills(self,user,skills):
        pass

    def add_milestone(self,user,milestone):
        pass
