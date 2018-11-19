from flask import Flask, render_template, json, request, redirect
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Momomomo2@localhost/pre'
api = Api(app)
db = SQLAlchemy(app)

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), unique=True, nullable=False)
    surename = db.Column(db.String(45), nullable=False)
    forename = db.Column(db.String(45), nullable=False)
    place = db.Column(db.String(45), nullable=True)
    #backref gibts noch nicht
    skill = db.relationship('Skill', backref='author', lazy=True, nullable=True)

    def __repr__(self):
        return f"Profile('{self.forename}', '{self.surename}')"


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(127), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    #date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    description = db.Column(db.Text, nullable=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.name}', '{self.level}')"

class HelloWorld(Resource):
    def get(self):
        return {'about' : 'Hello World!'}

    def post(self):
        some_json = request.get_json()
        return {'you sent' : some_json}, 201

class Multi(Resource):
    def get(self, num):
        return {'result' : num*10}

api.add_resource(HelloWorld, '/')
api.add_resource(Multi, '/multi/<int:num>')

if __name__ == '__main__':
    app.run(debug=True)