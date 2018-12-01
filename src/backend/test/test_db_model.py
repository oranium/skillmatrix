from src.app import app
from src.model.database_model import Time, Users
from src.controller.database import db
import unittest
import datetime


def setUpModule():
    app.testing= True


class TestdbUsersModel(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.user1 = Users()


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