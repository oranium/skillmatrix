from src.controller.database import db


class Milestone(db.Model):
    """SQL-Alchemy object milestone."""
    __tablename__ = 'milestone'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    time = db.Column(db.DateTime, nullable=True, default=datetime.datetime.utcnow())
    milestone_association = db.relationship("Association", back_populates="milestone_assoc")
    # z.B. '9999-12-12 22:58:58'
    description = db.Column(db.Text, nullable=True)