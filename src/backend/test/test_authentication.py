import parentdir
import json
import unittest
from unittest.mock import patch,ANY
from src import authentication
from ldap3 import Connection
from ldap3.core.exceptions import LDAPSocketOpenError, LDAPUnknownAuthenticationMethodError

class TestAuthentication(unittest.TestCase):
    def setUp(self):
        self.auth = authentication.Authentication("mock")
        self.SUCESS_RETURN = json.dumps(dict(user=dict(username="someuser")))
    
    def test_login_correct_credentials(self):
        with patch.object(Connection,"__init__") as mock_conn:
            with patch.object(Connection,"bind") as mock_bind:    
                #self.auth.login succeeds if no error is raised from Connection constructor
                #and bind does not raise an exception (which can't happen in integration
                #if Connection constructor raises no error and does not fail) 
                mock_conn.return_value = None
                mock_bind.return_value = ANY
                self.assertEqual(self.auth.login("someuser","somepass"),self.SUCESS_RETURN)
    
    def test_login_wrong_credentials(self):
        with patch.object(Connection,"__init__") as mock_conn:
            mock_conn.side_effect = LDAPUnknownAuthenticationMethodError
            self.assertRaises(AttributeError,self.auth.login,"someuser","somepass")

    def test_login_empty_input(self):
        self.assertRaises(AttributeError,self.auth.login,"","")

    def test_login_timeout(self):
        with patch.object(Connection,"__init__") as mock_conn:
            mock_conn.side_effect = LDAPSocketOpenError
            self.assertRaises(TimeoutError,self.auth.login,"someuser","somepass")
            
    '''The `unbind` method on `logout` does not need to be mocked as it always returns `True`'''
    def test_logout_successful(self):
        self.assertEqual(self.auth.logout("mock"),True)
    
    def test_logout_unsuccessful(self):
            self.assertEqual(False,self.auth.logout("someuser"))


if __name__ == "__main__":
    unittest.main()