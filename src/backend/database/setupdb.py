from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Momomomo2@localhost/sm1'
db = SQLAlchemy(app)


class Association(db.Model):
    __tablename__ = 'association'
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    time_id = db.Column(db.Integer, db.ForeignKey('time.id'), primary_key=True)
    level = db.Column(db.Integer, primary_key=True)
    users_assoc = db.relationship("Users", back_populates="users_association")
    skill_assoc = db.relationship("Skill", back_populates="skill_association")
    time_assoc = db.relationship("Time", back_populates="time_association")


class MilestoneAssociation(db.Model):
    __tablename__ = 'milestoneassociation'
    milestone_users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    milestone_skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    milestone_time_id = db.Column(db.Integer, db.ForeignKey('time.id'), primary_key=True)
    name = db.Column(db.String(85), primary_key=True)
    users_milestone_assoc = db.relationship("Users", back_populates="users_milestone_association")
    skill_milestone_assoc = db.relationship("Skill", back_populates="skill_milestone_association")
    time_milestone_assoc = db.relationship("Time", back_populates="time_milestone_association")


class Skill(db.Model):
    __tablename__ = 'skill'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(127), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(127), nullable=False)
    skill_association = db.relationship("Association", back_populates="skill_assoc")
    skill_milestone_association = db.relationship("MilestoneAssociation", back_populates="skill_milestone_assoc")

    def give_name(self):
        return self.name

    def __repr__(self):
        return '<name {0}>'.format(self.name)


class Time(db.Model):
    """SQL-Alchemy object time."""
    __tablename__ = 'time'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Date, nullable=False, default=datetime.date.today())
    # z.B. '9999-12-12'
    time_association = db.relationship("Association", back_populates="time_assoc")
    time_milestone_association = db.relationship("MilestoneAssociation", back_populates="time_milestone_assoc")

    def get_id(self):
        return self.id

    def get_time(self):
        return self.time



class Users(db.Model):
    """SQL-Alchemy object users. Has an autoincremented id, an username, a surname, a forename and a place
     which can be NULL"""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), nullable=False)
    surname = db.Column(db.String(45), nullable=False)
    forename = db.Column(db.String(45), nullable=False)
    users_association = db.relationship("Association", back_populates="users_assoc")
    users_milestone_association = db.relationship("MilestoneAssociation", back_populates="users_milestone_assoc")

    def give_name(self):
        return self.username

    def __repr__(self):
        return '<id = {0} und username = {1}>'.format(self.id, self.username)

def dummy_entries():
    valdemar = Users(username='Valdemar-Forsberg', surname="Forsberg", forename="Valdemar")
    karl = Users(username='Karl-Kalagin', surname='Kalagin', forename="Karl")
    isaac = Users(username='Isaac-Hunt', surname="Hunt", forename="Isaac")

    db.session.add(valdemar)
    db.session.add(karl)
    db.session.add(isaac)
    java1 = Skill(name='Java', category="Programming")
    python1 = Skill(name='Python', category="Programming")
    js1 = Skill(name='JavaScript', category="Programming")
    db.session.add(java1)
    db.session.add(python1)
    db.session.add(js1)
    time1 = Time()
    db.session.add(time1)
    a = Association(level=4)
    a.skill_assoc = js1
    a.time_assoc = time1
    a.users_assoc = isaac
    b = MilestoneAssociation(name='bootcamp69')
    b.skill_milestone_assoc = js1
    b.time_milestone_assoc = time1
    b.users_milestone_assoc = isaac
    create_skill(3, js1, time1, isaac)
    create_skill(3, python1, time1, karl)
    create_skill(3, java1, time1, valdemar)
    create_skill(4, js1, time1, karl)
    create_skill(4, python1, time1, valdemar)
    create_skill(2, java1, time1, isaac)
    create_skill(2, js1, time1, valdemar)
    create_skill(3, python1, time1, isaac)
    create_skill(1, java1, time1, karl)
    db.session.commit()


def create_skill(level, skill, time, username):
    a = Association(level=level)
    a.skill_assoc = skill
    a.time_assoc = time
    a.users_assoc = username


db.drop_all()
db.create_all()
dummy_entries()

if __name__ == '__main__':
    app.run()
