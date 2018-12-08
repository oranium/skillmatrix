"""Contains the Milestone API"""
import json
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class Milestone(Resource):
    """The Milestone-API takes the given milestone and user, hands them to the backend controller"""

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("skill", type=str)
        parser.add_argument("level", type=int)
        parser.add_argument("date", type=str)
        parser.add_argument("comment", type=str)
        args = parser.parse_args()
        try:
            if not controller.is_connected(args["username"]):
                return Response(status=401)
            message = json.dumps(controller.add_milestone(self,
                                                          args["username"],
                                                          args["skill"],
                                                          args["date"],
                                                          args["comment"],
                                                          args["level"]))
            return Response(message, status=200, mimetype="application/json")
        except TimeoutError:
            return Response(status=504)

    def options(self):
        pass
