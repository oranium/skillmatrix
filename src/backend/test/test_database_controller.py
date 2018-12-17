from src.app import app
from src.controller.database_controller import database_controller
from src.controller.database import db
import json
import unittest
from unittest.mock import patch, ANY


class testDatabaseController(unittest.TestCase):

    def setUp(self):
        self.test_app = app.test_client()

    def tearDown(self):
        pass

    def test_search_success(self):
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

    def test_get_skill(self):
        pass

    def test_get_user_id(self):
        pass

    def test_get_user(self):
        pass

    def test_get_date_from_id(self):
        pass

    def test_get_user_from_id(self):
        pass

    def test_get_skill_from_id(self):
        pass

    def test_create_skill(self):
        pass

    def test_exists(self):
        pass

    def test_get_skills(self):
        pass

    def test_create_user(self):
        pass

    def test_get_recent_level(self):
        pass

    def test_get_profile_models(self):
        pass

    def test_sum_relevant_skills(self):
        pass






