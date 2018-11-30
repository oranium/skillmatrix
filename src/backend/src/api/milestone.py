"""Contains the Milestone API"""
from flask import Response
from flask_restful import Resource

class Milestone(Resource):
    """The Milestone-API takes the given milestone and user, hands them to the backend controller"""

    def post(self):
        pass

    def options(self):
        pass
