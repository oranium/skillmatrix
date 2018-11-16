import sys, os
myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, myPath + '/../')
from ldap3 import Server, Connection, MOCK_SYNC, OFFLINE_AD_2012_R2
import requests
import json
import unittest
from src import authentication
'''
MOCK LDAP doc here: https://ldap3.readthedocs.io/mocking.html

'''

# makes importing authentication possible

# setup mock server
server = Server('mock_ad')
connection = Connection(server, user='cn=mock_user,ou=test,o=lab',
                        password='mock_password', client_strategy=MOCK_SYNC)


class TestAuthentication(unittest.TestCase):

    def set_up(self):
        pass
        
    def test_login_empty_string(self):
        pass

    def test_login_timeout(self):
        pass

    def test_login_wrong_credentials(self):
        pass

    def test_login_correct_credentials(self):
        pass

    def test_logout_successful(self):
        pass
        

    def test_logout_fail(self):
        pass

    def test_logout_illegal_method(self):
        response = requests.get('http://localhost:5000/logout')
        return self.assertEqual(response.status_code,405)

class TestAPI(unittest.TestCase):

    def set_up(self):
        self.app = authentication.app


    def test_login_api(self):
        pass

    def test_logout_api_success(self):
        response = requests.post('http://localhost:5000/logout',None,{"username":"work"}).json()
        self.assertEqual(response,{"work":True})

    def test_logout_api_fail(self):
        response = requests.post('http://localhost:5000/logout',None,{"username":"dontwork"}).json()
        self.assertEqual(response,{"dontwork":False})

    def test_logout_api_illegal(self):
        response = requests.get('http://localhost:5000/logout')
        return self.assertEqual(response.status_code,405)


if __name__ == "__main__":
    unittest.main()