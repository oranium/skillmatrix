from controller.controller import controller
import unittest
from unittest.mock import patch, ANY
import json
from app import app


def setUpModule():
    app.testing = True


class TestLoginAPI(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.TEST_LOGIN_JSON = json.dumps(dict(username="somename", password="somepass"))

    def success_response_code(self):
        self.assertEqual(self.test_app.post("/login").status_code, 200)

    def test_login_api_call_login(self):
        with patch.object(controller, "login") as mock_login:
            self.test_app.post("/login", data=self.TEST_LOGIN_JSON, content_type="application/json")
            mock_login.assert_called_with("somename", "somepass")

    def test_login_api_wrong_credentials(self):
        with patch.object(controller, "login") as mock_login:
            mock_login.side_effect = AttributeError
            self.assertEqual(self.test_app.post("/login").status_code, 400)

    def test_login_api_timeout(self):
        with patch.object(controller, "login") as mock_login:
            mock_login.side_effect = TimeoutError
            self.assertEqual(self.test_app.post("/login").status_code, 504)

    def test_login_api_unknown_exception(self):
        with patch.object(controller, "login") as mock_login:
            mock_login.side_effect = Exception
            self.assertEqual(self.test_app.post("/login").status_code, 520)

    def test_login_api_illegal_method(self):
        self.assertEqual(self.test_app.get("/login").status_code, 405)


class TestLogoutAPI(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.TEST_JSON = json.dumps(dict(username="someuser"))

    def success_response_code(self):
        self.assertEqual(self.test_app.post("/logout").status_code, 200)

    def test_logout_api_call_logout(self):
        with patch.object(controller, "logout") as mock_logout:
            self.test_app.post("/logout", data=self.TEST_JSON, content_type="application/json")
            mock_logout.assert_called_with("someuser")

    def test_logout_api_fail(self):
        with patch.object(controller, "logout") as mock_logout:
            mock_logout.side_effect = Exception
            self.assertEqual(self.test_app.post("/logout").status_code, 520)

    def test_logout_api_illegal_method(self):
        return self.assertEqual(self.test_app.get("/logout").status_code, 405)


class TestSearchAPI(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.TEST_JSON = json.dumps(dict(query=dict(Java=1)))
        self.TEST_RETURN = dict(skill="Java", results=dict(has_all=dict(Aron=1, Willy=5)), has_some=dict())

    def success_response_code(self):
        self.assertEqual(self.test_app.post("/search").status_code, 200)

    def test_search_api_call_search(self):
        with patch.object(controller, "search") as mock_handler:
            self.test_app.post("/search", data=self.TEST_JSON, content_type="application/json")
            mock_handler.assert_called_with(ANY, dict(Java=1))

    # TODO: resolve application context error
    def test_search_api_results_found(self):
        with patch.object(controller, "search") as mock_handler:
            mock_handler.return_value = self.TEST_RETURN
            resp = self.test_app.post("/search", data=self.TEST_JSON, content_type="application/json").get_json()
            self.assertEqual(self.TEST_RETURN, resp)

    def test_search_api_no_results(self):
        with patch.object(controller, "search") as mock_handler:
            mock_handler.side_effect = ValueError
            self.assertEqual(json.dumps(list()), self.test_app.post("/search").get_json())


class TestCreateSkill(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.TEST_JSON = json.dumps(dict(username="Aron",
                                         skillname="Python",
                                         skillpath="Programming/Python",
                                         category="Programming")
                                    )
        self.TEST_RETURN = json.dumps(None)

    def test_call_create_skill(self):
        with patch.object(controller, "create_skill") as mock_handler:
            self.test_app.post("/createSkill", data=self.TEST_JSON, content_type="application/json")
            mock_handler.assert_called_with("Aron", "Python", "Programming/Python", "Programming")


class TestGetSkills(unittest.TestCase):
    # not testing POST at the moment because the program does not use it
    def setUp(self):
        self.test_app = app.test_client()
        self.SKILL_LIST = [{"Programming/Python":
                                {1: "Beginner",
                                 2: "Normal",
                                 3: "Advanced",
                                 4: "Senior",
                                 5: "Guru"}},
                           ["Programming", "Design"]]
        self.TEST_RETURN = json.dumps(self.SKILL_LIST)

    def test_call_get_paths_with_guidelines(self):
        with patch.object(controller, "get_paths_with_guidelines") as mock_handler:
            self.test_app.get("/getSkills")
            mock_handler.assert_called_once()


class TestSetSkills(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.TEST_JSON = dict(username="Karl-Kalagin", skills={"Programming/Python": 5})
        self.TEST_RETURN = json.dumps({"username": "Karl-Kalagin",
                                       "name": "Karl Kalagin",
                                       "skills": {"skillname": "Programming",
                                                  "skillpath": "Programming",
                                                  "level": 1,
                                                  "subcategories": [{"skillpath": "Programming/Python",
                                                                     "skillname": "Python",
                                                                     "level": 5,
                                                                     "subcategories": []}
                                                                    ]
                                                  }
                                       })

    def test_call_set_skills(self):
        with patch.object(controller, "set_skills") as mock_handler:
            self.test_app.post("/setSkills", data=self.TEST_JSON, content_type="application/json")
            mock_handler.assert_called_with("Karl-Kalagin", {"Programming/Python": 5})


class TestGuideline(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()


class TestMilestone(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()


class TestRemoveMilestone(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()


class TestRemoveSkill(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()


if __name__ == "__main__":
    unittest.main()
