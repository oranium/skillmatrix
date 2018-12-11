"""Contains the SetSkill API"""
import json
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class SetSkill(Resource):
    """The SetSkill-API takes the query arguments and hands them over to the backend controller"""

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("skills", type=dict)
        args = parser.parse_args()
        try:
            message = json.dumps(controller.set_skills(args["username"], args["skills"]))
            return Response(message, status=200, mimetype="application/json")
        except TimeoutError:
            return Response(status=504)
        except PermissionError:
            return Response(status=401)

    def options(self):
        pass
