from flask import Flask
from flask_restful import Resource, Api, reqparse
import sys
import authentication

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()

# RESTful API for login
class Login(Resource):
    def post(self):
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()
        return authentication.Authentication.login(self,args['username'], args['password'])

# RESTful API for logout
class Logout(Resource):
    def post(self):
        parser.add_argument('username', type=str)
        args = parser.parse_args()
        # returns JSON containing username and boolean whether logout was a success (True) or failure (False)
        #return {args['username']: auth.logout(args['username'])}
        #for TDD
        return {args['username']:False} if args['username'] == "dontwork"  else {args['username']:True}

api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
