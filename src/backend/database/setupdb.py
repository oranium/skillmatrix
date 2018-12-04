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
    date_id = db.Column(db.Integer, db.ForeignKey('date.id'), primary_key=True)
    level = db.Column(db.Integer, primary_key=True)
    users_assoc = db.relationship("Users", back_populates="users_association")
    skill_assoc = db.relationship("Skill", back_populates="skill_association")
    date_assoc = db.relationship("Date", back_populates="date_association")


class MilestoneAssociation(db.Model):
    __tablename__ = 'milestoneassociation'
    milestone_users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    milestone_skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    milestone_date_id = db.Column(db.Integer, db.ForeignKey('date.id'), primary_key=True)
    comment = db.Column(db.String(85), primary_key=True)
    level = db.Column(db.Integer, nullable = False)
    users_milestone_assoc = db.relationship("Users", back_populates="users_milestone_association")
    skill_milestone_assoc = db.relationship("Skill", back_populates="skill_milestone_association")
    date_milestone_assoc = db.relationship("Date", back_populates="date_milestone_association")


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


class Date(db.Model):
    """SQL-Alchemy object date."""
    __tablename__ = 'date'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=datetime.date.today())
    # z.B. '9999-12-12'
    date_association = db.relationship("Association", back_populates="date_assoc")
    date_milestone_association = db.relationship("MilestoneAssociation", back_populates="date_milestone_assoc")

    def get_id(self):
        return self.id

    def get_date(self):
        return self.date



class Users(db.Model):
    """SQL-Alchemy object users. Has an autoincremented id, an username, a surname, a forename"""
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
    date1 = Date()
    db.session.add(date1)
    a = Association(level=4)
    a.skill_assoc = js1
    a.date_assoc = date1
    a.users_assoc = isaac
    b = MilestoneAssociation(comment='bootcamp69')
    b.skill_milestone_assoc = js1
    b.date_milestone_assoc = date1
    b.users_milestone_assoc = isaac
    create_skill(3, js1, date1, isaac)
    create_skill(3, python1, date1, karl)
    create_skill(3, java1, date1, valdemar)
    create_skill(4, js1, date1, karl)
    create_skill(4, python1, date1, valdemar)
    create_skill(2, java1, date1, isaac)
    create_skill(2, js1, date1, valdemar)
    create_skill(3, python1, date1, isaac)
    create_skill(1, java1, date1, karl)
    db.session.commit()


def create_skill(level, skill, dtae, username):
    a = Association(level=level)
    a.skill_assoc = skill
    a.date_assoc = date
    a.users_assoc = username


db.drop_all()
db.create_all()
dummy_entries()

if __name__ == '__main__':
    app.run()
