import set_root_backend
from src.controller.controller import controller
import sys
from flask import Response
from flask_restful import Resource, reqparse


class Login(Resource):
    """Login-API deserializes JSON and hands it to the Authentication class of authentication module"""
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str)
        parser.add_argument("password", type=str)
        args = parser.parse_args()
        try:
            message = controller.login(self, args["username"], args["password"]).replace("\\", "")
            return Response(message, status=200, mimetype="application/json")
        except AttributeError:
            return Response(status=400)
        except TimeoutError:
            return Response(status=504)
        except Exception as e:
            print(e, file=sys.stderr)
            return Response(status=520)

    def options(self):
        pass
