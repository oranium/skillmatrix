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
        self.correct_credentials_pass = "@Administrator"    

    def test_login_empty_string():
        self.assertEqual("Please check if username and password were submitted.",AuthenticationController.login(self.empty_string,empty_string))

    def test_login_timeout():
        self.assertEqual("Timeout. Check connection to Active Directory service.",AuthenticationController.login(self.empty_string,"timeout"))
    
    def test_login_wrong_credentials():
        self.assertEqual("Login unsuccessful. Please check username and password.",AuthenticationController.login(self.wrong_credentials,wrong_credentials))
    
    def test_login_correct_credentials():
        self.assertEqual("Logged in.",AuthenticationController.login(self.correct_credentials_user,self.correct_credentials_pass))