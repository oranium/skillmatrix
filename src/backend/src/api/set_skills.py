"""Contains the SetSkills API"""
import json
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class SetSkills(Resource):
    """The SetSkills-API takes the query arguments and hands them over to the backend controller, returning a Profile"""

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("skillpaths", type=dict)
        args = parser.parse_args()
        try:
            message = json.dumps(controller.set_skills(args["username"], args["skillpaths"]))
            return Response(message, status=200, mimetype="application/json")
        except TimeoutError:
            return Response(status=504)
        except NameError:
            return Response(status=400)
        except PermissionError:
            return Response(status=401)

    def options(self):
        pass
