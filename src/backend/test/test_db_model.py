import set_root_backend

from src.app import app
from src.model.database_model import Time, Users, Milestone
from src.controller.database import db
import unittest
import datetime


def setUpModule():
    app.testing= True


class TestdbUsersModel(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.user1 = Users(username = 'wpertsch', surname = 'Pertsch', forename = 'Wilhelm')
        db.session.add(self.user1)
        db.session.commit()

    def tearDown(self):
        Users.query.filter_by(id=self.user1.id).delete()
        db.session.commit()

    def test_users_username(self):
        self.assertEqual(self.user1.username, 'wpertsch')

    def test_users_surname(self):
        self.assertEqual(self.user1.surname, 'Pertsch')

    def test_users_forename(self):
        self.assertEqual(self.user1.forename, 'Wilhelm')


class TestdbMilestoneModel(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.milestone1 = Milestone(name = 'bootcamp', description= 'ja ne war halt echt keiner da')
        self.milestone2 = Milestone(name='wievielwarenda?')
        db.session.add(self.milestone1)
        db.session.add(self.milestone2)
        db.session.commit()

    def tearDown(self):
        Users.query.filter_by(id=self.milestone1.id).delete()
        Users.query.filter_by(id=self.milestone2.id).delete()
        # db.session.commit()

    def test_milestone_name(self):
        self.assertEqual(self.milestone1.name, 'bootcamp')

    def test_milestone_without_description(self):
        self.assertEqual(self.milestone2.name, 'wievielwarenda?')

    def test_milestone_no_description(self):
        self.assertEqual(self.milestone2.description, None)

    def test_milestone_description(self):
        self.assertEqual(self.milestone1.description, 'ja ne war halt echt keiner da')




class TestdbTimeModel(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.time1= Time()
        self.time2 = Time()
        db.session.add(self.time1)
        db.session.add(self.time2)
        db.session.commit()

    def tearDown(self):
        Time.query.filter_by(id=self.time1.id).delete()
        Time.query.filter_by(id=self.time2.id).delete()
        db.session.commit()

    def test_time_autoincrement(self):
        self.assertEqual(self.time1.id+1, self.time2.id)

    def test_time(self):
        self.assertEqual(self.time1.get_time(), datetime.date.today())