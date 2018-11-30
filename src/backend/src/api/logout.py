from flask import Response
from flask_restful import Resource

from src.app import parser, AUTH


class Logout(Resource):
    '''Login-API deserializes JSON and hands it to the Authentication class of authentication module'''
    def post(self):
        parser.add_argument("username", type=str)
        args = parser.parse_args()
        try:
            AUTH.logout(args["username"])
            return Response(status=200)
        except Exception:
            return Response(status=520)

    def options(self):
        pass