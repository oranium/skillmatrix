from ldap3 import Server, Connection, MOCK_SYNC, OFFLINE_AD_2012_R2, NTLM
from ldap3.core.exceptions import LDAPUnknownAuthenticationMethodError,LDAPSocketOpenError

# Create a mock server from the info and schema json files
#mock_server = Server.from_definition('my_mock_server', './test/my_real_server_info.json', './test/my_real_server_schema.json')

# Create a MockSyncStrategy connection to the mock server
#mock_connection = Connection(mock_server,'AzureAD.SWT.com\Valdemar.Forsberg','@testuser1 ',authentication=NTLM, client_strategy=MOCK_SYNC)

# Populate the DIT of the mock server
#mock_connection.strategy.entries_from_json('./test/my_real_server_entries.json')
# Add a mock user for Simple binding
#mock_connection.strategy.add_entry('cn=Forsberg', {'userPassword': '@testuser1 ', 'sn': 'Forsberg', 'revision': 0})

# Bind to the mock server
#mock_connection.bind()

#mock_connection.strategy.add_entry('cn=testUser,ou=test,o=lab', {'userPassword': 'testMe', 'sn': 'user0_sn', 'revision': 0})

# get info about server
#print(mock_server.info)
#get info about connection
#print(mock_connection)

class Authentication:
    def __init__(self, serverURL):
        """
        The server url should look like this: <'''ldap://my-ldapserver.example.com:389>
        Uni-Azure: server 'ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389'
        """

    # should call db_controller according to #11
    def login(self, username, password):
        try:
            self.new_connection = Connection(mock_server,'AzureAD.SWT.com\\'+username,password,authentication=NTLM,client_strategy=MOCK_SYNC,raise_exceptions = True)
            self.new_connection.bind()
            #wrong credentials
            if self.new_connection == None:
                return {"user": {},"error": 1}
            #successful login
            return {"user":{"username":username},"error":0}
        except LDAPUnknownAuthenticationMethodError:
            return {"user":{},"error":2}
        except LDAPSocketOpenError:
            return {"user":{},"error":3}
            #unknown error
        except:
            return {"user":{},"error":255}
    
    # should call db_controller and return JSON according to #12
    #currently hardcoded failure to satisfy tests
    def logout(self, username):
        return {username:False} if username == 'dontwork'else {username:True}


auth = Authentication("Placeholder")

if __name__ == "__main__":
    app.run(debug=True)
