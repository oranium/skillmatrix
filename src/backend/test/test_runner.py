import unittest

import test_database_manager

#init test suite
loader = unittest.TestLoader()
suite = unittest.TestSuite()

#add tests to suite
suite.addTests(loader.loadTestsFromModule(test_database_manager))

runner = unittest.TextTestRunner()
result = runner.run(suite)

