"""Contains the GetSkills API"""
import json
from flask import Response
from flask_restful import Resource
from controller.controller import controller


class GetSkills(Resource):
    """The SetSkill-API takes the query arguments and hands them over to the backend controller"""

    def get(self):
        try:
            message = json.dumps(controller.get_all_skill_names())
            return Response(message, status=200, mimetype="application/json")
        except Exception:
            return Response(status=520)

    def options(self):
        pass
