import json

from controller.controller import controller
import unittest
from unittest.mock import patch


class TestController(unittest.TestCase):
    """Unittests for Controller"""

    def setUp(self):
        self.EMPTY_PROFILE = dict(user=dict(username="User-Name", name="User Name", skills=[]))

    @patch("controller.database_controller.database_controller.get_skills")
    @patch("controller.database_controller.database_controller.create_user")
    @patch("controller.database_controller.database_controller.exists")
    @patch("controller.authentication_controller.authentication_controller.login")
    def test_login_new_user(self, mock_login, mock_exists, mock_create, mock_get_skills):
        mock_login.return_value = "User Name"
        mock_exists.return_value = False
        mock_get_skills.return_value = []
        new_login_return = controller.login("User-Name", "password")
        mock_create.assert_called_with("User-Name", "User Name")
        self.assertEquals(self.EMPTY_PROFILE, new_login_return)

    @patch("controller.controller.controller.is_connected")
    def test_logout_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.logout, "username")

    @patch("controller.controller.controller.is_connected")
    def test_get_paths_with_guidelines_w_username_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.get_paths_with_guidelines, "username")

    @patch("controller.controller.controller.is_connected")
    def test_create_skill_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.create_skill, "username", "skillname", "skillpath", "category")

    @patch("controller.controller.controller.is_connected")
    def test_search_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.search, "username", {"Programming/Python": 1})

    @patch("controller.controller.controller.is_connected")
    def test_set_skills_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.set_skills, "username", {"Programming/Python": 1})

    @patch("controller.controller.controller.is_connected")
    def test_add_milestone_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.add_milestone, "username", "skillpath", "date", "com", "level")

    @patch("controller.controller.controller.is_connected")
    def test_add_guidelines_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.add_guidelines, "user", "skillpath", ["1", "2", "3", "4", "5"])

    @patch("controller.controller.controller.is_connected")
    def test_remove_skill_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.remove_skill, "username", "skillpath", False)

    @patch("controller.controller.controller.is_connected")
    def test_remove_milestone_not_logged_in(self, mock_connected):
        mock_connected.return_value = False
        self.assertRaises(PermissionError, controller.remove_milestone, "name", "path", 3, "2018-11-11", "Project")
