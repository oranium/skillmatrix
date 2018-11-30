"""Contains the Milestone API"""
from flask import Response
from flask_restful import Resource,reqparse

from src.controller.controller import Controller


class Milestone(Resource):
    """The Milestone-API takes the given milestone and user, hands them to the backend controller"""

    def post(self):
        controller = Controller.get_instance()
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("skill", type=str)
        parser.add_argument("date", type=str)
        parser.add_argument("comment", type=str)
        args = parser.parse_args()
        try:
            message = controller.add_milestone(self,
                                               args["username"],
                                               args["skill"],
                                               args["date"],
                                               args["comment"])
            return Response(message, status=200, mimetype="application/json")
        except BaseException:
            pass

    def options(self):
        pass
