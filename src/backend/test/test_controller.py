import set_root_backend
from src.controller.controller import controller
import unittest
from unittest.mock import patch


class TestController(unittest.TestCase):
    """unittests for database controller"""

    def test_login_success(self):
        pass

    def test_login_new_user(self):
        pass

    def test_logout(self):
        pass

    def test_logout_no_permission(self):
        pass

    def test_search_success(self):
        search_result = dict(skill="Java", result=dict(Aron=1, Willy=5))
        with patch.object(controller, "search") as mock_search:
            mock_search.return_value = search_result
            self.assertEqual(search_result, controller.search(self, "Java"))

    def test_search_no_results(self):
        with patch.object(controller, "search") as mock_search:
            mock_search.return_value = None
            self.assertRaises(ValueError, controller.search, self, "bad request that yields no results")

    def test_search_no_permission(self):
        pass

    def test_set_skill(self):
        pass

    def test_set_skill_no_permission(self):
        pass

    def test_add_milestone(self):
        pass

    def test_add_milestone_no_permission(self):
        pass

    def test_is_connected(self):
        pass

    def test_is_connected_no_connections(self):
        pass

    
