"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
   Configurations for the database and Active Directory.
   TEST configurations connect to no AD and an in-memory database. DEBUGGING connects to a local test database and  a
   small testing AD. PRODUCTION will connect to the real database and AD.
""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
class TestConfig:
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:////tmp/:memory:"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DebugConfig:
    TESTING = False
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = # fill with own database info, structure: 'mysql+pymysql://root:pass@localhost/db_name'


class ProductionConfig:
    # to be filled
    pass


TEST_AD_CONFIG = {
    "SERVER_URL": "",
    "SERVER_PREFIX": ""
}

DEBUGGING_AD_CONFIG = {
    "SERVER_URL": "ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389",
    "SERVER_PREFIX": "AzureAD.SWT.com\\"
}

PRODUCTION_AD_CONFIG = {
    # to be filled
}
