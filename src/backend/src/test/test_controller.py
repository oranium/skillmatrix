from controller.controller import controller
import unittest
from unittest.mock import patch


class TestController(unittest.TestCase):
    """Unittests for Controller"""

    def setUp(self):
        pass

    def test_login_new_user(self):
        pass

    @patch("controller.authentication_controller.authentication_controller.logout")
    @patch("controller.controller.controller.is_connected")
    def test_logout_not_logged_in(self, mock_connected, mock_logout):
        pass

    @patch("controller.authentication_controller.authentication_controller.logout")
    @patch("controller.controller.controller.is_connected")
    def test_get_paths_with_guidelines_not_logged_in(self):
        pass

    @patch("controller.controller.controller.is_connected")
    def test_create_skill_not_logged_in(self):
            pass

    @patch("controller.controller.controller.is_connected")
    def test_search_not_logged_in(self):
        pass

    @patch("controller.controller.controller.is_connected")
    def test_set_skills_not_logged_in(self):
        pass

    @patch("controller.controller.controller.is_connected")
    def test_add_milestone_not_logged_in(self):
        pass

    @patch("controller.controller.controller.is_connected")
    def test_add_guidelines_not_logged_in(self):
        pass

    @patch("controller.controller.controller.is_connected")
    def test_remove_skill_not_logged_in(self):
        pass

    @patch("controller.controller.controller.is_connected")
    def test_remove_milestone_not_logged_in(self):
        pass
