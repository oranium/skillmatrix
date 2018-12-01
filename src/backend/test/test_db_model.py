from src.app import app
from src.model.database_model import Time
import unittest
import datetime

def setUpModule():
    app.testing= True

class TestdbTimeModel(unittest.TestCase):
    def setUp(self):
        self.test_app = app.test_client()
        self.time1= Time()
        self.time2 = Time()
        self.mydate = datetime.date(2018,12,1)
        self.id1 = self.time1.get_id()

    def test_time_autoincrement(self):
        self.assertEqual(self.id1, self.time2.id)

    def test_time(self):
        self.assertEqual(self.time1.get_time(), self.mydate)

