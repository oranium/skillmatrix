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
        self.TEST_MILESTONE1 = MilestoneModel(datetime.datetime(2018, 11, 30), "comment")
        self.TEST_MILESTONE2 = MilestoneModel(datetime.datetime(2014, 1, 22), "other comment")
        self.TEST_SKILL = SkillModel("Java", 3, [self.TEST_MILESTONE2, self.TEST_MILESTONE1])
        self.TEST_PROFILE_MODEL = ProfileModel("Aron", [self.TEST_SKILL])
        self.PROFILE_JSON = json.dumps(dict(username="Aron", skills=[self.TEST_SKILL.to_json()]))

    # TODO
    def test_to_json(self):
        self.assertEqual(self.PROFILE_JSON, self.TEST_PROFILE_MODEL.to_json())


class TestSearchModel(unittest.TestCase):
    pass


class TestLogoutModel(unittest.TestCase):
    def setUp(self):
        self.TEST_LOGOUT_MODEL = LogoutModel("some_name")
        self.LOGOUT_JSON = json.dumps(dict(user="some_name"))

    def test_to_json(self):
        self.assertEqual(self.LOGOUT_JSON, self.TEST_LOGOUT_MODEL.to_json())
