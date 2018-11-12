import json

s = '{"success": ["true", 2], "status": 200, "message": "Hello"}'
d = json.loads(s)
print (d["success"])
print (d["status"])


row = cursor.fetchone()
 
        while row is not None:
            print(row)
            row = cursor.fetchone()
#gibt jede Zeile einzeln als tupel aus

l = list(tupel)
#macht aus tupeln listen




#v = json.dumps({"c": [0,'1',2], "b": 0, "a": 0}, sort_keys=True)
#print(v)