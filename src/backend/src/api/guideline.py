"""Contains the Guidelines API for creating and updating guidelines"""
import json
import traceback
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class Guideline(Resource):
    """The Guideline-API takes the arguments and hands them over to the backend controller
       to create or update guidelines for a skill.
    """

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("skillpath", type=str)
        parser.add_argument("guideline", type=dict)
        args = parser.parse_args()
        try:
            guidelines = []
            for level, guideline in args["guideline"].items():
                guidelines.append(guideline)
            message = json.dumps(controller.add_guidelines(args["username"],
                                                           args["skillpath"],
                                                           guidelines)
                                 )
            return Response(message, status=200, mimetype="application/json")
        except ValueError:
            return Response(status=400)
        except TimeoutError:
            return Response(status=504)
        except PermissionError:
            return Response(status=401)
        except Exception:
            traceback.print_exc()
            return Response(status=520)

    def options(self):
        pass
