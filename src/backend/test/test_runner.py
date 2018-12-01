import unittest

#test modules
from test import test_authentication,test_rest_api,test_database_controller, test_model


#initialize the test suite

loader = unittest.TestLoader()
suite = unittest.TestSuite()

#add tests to suite

suite.addTests(loader.loadTestsFromModule(test_authentication))
suite.addTests(loader.loadTestsFromModule(test_rest_api))
#suite.addTests(loader.loadTestsFromModule(test_database_controller))
suite.addTests(loader.loadTestsFromModule(test_model))
#run tests
runner = unittest.TextTestRunner()
result = runner.run(suite) 

