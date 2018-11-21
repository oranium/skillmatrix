import unittest
#test modules
import test_authentication
import test_rest_api

#initialize the test suite
loader = unittest.TestLoader()
suite = unittest.TestSuite()

#add tests to suite
suite.addTests(loader.loadTestsFromModule(test_authentication))
suite.addTests(loader.loadTestsFromModule(test_rest_api))

#run tests
runner = unittest.TextTestRunner()
result = runner.run(suite) 




