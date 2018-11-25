'''The rest_api module provides REST-APIs for communication to the SkillMatrix frontend.'''
import parentdir
from flask import Flask, Response
import json
from flask_restful import Resource, Api, reqparse
from flask_restful.utils import cors
from src.authentication import Authentication
import sys
import traceback

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()
api.decorators=[cors.crossdomain(origin='http://localhost:3000', headers=['accept', 'Content-Type', 'access-control-allow-origin'])]

class Login(Resource):
    '''Login-API deserializes JSON and hands it to the Authentication class of authentication module'''
    def post(self):
        parser.add_argument("username", type=str)
        parser.add_argument("password", type=str)
        print("parsing is next",file=sys.stderr)
        args = parser.parse_args()
        try:
            print(Authentication.login(self,args["username"], args["password"]),file=sys.stderr)
            return Response("", status=200, mimetype="application/json")
        except AttributeError:
            return Response(status=400)
        except TimeoutError:
            return Response(status=504)
        except Exception as e:
            return Response(status=520)
    
    def options(self):
        pass

class Logout(Resource):
    '''Login-API deserializes JSON and hands it to the Authentication class of authentication module'''
    def post(self):
        parser.add_argument("username", type=str)
        args = parser.parse_args()
        try:
            Authentication.logout(self,args["username"])
            return Response(status=200)
        except Exception:
            return Response(status=520)
    
    def options(self):
        pass
        
            
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")

if __name__ == "__main__":
    app.run(debug=True)
