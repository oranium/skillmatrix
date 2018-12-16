"""authentication contains the Authentication class."""
from ldap3 import Server, Connection, ALL, NTLM, SUBTREE
from ldap3.core.exceptions import LDAPUnknownAuthenticationMethodError, LDAPSocketOpenError, \
    LDAPInvalidCredentialsResult
from os import environ
import sys
import re
# if info about the server is required:
# get info about server
# print(mock_server.info)
# get info about connection
# print(mock_connection)


class AuthenticationController:
    """
    The Authentication class handles communication
    to the Active Directory server via ldap3 library
    """

    def __init__(self, server_url, prefix):
        # The server url should look like this: <'''ldap://my-ldapserver.example.com:389>
        # Uni-Azure: server 'ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389'

        self.connections = {}
        self.server = Server(server_url, get_info=ALL)
        self.login_prefix = prefix

    @staticmethod
    def login(username, password):
        """
        Creates a new connection to the AD.
        Returns JSON with user object on successful login,
        AttributeError for wrong credentials, TimeoutError if the AD doesn't respond.
        """
        try:
            print(username, file=sys.stderr)
            print(password, file=sys.stderr)
            login_name = authentication_controller.login_prefix+username
            print(login_name, file=sys.stderr)
            new_connection = Connection(authentication_controller.server,
                                        login_name,
                                        password,
                                        authentication=NTLM,
                                        raise_exceptions=True)
            print("created connection!", file=sys.stderr)            
            # wrong credentials
            if new_connection is None:
                print("wrong cred", file=sys.stderr)
                raise AttributeError
            print("binding connection", file=sys.stderr)
            new_connection.bind()
            print("adding connection", file=sys.stderr)
            # successful login
            authentication_controller.connections[username] = new_connection
            return authentication_controller.get_name(username)
        # catch empty input
        except (LDAPUnknownAuthenticationMethodError, LDAPInvalidCredentialsResult):
            print("empty", file=sys.stderr)
            raise AttributeError
        # catch timeout while calling AD
        except LDAPSocketOpenError:
            raise TimeoutError
    
    @staticmethod
    def logout( username):
        """
        Logs out the user and returns True if no error, False if error
        """
        try:
            del_connection = authentication_controller.connections.pop(username)
            del_connection.unbind()
            return True
        except KeyError:
            return False

    # TODO: extract name from Active Directory
    @staticmethod
    def get_name(username):
        """Gets the name of a user in the Active Directory.
        Args:
            username (str): the Active Directory username.
        Returns:
            displayname (str): the Active Directory CN (Common Name) 
        """
        try:
            connection = authentication_controller.connections[username]
            regex_principal_name = re.search('([^\\\\]+$)', username)
            user_principal_name = regex_principal_name.group(0)

            connection.search(search_base='CN=Users,DC=AzureAD,DC=SWT,DC=com',
                              search_filter='(&(objectCategory=person)(sAMAccountName='+user_principal_name+'))', search_scope=SUBTREE,
                              attributes=['cn'])
            displayname = connection.response[0]['attributes']['cn']
            return displayname
        except LDAPSocketOpenError:
            raise TimeoutError
        except IndexError:
            print("The response of connection-search was empty")
        except Exception:
            print("Unexpected error: ", sys.exc_info()[0])
            raise



authentication_controller = AuthenticationController(environ.get('SERVER_URL'),
                                                     environ.get('SERVER_PREFIX'))
