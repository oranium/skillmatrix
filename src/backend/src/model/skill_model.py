"""Contains model for Skills"""
from model.model import Model


class SkillModel(Model):

    """This class converts a skill to a JSON which is a component of a Profile """

    def __init__(self, skill_name, level=None, subcategories=[], root=False, milestones=[]):
        self.subcategories = subcategories
        self.skill_name = skill_name
        self.level = level
        self.milestones = milestones
        self.root = root

    def jsonable(self):
        jsonable_milestones = []
        jsonable_subcategories = []
        for skill in self.subcategories:
            jsonable_subcategories.append(skill.jsonable())
        for milestone in self.milestones:
            jsonable_milestones.append(milestone.jsonable())
        return dict(skillname=self.skill_name,
                    level=self.level,
                    subcategories=jsonable_subcategories,
                    root=self.root,
                    milestones=jsonable_milestones)
