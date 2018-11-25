import parentdir
from flask import Flask, json, request, redirect
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Momomomo2@localhost/sm1'
api = Api(app)
db = SQLAlchemy(app)

from session import Session
from skill import Skill
from user import Users

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
        object_name = Skill(name = skill1, level = level1)
        db.session.add(object_name)
        db.session.commit()

    def add_user(self, username1):
        '''Adds user to database. #Place is optional and is NULL if not given.'''
        #works
        object_name = Users(username = username1)
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
        delete_this = Users.query.filter_by(username = username1).first()
        db.session.delete(delete_this)
        db.session.commit()

    def search(self, query):
        alistlevel = []
        #lsite aller level
        alistname = []
        #liste aller usernamen
        data = Skill.query.filter_by(name = query).all()
        for skill1 in data:
            alistlevel.append(skill1.give_level())
            for users1 in skill1.has_user:
                alistname.append(users1.give_name())

        name_skilllevel = zip(alistname, alistlevel)
        name_skilllevel_dict = dict(name_skilllevel)
        #dict von Usernames in Verbindung mit Skilllevel
        big_dict = dict(skill= query,result= name_skilllevel_dict)
        #print(big_dict)
        return big_dic


class HelloWorld(Resource):
    dbh = database_handler()
    dbh.clear_database()
    Valdemar = users(username='Valdemar-Forsberg')
    Karl = users(username='Karl.Kalagin')
    Isaac = users(username='Isaac.Hunt')
    Ozoemena = users(username='Ozoemena.Somayina')
    Yvonne = users(username='Yvonne.Thompsome')
    
    db.session.add(Valdemar)
    db.session.add(Karl)
    db.session.add(Isaac)
    db.session.add(Ozoemena)
    db.session.add(Yvonne)
    java1 = skill(name = 'Java', level = 5)
    java2 = skill(name = 'Java', level = 2)
    java3 = skill(name = 'Java', level = 3)
    python1 = skill(name = 'Python', level = 4)
    python2 = skill(name = 'Python', level = 3)
    js1 = skill(name = 'JavaScript', level = 4)
    js2 = skill(name = 'JavaScript', level = 2)
    js3 = skill(name = 'JavaScript', level = 1)
    db.session.add(java1)
    db.session.add(java2)
    db.session.add(java3)
    db.session.add(python1)
    db.session.add(python2)
    db.session.add(js1)
    db.session.add(js2)
    db.session.add(js3)
    java1.has_user.append(Valdemar)
    java1.has_user.append(Karl)
    java2.has_user.append(Isaac)
    java3.has_user.append(Ozoemena)
    java3.has_user.append(Yvonne)

    python1.has_user.append(Valdemar)
    python1.has_user.append(Karl)
    python1.has_user.append(Isaac)
    python2.has_user.append(Ozoemena)
    python2.has_user.append(Yvonne)

    js1.has_user.append(Valdemar)
    js2.has_user.append(Karl)
    js2.has_user.append(Isaac)
    js2.has_user.append(Ozoemena)
    js3.has_user.append(Yvonne)

    db.session.commit()

    #data = users.query.filter_by(username = 'willy1').all()
    data = Users.query.all()
    #data = dbh.search('schnell_laufen')

    def get(self):
        sotr = ''.join(str(e) for e in self.data)
        return {'results' : sotr}, 201

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run()