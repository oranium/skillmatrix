from ldap3 import Server, Connection, ALL, NTLM
import getpass


# server 'ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389'
class Authentication:
        
    def __init__(self, serverURL ):
        """
        The server url should look like this: <ldap://my-ldapserver.example.com:389> 
        """
        
        self.server = Server(serverURL, get_info=ALL)

    def login(self, username, password):
        """
        The server url should look like this: <domain/username>
        """
        
        self.conn = Connection(self.server, username, password, authentication=NTLM)
        self.conn.bind()


    def show_current_login(self ):
        print(self.conn.extend.standard.who_am_i())




#username: AzureAD.SWT.com\ADadmin
#password: @Administrator

# the url of the active directory you want to access.
url =  "ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389"

user = Authentication(url)

username = input("In order to login, enter a valide username!\nit should have the following format: <domain\\username>\n")

password = getpass.getpass('Please enter the Password for: '+ username +"\n")

user.login(username, password)
user.show_current_login()





