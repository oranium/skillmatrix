#sets backend root as starting directory
import parentdir
from ldap3 import Server, Connection, MOCK_SYNC, OFFLINE_AD_2012_R2, NTLM
from ldap3.core.exceptions import LDAPUnknownAuthenticationMethodError,LDAPSocketOpenError

"""
if info about the server is required:
get info about server
print(mock_server.info)
get info about connection
print(mock_connection)
"""

class Authentication:
    def __init__(self, serverURL):
        """
        The server url should look like this: <'''ldap://my-ldapserver.example.com:389>
        Uni-Azure: server 'ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389'
        """
        self.connections = {}
        if serverURL == "mock":
            # Create a mock server from the info and schema json files
            self.mock_server = Server.from_definition('my_mock_server', './test/my_real_server_info.json', './test/my_real_server_schema.json')
            # Create a MockSyncStrategy connection to the mock server
            self.mock_connection = Connection(self.mock_server,'AzureAD.SWT.com\Valdemar.Forsberg','@testuser1 ',authentication=NTLM, client_strategy=MOCK_SYNC)
            # Populate the DIT of the mock server
            self.mock_connection.strategy.entries_from_json('./test/my_real_server_entries.json')
            # Add a mock usereturn {"user":{},"error":2}r for Simple binding
            #self.mock_connection.strategy.add_entry('cn=Forsberg', {'userPassword': '@testuser1 ', 'sn': 'Forsberg', 'revision': 0})
            # Bind to the mock server
            self.mock_connection.bind()
            self.connections["mock"] = self.mock_connection
            return  


    # should call db_controller according to #11
    def login(self, username, password):
        try:
            new_connection = Connection(self.mock_server,'AzureAD.SWT.com\\'+username,password,authentication=NTLM,client_strategy=MOCK_SYNC,raise_exceptions = True)
            #wrong credentials
            if new_connection == None:
                raise AttributeError
            self.connections[username] = new_connection
            self.connections[username].bind()
            print(self.connections[username])
            #successful login
            return {"user":{"username":username}}
        #catch empty input
        except LDAPUnknownAuthenticationMethodError:
            raise AttributeError
        #timeout while calling AD
        except LDAPSocketOpenError:
            raise TimeoutError
        #something else went wrong
        except Exception:
            return Exception
    
    # should call db_controller according to #12
    def logout(self, username):
        try:
            self.connections[username].unbind()
            self.connections.pop(username)
            return True
        except KeyError:
            print("Connection " +username+ " doesn't exist." )

auth = Authentication("Placeholder")

if __name__ == "__main__":
    auth = Authentication("mock")
    auth.login("Valdemar.Forseberg","@testuser69")
    auth.logout("Valdemar.Forsberg")