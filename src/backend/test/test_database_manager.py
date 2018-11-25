import parentdir
from flask import Flask
from flask import Flask, json, request, redirect
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
import unittest
from unittest.mock import patch
from src import database_manager
from src.database_manager import users, db

def setUpModule():
    database_manager.app.testing = True
    
    

class Test_TestDatabaseController(unittest.TestCase):
    '''unittests for the database manager'''

    def SetUp(self):
        db.create_all()
        self.database_table_test = users
        self.database_handler_test = database_manager.database_handler()
        
        '''
        app = Flask(__name__)
        app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Momomomo2@localhost/sm1'
        api = Api(app)
        db = SQLAlchemy(app)
        with self.app.app_context():
            db.create_all()
            # add testdata here

        '''

    def tearDown(self):

        self.app = Flask(__name__)
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

        
        
    def test_get_all(self, level):
        
        pass

    def test_set_skill(self, level, date):
        
        pass

    def test_get_profile(self, user):

        pass

    def test_add_user(self, username1, surname1, forename1, place1= None):
        self.database_handler_test.add_user("someusername","somesurname","someforename")
        user_object = self.database_table_test.query.filter_by(username = username1).first()
        self.assertEqual(user_object.username, "someusername", "The user was not correctly inserted into the database.")
        
        '''
        with patch.object(database_manager.database_handler(),"add_user") as mock_add_user:
            with patch.object(database_manager.)
            mock_add_user.add_user
            mock_add_user.assert_("someusername","somesurname","someforename")
            
            self.assert
        '''


    def test_delete_user(self, user):
        pass

    def test_add_skill(self, user):
        pass

    def test_handle_query_success(self):
        search_result = dict(skill="Java",result = dict(Aron=1,Willy=5))
        with patch.object(database_manager.database_handler, "search") as mock_search:
            mock_search.return_value = search_result
            self.assertEqual(search_result,database_manager.handle_query(self,"Java")) 

    def test_handle_query_no_results(self):
        with patch.object(database_manager.database_handler, "search") as mock_search:
            mock_search.return_value = None
            self.assertRaises(ValueError,database_manager.handle_query,self,"bad request that yields no results")

if __name__ == "__main__":
    unittest.main() 
