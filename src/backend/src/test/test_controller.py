from controller.controller import controller
import unittest
from unittest.mock import patch


class TestController(unittest.TestCase):
    """Unittests for Controller"""

    def setUp(self):
        pass

    def test_login_new_user(self):
        pass

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
