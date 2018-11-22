import unittest
import json
from src import rest_api

def setUpModule():
    rest_api.app.testing = True

class TestLoginAPI(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.test_app = rest_api.app.test_client()
    
    def test_login_api__success_response_code(self):
        self.assertEqual(self.test_app.post("/login").status_code,200)

    def test_login_api_illegal_method(self):
        self.assertEqual(self.test_app.get("/login").status_code,405)


class TestLogoutAPI(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.test_app = rest_api.app.test_client()

    def setUp(self):
        self.app = rest_api.app

    def test_logout_api_success(self):
        response = self.test_app.post("/logout",data={"username":"work"}).get_json()
        self.assertEqual(response,{"work":True})

    def test_logout_api_fail(self):
        response = self.test_app.post("/logout",data={"username":"dontwork"}).get_json()
        self.assertEqual(response,{"dontwork":False})

    def test_logout_response_code(self):
        return self.assertEqual(self.test_app.post("/logout").status_code,200)

    def test_logout_api_illegal_method(self):
        return self.assertEqual(self.test_app.get("/logout").status_code,405)

if __name__ == "__main__":
    unittest.main()