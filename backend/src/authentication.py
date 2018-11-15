from flask import Flask
from flask_restful import Resource, Api, reqparse
from ldap3 import Server, Connection, ALL, NTLM

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()


class Authentication:
    def __init__(self, serverURL):
        """
        The server url should look like this: <ldap://my-ldapserver.example.com:389>
        Uni-Azure: server 'ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389'
        """
        self.server = Server(serverURL, get_info=ALL)

    # should call db_controller and return JSON according to #11
    def login(self, username, password):
        pass

    # should call db_controller and return JSON according to #12
    def logout(self, username):
        pass

# RESTful API for login


class Login(Resource):
    def post(self):
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()
        return auth.login(args['username'], args['password'])

# RESTful API for logout


class Logout(Resource):
    def post(self):
        parser.add_argument('username', type=str)
        args = parser.parse_args()
        # returns JSON containing username and boolean whether logout was a success (True) or failure (False)
        return {args['username']: auth.logout(args['username'])}


api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
auth = Authentication(
    'ldap: // vm01-azure-ad.westeurope.cloudapp.azure.com: 389')
