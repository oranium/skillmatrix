import set_root_backend
from src.model.search_model import SearchModel
from src.model.model import Model
from src.model.skill_model import SkillModel
from src.model.logout_model import LogoutModel
from src.model.milestone_model import MilestoneModel
from src.model.profile_model import ProfileModel
import unittest
import datetime


class TestModel(unittest.TestCase):

    def test_model_raise_not_implemented_error(self):
        self.assertRaises(NotImplementedError, Model.jsonable, self)


class TestProfileModel(unittest.TestCase):

    def setUp(self):
        self.TEST_MILESTONE_MODEL = MilestoneModel(datetime.date(2018, 11, 30), "Created humongous Python backend", 3)
        self.TEST_SKILL_MODEL = SkillModel("Java", 3, category="Programming", milestones=[self.TEST_MILESTONE_MODEL])
        self.TEST_PROFILE_MODEL = ProfileModel("Aron", "Aron", [self.TEST_SKILL_MODEL])
        self.MILESTONE_JSONABLE = dict(date="2018-11-30", comment="Created humongous Python backend", level=3)
        self.SKILL_JSONABLE = dict(skillname="Java", level=3, milestones=[self.TEST_MILESTONE_MODEL.jsonable()])
        self.PROFILE_JSONABLE = dict(username="Aron", name="Aron", skills=[self.TEST_SKILL_MODEL.jsonable()])

    # TODO
    def test_milestone_jsonable(self):
        self.assertEqual(self.MILESTONE_JSONABLE, self.TEST_MILESTONE_MODEL.jsonable())

    def test_skill_jsonable(self):
        self.assertEqual(self.SKILL_JSONABLE, self.TEST_SKILL_MODEL.jsonable())

    def test_profile_jsonable(self):
        self.assertEqual(self.PROFILE_JSONABLE, self.TEST_PROFILE_MODEL.jsonable())


class TestSearchModel(unittest.TestCase):

    def setUp(self):
        search_query = {"Java": 3, "Python": 2}
        search_results = {"has_some": [ProfileModel("Aron", "Aron", [SkillModel("Java", 3)])],
                          "has_all": [ProfileModel("Peter", "Peter", [SkillModel("Java", 4), SkillModel("Python", 5)])]}
        self.TEST_SEARCH = SearchModel(search_query, search_results)
        self.SEARCH_JSONABLE = dict(query=search_query,
                                    results=dict(
                                        has_all=
                                        [ProfileModel("Peter", "Peter",
                                                      [SkillModel("Java", 4), SkillModel("Python", 5)])
                                         .jsonable()],
                                        has_some=
                                        [ProfileModel("Aron", "Aron", [SkillModel("Java", 3)])
                                         .jsonable()]
                                    ))

    def test_jsonable(self):
        self.assertEqual(self.SEARCH_JSONABLE, self.TEST_SEARCH.jsonable())


class TestLogoutModel(unittest.TestCase):
    def setUp(self):
        self.TEST_LOGOUT_MODEL = LogoutModel("some_name")
        self.LOGOUT_JSONABLE = dict(user="some_name")

    def test_jsonable(self):
        self.assertEqual(self.LOGOUT_JSONABLE, self.TEST_LOGOUT_MODEL.jsonable())
