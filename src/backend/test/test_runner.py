import unittest
#test modules
import test_login

#initialize the test suite
loader = unittest.TestLoader()
suite = unittest.TestSuite()

#add tests to suite
suite.addTests(loader.loadTestsFromModule(test_login))

#run tests
runner = unittest.TextTestRunner()
result = runner.run(suite) 




