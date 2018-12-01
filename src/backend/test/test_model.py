from model.search_model import SearchModel
from src.model.model import Model
from src.model.skill_model import SkillModel
from src.model.logout_model import LogoutModel
from src.model.milestone_model import MilestoneModel
from src.model.profile_model import ProfileModel
import unittest
import json
import datetime


class TestModel(unittest.TestCase):

    def test_model_raise_not_implemented_error(self):
        self.assertRaises(NotImplementedError, Model.to_json, self)


class TestSkillModel(unittest.TestCase):
    def setUp(self):
        self.TEST_SKILL_MODEL = SkillModel("Java", 3)
        self.SKILL_JSON = json.dumps(dict(skillname="Java", level=3, milestones=list()))

    def test_to_json(self):
        self.assertEqual(self.SKILL_JSON, self.TEST_SKILL_MODEL.to_json())


class TestMilestoneModel(unittest.TestCase):
    def setUp(self):
        self.TEST_MILESTONE_MODEL = MilestoneModel(datetime.date(2018, 11, 30), "Created humongous Python backend")
        self.MILESTONE_JSON = json.dumps(dict(date=datetime.date(2018, 11, 30).isoformat(),
                                              comment="Created humongous Python backend"))

    def test_to_json(self):
        self.assertEqual(self.MILESTONE_JSON, self.TEST_MILESTONE_MODEL.to_json())


class TestProfileModel(unittest.TestCase):

    def setUp(self):
        test_milestone1 = MilestoneModel(datetime.datetime(2018, 11, 30), "comment")
        test_milestone2 = MilestoneModel(datetime.datetime(2014, 1, 22), "other comment")
        test_skill = SkillModel("Java", 3, [test_milestone2, test_milestone1])
        self.TEST_PROFILE_MODEL = ProfileModel("Aron", [test_skill])
        self.PROFILE_JSON = json.dumps(dict(username="Aron", skills=[test_skill.to_json()]))

    # TODO
    def test_to_json(self):
        self.assertEqual(self.PROFILE_JSON, self.TEST_PROFILE_MODEL.to_json())


class TestSearchModel(unittest.TestCase):

    def setUp(self):
        search_query = {"Java": 3, "Python": 2}
        search_results = {"has_some": [ProfileModel("Aron", [SkillModel("Java", 3)])],
                          "has_all": [ProfileModel("Peter", [SkillModel("Java", 4), SkillModel("Python", 5)])]}
        self.TEST_SEARCH = SearchModel(search_query, search_results)
        self.SEARCH_JSON = json.dumps(dict
                                      (query=search_query,
                                       has_all=[ProfileModel
                                                ("Peter", [SkillModel("Java", 4), SkillModel("Python", 5)])
                                                .to_json()],
                                       has_some=[ProfileModel
                                                 ("Aron", [SkillModel("Java", 3)])
                                                 .to_json()]
                                       )
                                      )

    def test_to_json(self):
        self.maxDiff = None
        self.assertEqual(self.SEARCH_JSON, self.TEST_SEARCH.to_json())


class TestLogoutModel(unittest.TestCase):
    def setUp(self):
        self.TEST_LOGOUT_MODEL = LogoutModel("some_name")
        self.LOGOUT_JSON = json.dumps(dict(user="some_name"))

    def test_to_json(self):
        self.assertEqual(self.LOGOUT_JSON, self.TEST_LOGOUT_MODEL.to_json())
