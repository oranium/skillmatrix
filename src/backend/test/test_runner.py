import unittest

#test modules
from test import test_db_model


#initialize the test suite

loader = unittest.TestLoader()
suite = unittest.TestSuite()

#add tests to suite

suite.addTests(loader.loadTestsFromModule(test_db_model))
#suite.addTests(loader.loadTestsFromModule(test_authentication))
#suite.addTests(loader.loadTestsFromModule(test_rest_api))
#suite.addTests(loader.loadTestsFromModule(test_database_manager))

#run tests
runner = unittest.TextTestRunner()
result = runner.run(suite) 

