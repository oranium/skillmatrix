"""Contains model for a Milestone"""
from model.model import Model


class MilestoneModel(Model):

    """Converts given milestone to JSON to hand over to the frontend. Can't be used to identify user and skill"""

    def __init__(self, date, comment, level):
        self.date = date
        self.comment = comment
        self.level = level

    def jsonable(self):
        iso_date = self.date.isoformat()
        return dict(date=iso_date, comment=self.comment, level=self.level)
