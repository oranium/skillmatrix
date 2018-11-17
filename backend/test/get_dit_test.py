from ldap3 import Server, Connection, ALL_ATTRIBUTES, ALL, NTLM

server = Server('ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389', get_info=ALL)
connection = Connection(server, 'AzureAD.SWT.com\ADadmin','@Administrator',authentication=NTLM)
connection.bind()
server.info.to_file('my_real_server_info.json')
server.schema.to_file('my_real_server_schema.json')
print(server.info)
print(connection)


# get info about users 
#print(connection.search('CN=Users,DC=AzureAD,DC=SWT,DC=com', '(objectclass=*)')) 
#print(connection.entries)


if connection.search('CN=Users,DC=AzureAD,DC=SWT,DC=com', '(objectclass=*)', attributes=ALL_ATTRIBUTES):
    connection.response_to_file('my_real_server_entries.json', raw=True)

#connection.response_to_file('my_entries.json', raw=True)
