import sys, os
myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, myPath + '/../')
from ldap3 import Server, Connection, MOCK_SYNC, OFFLINE_AD_2012_R2, NTLM
import requests
import json
import unittest
from src import authentication
from flask import request


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
#print(mock_connection)


# get info about users 
#print(mock_connection.search('CN=Users,DC=AzureAD,DC=SWT,DC=com', '(objectclass=*)')) 
#print(mock_connection.entries)



def setUpModule():
    authentication.app.testing = True
    #mock_connection.strategy.add_entry('cn=testUser,ou=test,o=lab', {'userPassword': 'testMe', 'sn': 'user0_sn', 'revision': 0})

class TestAuthenticationLogin(unittest.TestCase):

    def setUp(self):
        self.login = authentication.Authentication
    
    def test_login_correct_credentials(self):
        self.assertEqual({"user":{"username":"testUser"},"error":0},self.login.login(self,"testUser","testMe"))

    def test_login_wrong_credentials(self):
        self.assertEqual({"user":{},"error":1},self.login.login(self,"wrong","wrong"))

    def test_login_empty_string(self):
        self.assertEqual({"user":{},"error":2},self.login.login(self,"",""))

    def test_login_timeout(self):
        self.assertEqual({"user":{},"error":3},self.login.login(self,"anything","anything"))

class TestAuthenticationLogout(unittest.TestCase):
    def setUp(self):
        self.logout = authentication.Authentication

    def test_logout_successful(self):
        self.assertEqual({"user":True},self.logout.logout(self,"user"))
        
    def test_logout_fail(self):
        self.assertEqual({"dontwork":False},self.logout.logout(self,"dontwork"))

class TestLoginAPI(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.test_app = authentication.app.test_client()
    
    def test_login_api_response_code(self):
        self.assertEqual(self.test_app.post("/login").status_code,200)

    def test_login_api_illegal_method(self):
        self.assertEqual(self.test_app.get("/login").status_code,405)


class TestLogoutAPI(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.test_app = authentication.app.test_client()

    def setUp(self):
        self.app = authentication.app

    def test_logout_api_success(self):
        response = self.test_app.post("/logout",data={"username":"work"}).get_json()
        self.assertEqual(response,{"work":True})

    def test_logout_api_fail(self):
        response = self.test_app.post("/logout",data={"username":"dontwork"}).get_json()
        self.assertEqual(response,{"dontwork":False})

    def test_logout_response_code(self):
        return self.assertEqual(self.test_app.post("/logout").status_code,200)

    def test_logout_api_illegal_method(self):
        return self.assertEqual(self.test_app.get("/logout").status_code,405)

if __name__ == "__main__":
    unittest.main()