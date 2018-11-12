from flask import Flask, render_template, json, request, redirect
from flaskext.mysql import MySQL

mysql = MySQL()
app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Momomomo2'
app.config['MYSQL_DATABASE_DB'] = 'test'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Fetch form data
        userDetails = request.form
        name = userDetails['name']
        passwort = userDetails['email']
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Daddy(name, passwort) VALUES(%s, %s)",(name, passwort))
        conn.commit()
        cursor.close()
        return redirect('/users')
    return render_template('index.html')

@app.route('/users')
def users():
    conn = mysql.connect()
    cursor = conn.cursor()
    resultValue = cursor.execute("SELECT * FROM Daddy")
    if resultValue > 0:
        userDetails = cursor.fetchall()
        return render_template('users.html',userDetails=userDetails)

if __name__ == '__main__':
    app.run(debug=True)