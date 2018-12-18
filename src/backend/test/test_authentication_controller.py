import set_root_backend
import json
import unittest
from unittest.mock import patch, ANY
from src.controller import authentication_controller
from ldap3 import Connection
from ldap3.core.exceptions import LDAPSocketOpenError, LDAPUnknownAuthenticationMethodError


def setUpModule():
    authentication_controller.set_controller("1")


class TestAuthentication(unittest.TestCase):
    def setUp(self):
        self.SUCCESS_RETURN = "Full Name"
        self.authentication_controller = authentication_controller.authentication_controller

    # tests proper calling of authentication_controller.get_name as well
    def test_login_correct_credentials(self):
        with patch.object(Connection, "__init__") as mock_conn:
            with patch.object(Connection, "bind") as mock_bind:
                with patch.object(authentication_controller.authentication_controller, "get_name") as mock_names:
                    # authentication_controller.login succeeds if no error is raised from Connection constructor
                    # and bind does not raise an exception (which can't happen in integration
                    # if Connection constructor raises no error and does not fail)
                    mock_conn.return_value = None
                    mock_bind.return_value = ANY
                    mock_names.return_value = "Full Name"
                    self.assertEqual(self.SUCCESS_RETURN, self.authentication_controller.login("Full-Name", "somepass"))

    def test_login_wrong_credentials(self):
        with patch.object(Connection, "__init__") as mock_conn:
            mock_conn.side_effect = LDAPUnknownAuthenticationMethodError
            self.assertRaises(AttributeError, self.authentication_controller.login, "someuser", "somepass")

    def test_login_empty_input(self):
        with patch.object(Connection, "__init__") as mock_conn:
            mock_conn.return_value = None
            self.assertRaises(AttributeError, self.authentication_controller.login, "", "")

    def test_login_timeout(self):
        with patch.object(Connection, "__init__") as mock_conn:
            mock_conn.side_effect = LDAPSocketOpenError
            self.assertRaises(TimeoutError, self.authentication_controller.login, "someuser", "somepass")
            
    '''The `unbind` method on `logout` does not need to be mocked as it always returns `True`'''
    def test_logout_successful(self):
        self.authentication_controller.connections = {"mock": Connection(ANY)}
        self.assertEqual(self.authentication_controller.logout("mock"), True)
    
    def test_logout_unsuccessful(self):
            self.assertEqual(False, self.authentication_controller.logout("anyuser"))
