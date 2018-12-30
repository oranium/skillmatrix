"""Contains the CreateSkill API"""
import json
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class CreateSkill(Resource):
    """The CreateSkill-API takes the arguments and hands them over to the backend controller to create a new skill"""

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("skillname", type=str)
        parser.add_argument("level", type=int)
        parser.add_argument("category", type=str)
        args = parser.parse_args()
        try:
            message = json.dumps(controller.create_skill(args["username"],
                                                         args["skillname"],
                                                         args["level"],
                                                         args["category"])
                                 )
            return Response(message, status=200, mimetype="application/json")
        except TimeoutError:
            return Response(status=504)
        except PermissionError:
            return Response(status=401)

    def options(self):
        pass
