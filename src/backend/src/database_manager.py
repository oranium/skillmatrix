import parentdir
from flask import Flask, json, request, redirect
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Momomomo2@localhost/sm1'
api = Api(app)
db = SQLAlchemy(app)

def handle_query(self, query):
    #Accepts the query from REST-API and hands it to database_handler, returns JSON
    results = database_handler.search(self,query)
    if(results is None):
         raise ValueError
    return json.dumps(results)
    

class database_handler:
    '''Class to handle everything about table-manipulation'''
    def add_skill(self, skill1, level1):
        '''Adds skill to database.'''
        object_name = skill(name = skill1, level = level1)
        db.session.add(object_name)
        db.session.commit()

    def add_user(self, username1):
        '''Adds user to database. #Place is optional and is NULL if not given.'''
        #works
        object_name = users(username = username1)
        db.session.add(object_name)
        db.session.commit()

    #def change_user(self, username1, surname1, forename1, place1= None):
        #'''Changes a colum of the users-table, based on the username (the username is ad-given and can not be changed here).'''
        #works
        #update_this = users.query.filter_by(username = username1).first()
        #update_this.surname = surname1
        #update_this.forename = forename1
        #if place1 != NULL:
        #    update_this.place = place1
        #db.session.commit()

    
    def clear_database(self):
        '''Destroys the whole tablestructure and builds a new one with empty colums. For professionals only'''
        #works
        db.drop_all()
        db.create_all()

    def delete_user(self, username1):
        '''Deletes a colum of the users-table, based on the given username.'''
        #works
        delete_this = users.query.filter_by(username = username1).first()
        db.session.delete(delete_this)
        db.session.commit()

    def search(self, query):
        alistlevel = []
        #lsite aller level
        alistname = []
        #liste aller usernamen
        data = skill.query.filter_by(name = query).all()
        for skill1 in data:
            alistlevel.append(skill1.give_level())
            for users1 in skill1.has_user:
                alistname.append(users1.give_name())

        name_skilllevel = zip(alistname, alistlevel)
        name_skilllevel_dict = dict(name_skilllevel)
        #dict von Usernames in Verbindung mit Skilllevel
        big_dict = dict(skill= query,result= name_skilllevel_dict)
        #print(big_dict)
        return big_dict
        



user_skill = db.Table('user_skill',
    db.Column('users_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('skill_id', db.Integer, db.ForeignKey('skill.id'))
)

class users(db.Model):
    '''SQL-Alchemy object users. Has an autoincremented id, an username, a surname, a forename and a place which can be NULL'''
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), nullable=False)
    #surname = db.Column(db.String(45), nullable=False)
    #forename = db.Column(db.String(45), nullable=False)
    #place = db.Column(db.String(45), nullable=True)
    has_skill = db.relationship('skill', secondary=user_skill, backref=db.backref('has_user', lazy = 'dynamic'))

    def give_name(self):
        return self.username

    def __repr__(self):
        return '<id = {0} und username = {1}>'.format(self.id, self.username)



class skill(db.Model):
    __tablename__ = 'skill'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(127), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    #description = db.Column(db.Text, nullable=True)
    
    def give_level(self):
        return self.level

    def __repr__(self):
        return '<name {0} und level {1}>'.format(self.name, self.level) 

class session(db.Model):
    __tablename__ = 'session'
    id = db.Column(db.Integer, primary_key=True)
    val = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<id {0}>'.format(self.id) 


class HelloWorld(Resource):
    dbh = database_handler()
    dbh.clear_database()
    aron = users(username='aronadmin')
    bruno = users(username='brunonormal')
    cornell = users(username='cornellnormal')
    maximilian = users(username='maxnormal')
    willy = users(username='willynormal')
    
    db.session.add(aron)
    db.session.add(bruno)
    db.session.add(cornell)
    db.session.add(maximilian)
    db.session.add(willy)
    laufen1 = skill(name = 'schnell_laufen', level = 5)
    laufen2 = skill(name = 'schnell_laufen', level = 2)
    laufen3 = skill(name = 'schnell_laufen', level = 3)
    robben1 = skill(name = 'rum_robben', level = 4)
    robben2 = skill(name = 'rum_robben', level = 3)
    db.session.add(laufen1)
    db.session.add(laufen2)
    db.session.add(laufen3)
    db.session.add(robben1)
    db.session.add(robben2)
    laufen1.has_user.append(bruno)
    laufen1.has_user.append(cornell)
    laufen2.has_user.append(willy)
    laufen3.has_user.append(maximilian)
    robben1.has_user.append(aron)
    robben2.has_user.append(maximilian)
    db.session.commit()

    #data = users.query.filter_by(username = 'willy1').all()
    data = users.query.all()
    #data = dbh.search('schnell_laufen')

    def get(self):
        sotr = ''.join(str(e) for e in self.data)
        return {'results' : sotr}, 201

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run()