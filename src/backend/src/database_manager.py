from flask import Flask, json, request, redirect
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Momomomo2@localhost/sm1'
api = Api(app)
db = SQLAlchemy(app)

class user(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), nullable=False)
    surename = db.Column(db.String(45), nullable=False)
    forename = db.Column(db.String(45), nullable=False)
    place = db.Column(db.String(45), nullable=True)
#   skill = db.relationship('Skill', backref='author', lazy=True, nullable=True)

    def __repr__(self):
        return '<user %r>' % self.username

#db.drop_all()
#db.create_all()

#willy = user(username='willyadmin', surename ='Pertsch', forename = 'Wilhelm', place = 'wund')
#aron = user(username='aronnormal', surename ='Gaden', forename = 'Aron', place = 'blau')
#bruno = user(username='bruenonormal', surename ='Reinhold', forename = 'Bruno', place = 'dresden')

#db.session.add(willy)
#db.session.add(aron)
#db.session.add(bruno)
#user.query.all()
#user.query.filter_by(username='willyadmin').first()

#print(user.query.all())




#class Skill(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    name = db.Column(db.String(127), nullable=False)
#    level = db.Column(db.Integer, nullable=False)
    #date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
#    description = db.Column(db.Text, nullable=True)
#    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)

#    def __repr__(self):
#        return f"Post('{self.name}', '{self.level}')"

#class HelloWorld(Resource):
#    def get(self):
#        return {'about' : 'Hello World!'}
#
#    def post(self):
#        some_json = request.get_json()
#        return {'you sent' : some_json}, 201

#class Multi(Resource):
#    def get(self, num):
#        return {'result' : num*10}

#api.add_resource(HelloWorld, '/')
#api.add_resource(Multi, '/multi/<int:num>')


class HelloWorld(Resource):
    print('in hw')
    db.drop_all()
    db.create_all()

    willy = user(username='willyadmin', surename ='Pertsch', forename = 'Wilhelm', place = 'wund')
    aron = user(username='aronnormal', surename ='Gaden', forename = 'Aron', place = 'blau')
    bruno = user(username='bruenonormal', surename ='Reinhold', forename = 'Bruno', place = 'dresden')

    db.session.add(willy)
    db.session.add(aron)
    db.session.add(bruno)
    data   = user.query.all()

    def get(self):
        sotr = ''.join(str(e) for e in self.data)
        return {'results' : sotr}, 201

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run()