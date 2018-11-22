#sets backend root as starting directory
from ldap3 import Server, Connection, MOCK_SYNC, OFFLINE_AD_2012_R2, NTLM
import requests
import json
import unittest
from src import authentication

class TestAuthentication(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.auth = authentication.Authentication("mock")

    def test_login_correct_credentials(self):
        self.assertEqual({"user":{"username":"testUser"}},self.auth.login("testUser","testMe"))

    def test_login_wrong_credentials(self):
        try:
            self.assertRaises(AttributeError,self.auth.login("wrong","wrong"))
        except TypeError:
            self.fail()

    def test_login_timeout(self):
        try:
            self.assertRaises(TimeoutError,self.auth.login("please","timeout"))
        except TypeError:
            self.fail()

    def test_logout_successful(self):
        self.assertEqual(True,self.auth.logout("testUser"))
    
    #connection doesnt exist
    def test_logout_fail_connection_doesnt_exist(self):
        self.assertRaises(KeyError,self.auth.logout("fail"))


if __name__ == "__main__":
    unittest.main()