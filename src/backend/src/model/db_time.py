import datetime

from src.controller.database import db


class Time(db.Model):
    """SQL-Alchemy object time."""
    __tablename__ = 'time'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Date, nullable=True, default=datetime.date.today())
    time_association = db.relationship("Association", back_populates="time_assoc")
    # z.B. '9999-12-12'
