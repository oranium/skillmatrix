import set_root_backend
from src.controller.controller import controller
from flask import Response
from flask_restful import Resource, reqparse


class Logout(Resource):
    '''Login-API deserializes JSON and hands it to the Authentication class of authentication module'''
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        args = parser.parse_args()
        try:
            controller.logout(self, args["username"])
            return Response(status=200)
        except Exception:
            return Response(status=520)

    def options(self):
        pass
