"""Contains model for Search"""
import set_root_backend
from src.model.model import Model


class SearchModel(Model):

    """This class converts the search query and results to a JSON to hand over to the frontend"""

    def __init__(self, query, results):
        self.query = query
        self.has_all = results['has_all']
        self.has_some = results['has_some']

    def jsonable(self):
        has_all_jsonable = []
        for profile in self.has_all:
            has_all_jsonable.append(profile.jsonable())
        has_some_jsonable = []
        for profile in self.has_some:
            has_some_jsonable.append(profile.jsonable())
        return dict(query=self.query, results=dict(has_all=has_all_jsonable, has_some=has_some_jsonable))
