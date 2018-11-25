"""authentication contains the Authentication class."""
import parentdir
from ldap3 import Server, Connection, MOCK_SYNC, ALL, NTLM
from ldap3.core.exceptions import LDAPUnknownAuthenticationMethodError, LDAPSocketOpenError
import json
import sys
# if info about the server is required:
# get info about server
# print(mock_server.info)
# get info about connection
# print(mock_connection)

class Authentication:
    '''
    The Authentication class handles communication
    to the Active Directory server via ldap3 library
    '''
    def __init__(self, serverURL):
        #The server url should look like this: <'''ldap://my-ldapserver.example.com:389>
        #Uni-Azure: server 'ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389'

        self.connections = {}
        if serverURL == "mock":
            # Create a mock server from the info and schema json files
            self.mock_server = Server.from_definition('my_mock_server',
                                                      './test/my_real_server_info.json',
                                                      './test/my_real_server_schema.json')
            # Create a MockSyncStrategy connection to the mock server
            self.mock_connection = Connection(self.mock_server,
                                              'AzureAD.SWT.com\Valdemar.Forsberg',
                                              '@testuser1 ',
                                              authentication=NTLM,
                                              client_strategy=MOCK_SYNC)
            # Populate the DIT of the mock server
            self.mock_connection.strategy.entries_from_json('./test/my_real_server_entries.json')
            # Add a mock user for Simple binding
            #self.mock_connection.strategy.add_entry('cn=Forsberg',
            #                                        {'userPassword': '@testuser1 ',
            #                                          'sn': 'Forsberg',
            #                                          'revision': 0})
            # Bind to the mock server
            self.mock_connection.bind()
            self.connections["mock"] = self.mock_connection
            return
        self.server = Server(serverURL, get_info=ALL)

    # should call db_controller according to #11
    def login(self, username, password):
        '''
        Creates a new connection to the AD.
        Returns JSON with user object on successful login,
        AttributeError for wrong credentials, TimeoutError if the AD doesn't respond.
        '''
        try:
            print("create connection", file=sys.stderr)
            new_connection = Connection(self.server,
                                        r'AzureAD.SWT.com\\'+username,
                                        password,
                                        authentication=NTLM,
                                        raise_exceptions=True)
            print("created connection!", file=sys.stderr)            
            #wrong credentials
            if new_connection is None:
                print("wrong cred",file=sys.stderr)
                raise AttributeError
            print("adding connection", file=sys.stderr)
            self.connections[username] = new_connection
            print("binding connection", file=sys.stderr)
            self.connections[username].bind()
            #successful login
            message = json.dumps(dict(user = dict(username = username)))
            print(message,file=sys.stderr)
            return message
        #catch empty input
        except LDAPUnknownAuthenticationMethodError:
            print("empty",file=sys.stderr)
            raise AttributeError
        #catch timeout while calling AD
        except LDAPSocketOpenError:
            raise TimeoutError
        #some kind of serialization error
        #something else went wrong, likely bind
        #except Exception:
        #    raise Exception
    
    # should call db_controller according to #12
    def logout(self, username):
        '''
        Logs out the user and returns True if no error, False if error
        '''
        try:
            del_connection = self.connections.pop(username)
            del_connection.unbind()
            return True
        except KeyError:
            return False


if __name__ == "__main__":
    AUTH = Authentication("ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389")
    AUTH.login("ADadmin", "@Admin")
    #AUTH.logout("Valdemar.Forsberg")
