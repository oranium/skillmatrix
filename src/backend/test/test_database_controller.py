import unittest
from unittest.mock import patch
from src.controller.controller import controller


class TestDatabaseController(unittest.TestCase):
    '''unittests for database controller'''

    def test_get_all(self, level):
        pass

    def test_set_skill(self, level, date):
        pass

    def test_get_profile(self, user):
        pass

    def test_add_user(self, user):
        pass

    def test_delete_user(self, user):
        pass

    def test_add_skill(self, user):
        pass

    def test_search_success(self):
        search_result = dict(skill="Java",result = dict(Aron=1,Willy=5))
        with patch.object(controller, "search") as mock_search:
            mock_search.return_value = search_result
            self.assertEqual(search_result, controller.search(self, "Java"))

    def test_search_no_results(self):
        with patch.object(controller, "search") as mock_search:
            mock_search.return_value = None
            self.assertRaises(ValueError, controller.search, self, "bad request that yields no results")

