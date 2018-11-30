"""Contains the SetSkill API"""
from flask import Response
from flask_restful import Resource

class SetSkill(Resource):
    """The SetSkill-API takes the query arguments and hands them over to the backend controller"""

    def post(self):
        pass

    def options(self):
        pass
