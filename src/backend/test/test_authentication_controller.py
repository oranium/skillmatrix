import set_root_backend
import json
import unittest
from unittest.mock import patch, ANY
from src.controller.authentication_controller import authentication_controller
from ldap3 import Connection
from ldap3.core.exceptions import LDAPSocketOpenError, LDAPUnknownAuthenticationMethodError


class TestAuthentication(unittest.TestCase):
    def setUp(self):
        self.SUCCESS_RETURN = json.dumps(dict(user=dict(username="someuser")))

    def test_login_correct_credentials(self):
        with patch.object(Connection, "__init__") as mock_conn:
            with patch.object(Connection, "bind") as mock_bind:
                # authentication_controller.login succeeds if no error is raised from Connection constructor
                # and bind does not raise an exception (which can't happen in integration
                # if Connection constructor raises no error and does not fail)
                mock_conn.return_value = None
                mock_bind.return_value = ANY
                self.assertEqual(self.SUCCESS_RETURN, authentication_controller.login("someuser", "somepass"))

    def test_login_wrong_credentials(self):
        with patch.object(Connection, "__init__") as mock_conn:
            mock_conn.side_effect = LDAPUnknownAuthenticationMethodError
            self.assertRaises(AttributeError, authentication_controller.login, "someuser", "somepass")

    def test_login_empty_input(self):
        with patch.object(Connection, "__init__") as mock_conn:
            mock_conn.return_value = None
            self.assertRaises(AttributeError, authentication_controller.login, "", "")

    def test_login_timeout(self):
        with patch.object(Connection, "__init__") as mock_conn:
            mock_conn.side_effect = LDAPSocketOpenError
            self.assertRaises(TimeoutError, authentication_controller.login, "someuser", "somepass")
            
    '''The `unbind` method on `logout` does not need to be mocked as it always returns `True`'''
    def test_logout_successful(self):
        authentication_controller.connections = {"mock": Connection(ANY)}
        self.assertEqual(authentication_controller.logout("mock"), True)
    
    def test_logout_unsuccessful(self):
            self.assertEqual(False, authentication_controller.logout("anyuser"))
