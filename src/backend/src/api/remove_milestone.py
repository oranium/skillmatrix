"""Contains the RemoveMilestone API"""
import sys

import json
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class RemoveMilestone(Resource):
    """The RemoveSkill-API takes the arguments and hands them over to the backend controller
       to delete a skill either for a user or from the whole database."""

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("skillname", type=str)
        parser.add_argument("level", type=int)
        parser.add_argument("date", type=str)
        args = parser.parse_args()
        try:
            message = json.dumps(controller.remove_skill(args["username"],
                                                         args["skillname"],
                                                         args["level"],
                                                         args["date"])
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