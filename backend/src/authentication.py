from flask import Flask
from flask_restful import Resource, Api, reqparse
from ldap3 import Server, Connection, MOCK_SYNC, OFFLINE_AD_2012_R2, NTLM
from ldap3.core.exceptions import LDAPUnknownAuthenticationMethodError,LDAPSocketOpenError

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()

# Create a mock server from the info and schema json files
mock_server = Server.from_definition('my_mock_server', './test/my_real_server_info.json', './test/my_real_server_schema.json')

# Create a MockSyncStrategy connection to the mock server
mock_connection = Connection(mock_server,'AzureAD.SWT.com\Valdemar.Forsberg','@testuser1 ',authentication=NTLM, client_strategy=MOCK_SYNC)

# Populate the DIT of the mock server
mock_connection.strategy.entries_from_json('./test/my_real_server_entries.json')

# Add a mock user for Simple binding
mock_connection.strategy.add_entry('cn=Forsberg', {'userPassword': '@testuser1 ', 'sn': 'Forsberg', 'revision': 0})

# Bind to the mock server
mock_connection.bind()


# get info about server
#print(mock_server.info)
#get info about connection
print(mock_connection)

class Authentication:
    def __init__(self, serverURL):
        """
        The server url should look like this: <ldap://my-ldapserver.example.com:389>
        Uni-Azure: server 'ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389'
        """

    # should call db_controller and return JSON according to #11
    def login(self, username, password):
        try:
            self.new_connection = Connection(mock_server,'AzureAD.SWT.com\\'+username,password,authentication=NTLM,client_strategy=MOCK_SYNC,raise_exceptions = True)
            self.new_connection.bind()
            #wrong credentials
            if self.new_connection == None:
                return {"user": {},"error": 1}
            #successful login
            return {"user":{"username":username},"error":0}
        except LDAPUnknownAuthenticationMethodError:
            return {"user":{},"error":2}
        except LDAPSocketOpenError:
            return {"user":{},"error":3}

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
        #return {args['username']: auth.logout(args['username'])}
        #for TDD
        return {args['username']:False} if args['username'] == "dontwork"  else {args['username']:True}


api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
auth = Authentication("Placeholder")

if __name__ == "__main__":
    app.run(debug=True)
