from src.app import app
from src.controller.database_controller import database_controller
from src.controller.database import db
import json
import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine, Date, Text
from sqlalchemy.orm import sessionmaker
from os import environ
from sqlalchemy import create_engine
import unittest
from src.backend.src.controller import database_controller
from src.backend.src.controller import database
from src.backend.src.model.database_model import Association, MilestoneAssociation, Skill, Date, Users

def setUpModule():
    app.testing = True

class testDatabaseController(unittest.TestCase):

    def setUp(self):
        self.test_app = app.test_client()



    def tearDown(self):
        pass

    def test_search_success(self):
#
        pass



    def test_search_with_no_results(self):
        pass

    def test_set_skill(self):
        pass

    def test_add_milestone(self):
        pass

    def test_get_milstones(self):
        pass


    def test_get_assocs(self):
        pass

    def test_get_all_users(self):
        pass

    def test_get_all_skill_names(selfs):
        pass

    def test_get_skill_id(self):
        result = self.database_controller.get_skill_id("Java")
        self.assertEqual(result, 1)

    def test_get_skill(self):
        result = self.database_controller.get_skill("Python")
        self.assertEqual(result.name, "Python")

    def test_get_user_id(self):
        result = self.database_controller.get_user_id("Valdemar-Forsberg")
        self.assertEqual(result, 1)

    def test_get_user(self):
        result = self.database_controller.get_user_id("Valdemar-Forsberg")
        self.assertEqual(result.username, "Valdemar-Forsberg")
        self.assertEqual(result.name, "Valdemar Forsberg")

    def test_get_date_from_id(self):
        result = self.database_controller.get_date_from_id(1)
        self.assertEqual(result, 1)


    def test_get_user_from_id(self):
        result = self.database_controller.get_user_from_id(1)
        self.assertEqual(result.username, "Valdemar-Forsberg")

    def test_get_skill_from_id(self):
        result = self.database_controller.get_skill_from_id(1)
        self.assertEqual(result.name, "Java")

    def test_create_skill(self):
        new_skill = Skill(name='C#', category="Programming")
        db.session.add(new_skill)
        db.session.commit()
        self.assertEqual(Skill.query.filter_by(name="C#").first().name, "C#")
        Skill.query.filter_by(id=Skill.query.filter_by(name="C#").first().id).delete()



    def test_exists_success(self):
        self.assertTrue(Users.query.filter_by(username="Valdemar-Forsberg").first())

    def test_exists_fail(self):
        self.assertFalse(Users.query.filter_by(username="Lisza-Zulu").first())

    def test_get_skills(self):
        result = self.database_controller.get_skills("Valdemar-Forsberg")
        self.assertEqual(result, [[["Java", 3,[]]],["Python",4,[]],["JavaScript",2,[]]])

    def test_get_skills_inexistent(self):
        result = self.database_controller.get_skills("Lisza-Zulu")
        self.assertIsNone(result)

    def test_create_user(self):
        self.database_controller.create_user("Lisza-Zulu","Lisza Zulu")
        self.assertEqual(Users.query.filter(name="Lisza Zulu").first().name(), "Lisza Zulu")

    def test_get_recent_level(self):
        result = self.database_controller.get_recent_level(1,1)
        self.assertEqual(result, 3)

    def test_get_profile_models(self):
        result = self.database_controller.get_profile_models([Users("Valdemar-Forsberg","Valdemar Forsberg"), Users("Karl-Kalagin","Karl Kalagin")])
        expected_result =
        self.assertEqual(result, )


    def test_sum_relevant_skills(self):
        pass






