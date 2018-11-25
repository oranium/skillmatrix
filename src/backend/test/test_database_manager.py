import parentdir
import unittest
from unittest.mock import patch
from flask import Flask, json, request, redirect
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from src import database_manager


def setUpModule():
    database_manager.app.testing = True
    
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
api = Api(app)
db = SQLAlchemy(app)

from src.user import User
from src.skill import Skill
from src.session import Session


class Test_TestDatabaseController(unittest.TestCase):
    '''unittests for the database manager'''

    def setUp(self):
        #self.database_table_test = users
        #self.database_handler_test = database_manager.database_handler()
        
        db.drop_all()
        db.create_all()
            # add testdata here

    def tearDown(self):
        db.session.remove()
        db.drop_all()
 
    def test_clear_database(self):
        empty_skill_table =  Skill.query.all()
        empty_user_talbe = Users.query.all()
        empty_session_table = Session.query.all()
        assertEquals(empty_skill_table, None, "The skill table was not cleared.")
        assertEquals(empty_user_talbe, None, "The user table was not cleared.")
        assertEquals(empty_session_table, None, "The session table was not cleared.")

        
    def test_get_all(self, level):
        pass

    def test_set_skill(self, level, date):
        pass

    def test_get_profile(self, user):
        pass
    


    def test_add_user_success(self, user, place1= None):
        with patch.object(database_manager.database_handler(),"add_user") as mock_add_user:
            mock_add_user("someusername")
            user_object = user.Users.query.filter_by(username = user).first()
            self.assertEqual(user_object.username, "someusername", "The user was not correctly inserted into the database.")

            
    def test_delete_user_success(self, user):
        with patch.object(database_manager.database_handler(),"delete_user") as mock_delete_user:
            mock_delete_user("someusername")
            user_object = database_table_test.query.filter_by(username = user).first()
            self.assertEqual(user_object, None, "The user was not correctly deleted from the database.")


    def test_add_skill_success(self, user, skill1, level1, date):

        with patch.object(database_manager.database_handler(),"add_skill") as mock_add_skill:
            object_name = Users(username = user)
            db.session.add(object_name)
            db.session.commit()

            mock_add_skill("someusername", "skill", 5)
            user_object = user.Users.query.filter_by(username = user).first()
            self.assertEqual(user_object.username, "someusername", "The user was not correctly inserted into the database.")


    def test_handle_query_success(self):
        search_result = dict(skill="Java",result = dict(Aron=1,Willy=5))
        search_result.keys
        with patch.object(database_manager.database_handler, "search") as mock_search:
            mock_search.return_value = search_result
            self.assertEqual(search_result,database_manager.handle_query(self,"Java")) 

    def test_handle_query_no_results(self):
        with patch.object(database_manager.database_handler, "search") as mock_search:
            mock_search.return_value = None
            self.assertRaises(ValueError,database_manager.handle_query,self,"bad request that yields no results")

if __name__ == "__main__":
    unittest.main() 
