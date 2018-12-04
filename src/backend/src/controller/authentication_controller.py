"""authentication contains the Authentication class."""
from ldap3 import Server, Connection, ALL, NTLM
from ldap3.core.exceptions import LDAPUnknownAuthenticationMethodError, LDAPSocketOpenError, \
    LDAPInvalidCredentialsResult
import set_root_backend

from src import config
import json
import sys
# if info about the server is required:
# get info about server
# print(mock_server.info)
# get info about connection
# print(mock_connection)

authentication_controller = None


def set_controller(arg):
    global authentication_controller
    if arg == "0":
        print("AD PRODUCTION MODE")
        authentication_controller = AuthenticationController(config.PRODUCTION_AD_CONFIG["SERVER_URL"],
                                                             config.PRODUCTION_AD_CONFIG["SERVER_PREFIX"])
    if arg == "1":
        print("AD TESTING MODE")
        authentication_controller = AuthenticationController(config.TEST_AD_CONFIG["SERVER_URL"],
                                                             config.TEST_AD_CONFIG["SERVER_PREFIX"])
    if arg == "2":
        print("AD DEBUGGING MODE")
        authentication_controller = AuthenticationController(config.DEBUGGING_AD_CONFIG["SERVER_URL"],
                                                             config.DEBUGGING_AD_CONFIG["SERVER_PREFIX"])


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

    # should call db_controller according to #11
    def login(self, username, password):
        """
        Creates a new connection to the AD.
        Returns JSON with user object on successful login,
        AttributeError for wrong credentials, TimeoutError if the AD doesn't respond.
        """
        try:
            print(username, file=sys.stderr)
            print(password, file=sys.stderr)
            login_name = self.login_prefix+username
            print(login_name, file=sys.stderr)
            new_connection = Connection(self.server,
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
            self.connections[username] = new_connection
            return username
        # catch empty input
        except (LDAPUnknownAuthenticationMethodError, LDAPInvalidCredentialsResult):
            print("empty", file=sys.stderr)
            raise AttributeError
        # catch timeout while calling AD
        except LDAPSocketOpenError:
            raise TimeoutError
    
    # should call db_controller according to #12
    def logout(self, username):
        """
        Logs out the user and returns True if no error, False if error
        """
        try:
            del_connection = self.connections.pop(username)
            del_connection.unbind()
            return True
        except KeyError:
            return False
