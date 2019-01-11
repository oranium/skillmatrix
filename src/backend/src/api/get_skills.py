"""Contains the GetSkills API"""
import sys

import json
import traceback
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class GetSkills(Resource):
    """The SetSkill-API takes the query arguments and hands them over to the backend controller"""

    def get(self):
        try:
            message = json.dumps(controller.get_paths_with_guidelines())
            return Response(message, status=200, mimetype="application/json")
        except Exception as e:
            print(e, file=sys.stderr)
            return Response(status=520)

    def options(self):
        pass
