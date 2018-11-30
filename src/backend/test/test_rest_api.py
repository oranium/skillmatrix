import parentdir
import unittest
from unittest.mock import patch,ANY
import json
from src import rest_api,authentication,database_manager

def setUpModule():
    rest_api.app.testing = True

class TestLoginAPI(unittest.TestCase):   
    def setUp(self):
        self.test_app = rest_api.app.test_client()
        self.TEST_JSON = json.dumps(dict(username="somename",password="somepass"))
    
    def success_response_code(self):
        self.assertEqual(self.test_app.post("/login").status_code,200)

    def test_login_api_call_login(self):
        with patch.object(authentication.Authentication, "login") as mock_login:
            self.test_app.post("/login",data=self.TEST_JSON,content_type="application/json")
            mock_login.assert_called_with(ANY,"somename","somepass")

        
    def test_login_api_wrong_credentials(self):
        with patch.object(authentication.Authentication,"login") as mock_login:
            mock_login.side_effect = AttributeError
            self.assertEqual(self.test_app.post("/login").status_code,400)

    def test_login_api_timeout(self):
        with patch.object(authentication.Authentication, "login") as mock_login:
            mock_login.side_effect = TimeoutError
            self.assertEqual(self.test_app.post("/login").status_code,504)

    def test_login_api_unknown_exception(self):
        with patch.object(authentication.Authentication,"login") as mock_login:
            mock_login.side_effect = Exception
            self.assertEqual(self.test_app.post("/login").status_code,520)

    def test_login_api_illegal_method(self):
        self.assertEqual(self.test_app.get("/login").status_code,405)   

class TestLogoutAPI(unittest.TestCase):
    def setUp(self):
        self.test_app = rest_api.app.test_client()
        self.TEST_JSON = json.dumps(dict(username="someuser"))

    def success_response_code(self):
        self.assertEqual(self.test_app.post("/logout").status_code,200)

    def test_logout_api_call_logout(self):
        with patch.object(authentication.Authentication, "logout") as mock_logout:
            self.test_app.post("/logout",data=self.TEST_JSON,content_type="application/json")
            mock_logout.assert_called_with(ANY,"someuser")

    def test_logout_api_fail(self):
        with patch.object(authentication.Authentication, "logout") as mock_logout:
            mock_logout.side_effect = Exception
            self.assertEqual(self.test_app.post("/logout").status_code,520)

    def test_logout_api_illegal_method(self):
        return self.assertEqual(self.test_app.get("/logout").status_code,405)

class TestSearchAPI(unittest.TestCase):
    def setUp(self):
        self.test_app = rest_api.app.test_client()
        self.TEST_JSON = json.dumps(dict(query="Java"))
        self.TEST_RETURN = dict(skill="Java",results=dict(Aron=1,Willy=5))

    def success_response_code(self):
        self.assertEqual(self.test_app.post("/search").status_code, 200)
    
    def test_search_api_call_handle_query(self):
        with patch.object(database_manager, "handle_query") as mock_handler:
            self.test_app.post("/search",data=self.TEST_JSON,content_type="application/json")
            mock_handler.assert_called_with(ANY,"Java")

    def test_search_api_results_found(self):
        with patch.object(database_manager, "handle_query") as mock_handler:
            mock_handler.return_value = self.TEST_RETURN
            self.assertEqual(self.TEST_RETURN,
                              self.test_app.post("/search",
                                                  data=self.TEST_JSON,
                                                  content_type="application/json")
            )

    def test_search_api_no_results(self):
        with patch.object(database_manager, "handle_query") as mock_handler:
            mock_handler.side_effect = ValueError
            self.assertEqual(json.dumps(list()),self.test_app.post("/search"))

if __name__ == "__main__":
    unittest.main()