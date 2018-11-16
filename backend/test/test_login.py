from src import authentication
import unittest
import json
import sys
# , ALL_ATTRIBUTES, NTLM
from ldap3 import Server, Connection, MOCK_SYNC, OFFLINE_AD_2012_R2
'''
MOCK LDAP doc here: https://ldap3.readthedocs.io/mocking.html

'''

# makes importing authentication possible
sys.path.append("../")

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


class TestAPI(unittest.TestCase):

    def set_up(self):
        pass

    def test_login_api(self):
        pass

    def test_logout_api(self):
        pass
