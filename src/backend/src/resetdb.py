#it was so nice i build it twice
import os
import sys
import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine, Text, Boolean
from sqlalchemy import Date as DateType
from sqlalchemy.orm import sessionmaker
from os import environ


def checkdb():
    Base = declarative_base()
    engine = create_engine(environ.get('ENV_DATABASE_URI'))

    class Guidelines(Base):
        __tablename__ = 'guidelines'
        skill_id = Column(Integer, primary_key=True)
        level = Column(Integer, primary_key=True)
        information = Column(Text, nullable=True, default='')

    class Hierarchy(Base):
        __tablename__ = 'hierarchy'
        id = Column(Integer, primary_key=True)
        parent_skill_id = Column(Integer, nullable=True)
        child_skill_id = Column(Integer, nullable=True)


    class Association(Base):
        __tablename__ = 'association'
        id = Column(Integer, primary_key=True)
        users_id = Column(Integer, ForeignKey('users.id'))
        skill_id = Column(Integer, ForeignKey('skill.id'))
        date_id = Column(Integer, ForeignKey('date.id'))
        level = Column(Integer)
        users_assoc = relationship("Users", back_populates="users_association")
        skill_assoc = relationship("Skill", back_populates="skill_association")
        date_assoc = relationship("Date", back_populates="date_association")

    class MilestoneAssociation(Base):
        __tablename__ = 'milestoneassociation'
        id = Column(Integer, primary_key=True)
        milestone_users_id = Column(Integer, ForeignKey('users.id'))
        milestone_skill_id = Column(Integer, ForeignKey('skill.id'))
        milestone_date_id = Column(Integer, ForeignKey('date.id'))
        comment = Column(String(150))
        level = Column(Integer, nullable=False)
        users_milestone_assoc = relationship("Users", back_populates="users_milestone_association")
        skill_milestone_assoc = relationship("Skill", back_populates="skill_milestone_association")
        date_milestone_assoc = relationship("Date", back_populates="date_milestone_association")

    class Skill(Base):
        __tablename__ = 'skill'
        id = Column(Integer, primary_key=True)
        path = Column(String(511), nullable=False)
        name = Column(String(255), nullable=False)
        root = Column(Boolean, unique=False, default=False)
        skill_association = relationship("Association", back_populates="skill_assoc")
        skill_milestone_association = relationship("MilestoneAssociation", back_populates="skill_milestone_assoc")
        #skill_parent_skill = relationship("Hierarchy", back_populates="parent_skill_assoc")
        #skill_child_skill = relationship("Hierarchy", back_populates="child_skill_assoc")

        def give_name(self):
            return self.name

        def __repr__(self):
            return '<name {0}>'.format(self.name)

    class Date(Base):
        """SQL-Alchemy object date."""
        __tablename__ = 'date'
        id = Column(Integer, primary_key=True)
        date = Column(DateType, nullable=False, default=datetime.date.today())
        # z.B. '9999-12-12'
        date_association = relationship("Association", back_populates="date_assoc")
        date_milestone_association = relationship("MilestoneAssociation", back_populates="date_milestone_assoc")

        def get_id(self):
            return self.id

        def get_date(self):
            return self.date

    class Users(Base):
        """SQL-Alchemy object users. Has an autoincremented id, an username, a name"""
        __tablename__ = 'users'
        id = Column(Integer, primary_key=True)
        username = Column(String(45), nullable=False)
        name = Column(String(80), nullable= False)
        users_association = relationship("Association", back_populates="users_assoc")
        users_milestone_association = relationship("MilestoneAssociation", back_populates="users_milestone_assoc")

        def give_name(self):
            return self.username

        def __repr__(self):
            return '<id:{0},username:{1}>'.format(self.id, self.username)

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(engine)
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    User1 = session.query(Users).filter_by(username='Valdemar-Forsberg').first()
    Skill1 = session.query(Skill).filter_by(path='Programming/Java').first()
    date1 = Date(date='2018-10-10')
    date2 = Date(date='2018-11-11')
    date3 = Date(date='2018-12-12')
    date0 = Date(date='2017-12-12')


    m1 = MilestoneAssociation(comment="Erste Anfänge mit Java", level=1)
    m1.skill_milestone_assoc = Skill1
    m1.date_milestone_assoc = date0
    m1.users_milestone_assoc = User1
    session.add(m1)
    session.commit()

    m2 = MilestoneAssociation(comment="Java-Bootcamp", level=2)
    m2.skill_milestone_assoc = Skill1
    m2.date_milestone_assoc = date1
    m2.users_milestone_assoc = User1
    session.add(m2)
    session.commit()

    m3 = MilestoneAssociation(comment="Mitarbeit an großem Java Projekt", level=3)
    m3.skill_milestone_assoc = Skill1
    m3.date_milestone_assoc = date2
    m3.users_milestone_assoc = User1
    session.add(m3)
    session.commit()

    m4 = MilestoneAssociation(comment="Java-Kurs an der TU-Dresden", level=4)
    m4.skill_milestone_assoc = Skill1
    m4.date_milestone_assoc = date3
    m4.users_milestone_assoc = User1
    session.add(m4)
    session.commit()






