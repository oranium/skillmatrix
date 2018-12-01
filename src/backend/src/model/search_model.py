"""Contains model for Search"""
from src.model.model import Model
import json


class SearchModel(Model):

    """This class converts the search query and results to a JSON to hand over to the frontend"""

    def __init__(self, query, results):
        self.query = query
        self.has_all = results['has_all']
        self.has_some = results['has_some']

    def to_json(self):
        has_all_json = []
        for profile in self.has_all:
            has_all_json.append(profile.to_json())
        has_some_json = []
        for profile in self.has_some:
            has_some_json.append(profile.to_json())
        model = dict(query=self.query, has_all=has_all_json, has_some=has_some_json)
        return json.dumps(model)
