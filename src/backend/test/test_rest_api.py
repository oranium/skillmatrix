import parentdir
import unittest
from unittest.mock import patch,ANY
import json
from src import rest_api,authentication

def setUpModule():
    rest_api.app.testing = True

class TestLoginAPI(unittest.TestCase):   
    def setUp(self):
        self.test_app = rest_api.app.test_client()
        self.test_json = json.dumps(dict(username="somename",password="somepass"))
    
    def success_response_code(self):
        self.assertEqual(self.test_app.post("/login").status_code,200)

    def test_login_api_call_login(self):
        with patch.object(authentication.Authentication, "login") as mock_login:
            self.test_app.post("/login",data=self.test_json,content_type="application/json")
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
        self.test_json = json.dumps(dict(username="someuser"))

    def success_response_code(self):
        self.assertEqual(self.test_app.post("/logout").status_code,200)

    def test_logout_api_call_logout(self):
        with patch.object(authentication.Authentication, "logout") as mock_logout:
            self.test_app.post("/logout",data=self.test_json,content_type="application/json")
            mock_logout.assert_called_with(ANY,"someuser")

    def test_logout_api_fail(self):
        with patch.object(authentication.Authentication, "logout") as mock_logout:
            mock_logout.side_effect = Exception
            self.assertEqual(self.test_app.post("/logout").status_code,520)

    def test_logout_api_illegal_method(self):
        return self.assertEqual(self.test_app.get("/logout").status_code,405)

if __name__ == "__main__":
    unittest.main()