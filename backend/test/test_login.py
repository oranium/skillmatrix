import unittest
#
'''
Currently, the mock AD assumes the correct credentials to be : name = AzureAD.SWT.com\ADadmin passwd = @Administrator 
'''
class TestLogin(unittest.TestCase):

    def set_up(self):
        self.empty_string = ""
        self.wrong_credentials = "anything"
        self.correct_credentials_user =  "AzureAD.SWT.com\ADadmin"
        self.correct_credentials_pass

    def test_empty_string():
        self.assertIsInstance(LDAPUnknownAuthenticationMethodError,AuthenticationController.login(empty_string,empty_string))
