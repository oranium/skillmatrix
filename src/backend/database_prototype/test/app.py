from flask import Flask, render_template, request, redirect
from flask_mysqldb import MySQL


# Configure db

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Momomomo2'
app.config['MYSQL_DB'] = 'flaskapp'

mysql = MySQL(app)  

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Fetch form data
        userDetails = request.form
        name = userDetails['name']
        email = userDetails['email']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users(name, email) VALUES(%s, %s)",(name, email))
        mysql.connection.commit()
        cur.close()
        return 'yay'
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
