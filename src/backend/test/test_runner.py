import unittest

# test modules
from test import test_authentication_controller, test_rest_api, test_controller, test_model, test_db_model


# initialize the test suite

loader = unittest.TestLoader()
suite = unittest.TestSuite()

# add tests to suite
suite.addTests(loader.loadTestsFromModule(test_authentication_controller))
suite.addTests(loader.loadTestsFromModule(test_rest_api))
suite.addTests(loader.loadTestsFromModule(test_controller))
suite.addTests(loader.loadTestsFromModule(test_model))
suite.addTests(loader.loadTestsFromModule(test_db_model))

#run tests
runner = unittest.TextTestRunner()
result = runner.run(suite) 

