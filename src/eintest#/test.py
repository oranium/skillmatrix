import json

s = '{"success": ["true", 2], "status": 200, "message": "Hello"}'
d = json.loads(s)
print (d["success"])
print (d["status"])





#v = json.dumps({"c": [0,'1',2], "b": 0, "a": 0}, sort_keys=True)
#print(v)