"""authentication contains the Authentication class."""
from ldap3 import Server, Connection, ALL, NTLM, SUBTREE
from ldap3.core.exceptions import LDAPUnknownAuthenticationMethodError, LDAPSocketOpenError, \
    LDAPInvalidCredentialsResult, LDAPStartTLSError
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

    def __init__(self, server_url, port, prefix, base_dn, ssl, authentication):
        # The server url should look like this: <'''ldap://my-ldapserver.example.com:389>
        # Uni-Azure: server 'ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389'

        self.connections = {}
        self.port = int(port)
        self.ssl = ssl
        if ssl == "True":
            self.server = Server(server_url, port=self.port, use_ssl=True, get_info=ALL)
        else:
            self.server = Server(server_url, port=self.port, get_info=ALL)
        print(self.server)
        self.login_prefix = prefix
        self.base_dn = base_dn
        self.authentication = authentication

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
            if authentication_controller.authentication == "NTLM":
                login_name = authentication_controller.login_prefix+username
                print(login_name, file=sys.stderr)
                new_connection = Connection(authentication_controller.server,
                                            login_name,
                                            password,
                                            authentication=NTLM,
                                            raise_exceptions=True)

            else:
                login_name = 'uid='+username+','+authentication_controller.base_dn
                print(login_name)
                new_connection = Connection(authentication_controller.server,
                                login_name,
                                password)

            print("created connection!", file=sys.stderr)
            # wrong credentials
            print(new_connection)
            if new_connection is None:
                print("wrong cred", file=sys.stderr)
                raise AttributeError
            print("binding connection", file=sys.stderr)
            new_connection.bind()
            print("adding connection", file=sys.stderr)
            if authentication_controller.ssl == "False":
                new_connection.start_tls()
            # successful login
            authentication_controller.connections[username] = new_connection
            return authentication_controller.get_name(username)
        # catch empty input
        except (LDAPUnknownAuthenticationMethodError, LDAPInvalidCredentialsResult) as e:
            print("empty", file=sys.stderr)
            print(e.__name__, file=sys.stderr)

            raise AttributeError
        # catch
        except LDAPStartTLSError:
            print("TLS failed")
            raise Exception
        # catch timeout while calling AD
        except LDAPSocketOpenError:
            raise TimeoutError

    @staticmethod
    def logout(username):
        """
        Logs out the user and returns True if no error, False if error
        """
        try:
            del_connection = authentication_controller.connections.pop(username)
            del_connection.unbind()
            return True
        except KeyError:
            return False

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

            connection.search(search_base=environ.get('ENV_BASE_DN'),
                              search_filter='(&(objectCategory=person)(sAMAccountName='+user_principal_name+'))',
                              search_scope=SUBTREE,
                              attributes=['cn'])
            displayname = connection.response[0]['attributes']['cn']
            return displayname
        except LDAPSocketOpenError:
            raise TimeoutError
            return username
        except IndexError:
            print("The response of connection-search was empty")
            return username
        except Exception:
            print("Unexpected error: ", sys.exc_info()[0])
            return username


authentication_controller = AuthenticationController(environ.get('ENV_LDAP_SERVER_URL'),
                                                     environ.get('ENV_LDAP_SERVER_PORT'),
                                                     environ.get('ENV_LDAP_SERVER_PREFIX'),
                                                     environ.get('ENV_BASE_DN'),
                                                     environ.get('ENV_LDAP_USE_SSL'),
                                                     environ.get('ENV_LDAP_AUTHENTICATION'))


