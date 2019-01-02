"""Contains the GetSkills API"""
import sys

import json
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class GetSkills(Resource):
    """The SetSkill-API takes the query arguments and hands them over to the backend controller"""

    def get(self):
        try:
            message = json.dumps(controller.get_all_skill_names())
            return Response(message, status=200, mimetype="application/json")
        except Exception as e:
            print(e, file=sys.stderr)
            return Response(status=520)

    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("username", type=str)
            args = parser.parse_args()
            message = json.dumps(controller.get_all_skill_names(username=args["username"]))
            return Response(message, status=200, mimetype="application/json")
        except PermissionError:
            return Response(status=401)
        except Exception:
            return Response(status=520)

    def options(self):
        pass
