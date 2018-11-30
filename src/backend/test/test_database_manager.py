import parentdir
import unittest
from unittest.mock import patch
from src import database_manager

class TestDatabaseController(unittest.TestCase):
    '''unittests for database manager'''

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

    def test_handle_query_success(self):
        search_result = dict(skill="Java",result = dict(Aron=1,Willy=5))
        with patch.object(database_manager.database_handler, "search") as mock_search:
            mock_search.return_value = search_result
            self.assertEqual(search_result,database_manager.handle_query(self,"Java")) 

    def test_handle_query_no_results(self):
        with patch.object(database_manager.database_handler, "search") as mock_search:
            mock_search.return_value = None
            self.assertRaises(ValueError,database_manager.handle_query,self,"bad request that yields no results")

if __name__ == "__main__":
    unittest.main() 
