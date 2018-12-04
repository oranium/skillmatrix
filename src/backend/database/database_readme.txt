To work on the Skillmatrix, you need to have a working database. My name is Wilhelm Pertsch and we will setup the database togehter :)
You can contact me any time you want, just write your problems via telegram: +4917668017024
You need to have MySQL installed, if you havn't allready look here: https://dev.mysql.com/downloads/mysql/
Make sure your Password in general (or to the sm1 database) is Momomomo2 (Momo was my Cat, R.I.P.)
You can change it: https://www.geeksforgeeks.org/mysql-change-user-password/ (user has to be 'root')

You should be able to use the command line (for windows user I suggest the programm 'MySQL 8.0 Command Line Client') 
to connect to mysql:(linux) 'mysql -u root -p' and enter password after.
		     (MacOs) '/usr/local/mysql/bin/mysql -uroot -p'and enter password after.
If the password does not work make sure mysql is running (for example on windows you have to start the mysql-service via taskmanager)
if it is still broken you can change the password: https://www.geeksforgeeks.org/mysql-change-user-password/ (user has to be 'root')

You should be able to write MySQL commands now!
We have to create a database:
	CREATE DATABASE sm1:
	USE sm1;
Now run the python file 'setupdb.py' you can find in this folder (you can end the flaskapp with strg+c).
Write the MySQL command:
	SHOW TABLES;
and if you get something that looks like this:
	mysql> show tables;
	+----------------------+
	| Tables_in_sm1        |
	+----------------------+
	| association          |
	| milestoneassociation |
	| skill                |
	| time                 |
	| users                |
	+----------------------+
	5 rows in set (0.00 sec)
you can use the Skillmatrix from now on.


If you want to reset the database run the python file 'setupdb.py' you can find in this folder (you can end the flaskapp with strg+c).
If this doesn't work, you have to drop all tables manually:
	drop table association;
	drop table milestoneassociation;
	drop table skill;
	drop table time;
	drop table users;
and run the python file 'setupdb.py' you can find in this folder (you can end the flaskapp with strg+c).
The dropping should look like this:
	mysql> drop table association;
	Query OK, 0 rows affected (0.45 sec)

	mysql> drop table milestoneassociation;
	Query OK, 0 rows affected (0.44 sec)

	mysql> drop table skill;
	Query OK, 0 rows affected (0.56 sec)

	mysql> drop table time;
	Query OK, 0 rows affected (0.49 sec)

	mysql> drop table users;
	Query OK, 0 rows affected (0.47 sec)
SHOW TABLES; should give an empty set now.
