"""Contains the CreateSkill API"""
import sys

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
        parser.add_argument("skillpath", type=str)
        parser.add_argument("category", type=str)
        args = parser.parse_args()
        try:
            message = json.dumps(controller.create_skill(args["username"],
                                                         args["skillname"],
                                                         args["skillpath"],
                                                         args["category"])
                                 )
            return Response(message, status=200, mimetype="application/json")
        except TimeoutError:
            return Response(status=504)
        except PermissionError:
            return Response(status=401)
        except Exception as e:
            print(e, file=sys.stderr)
            return Response(status=520)

    def options(self):
        pass
