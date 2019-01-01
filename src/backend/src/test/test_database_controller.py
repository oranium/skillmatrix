import unittest
from app import app
from controller.database_controller import database_controller
from controller.database import db
from resetdb import Setup, Date, Skill, Users, Association, MilestoneAssociation, Hierachy
def setUpModule():
    app.testing = True

class testDatabaseController(unittest.TestCase):

    def setUp(self):
        self.test_app = app.test_client()

        self.test_setup = Setup()


        self.valdemar = Users(username='Valdemar-Forsberg', name="Valdemar Forsberg")
        self.karl = Users(username='Karl-Kalagin', name="Karl Kalagin")
        self.isaac = Users(username='Isaac-Hunt', name="Isaac Hunt")

        self.test_setup.session.add(self.valdemar)
        self.test_setup.session.add(self.karl)
        self.test_setup.session.add(self.isaac)

        self.prog = Skill(name='Programming', root=True)
        self.java1 = Skill(name='Java')
        self.python1 = Skill(name='Python')
        self.js1 = Skill(name='JavaScript')

        self.test_setup.session.add(self.java1)
        self.test_setup.session.add(self.python1)
        self.test_setup.session.add(self.prog)
        self.test_setup.session.add(self.js1)

        self.date1 = Date()
        self.test_setup.session.add(self.date1)
        self.a = Association(level=4)
        self.a.skill_assoc = self.js1
        self.a.date_assoc = self.date1
        self.a.users_assoc = self.isaac

        self.b = MilestoneAssociation(comment='bootcamp69')
        self.b.skill_milestone_assoc = self.js1
        self.b.date_milestone_assoc = self.date1
        self.b.users_milestone_assoc = self.isaac

        self.test_setup.create_skill(3, self.js1,self. date1, self.isaac)
        self.test_setup.create_skill(3, self.python1, self.date1, self.karl)
        self.test_setup.create_skill(3, self.java1, self.date1, self.valdemar)
        self.test_setup.create_skill(4, self.js1, self.date1, self.karl)
        self.test_setup.create_skill(4, self.python1, self.date1, self.valdemar)
        self.test_setup.create_skill(2, self.java1, self.date1, self.isaac)
        self.test_setup.create_skill(2, self.js1, self.date1, self.valdemar)
        self.test_setup.create_skill(3, self.python1, self.date1, self.isaac)
        self.test_setup.create_skill(1, self.java1, self.date1, self.karl)

        self.x = Hierachy()
        self.x.parent_skill_assoc = self.java1
        self.x.child_skill_assoc = self.js1
        self.test_setup.session.add(self.x)
        self.test_setup.create_hiestory(self.python1, self.js1)
        self.test_setup.session.commit()

    def tearDown(self):

        pass

    def test_search_success(self):
        pass

    def test_search_with_no_results(self):
        pass

    def test_set_skill(self):
        pass

    def test_add_milestone(self):
        pass

    def test_get_milestones(self):
        pass

    def test_get_assocs(self):
        pass

    def test_get_all_users(self):
        pass

    def test_get_all_skill_names(self):
        pass

    def test_get_skill_id(self):
        result = database_controller.get_skill_id("Java")
        self.assertEqual(result, 1)

    def test_get_skill(self):
        result = database_controller.get_skill("Python")
        self.assertEqual(result.name, "Python")

    def test_get_user_id(self):
        result = database_controller.get_user_id("Valdemar-Forsberg")
        self.assertEqual(result, 1)

    def test_get_user(self):
        result = database_controller.get_user_id("Valdemar-Forsberg")
        self.assertEqual(result.username, "Valdemar-Forsberg")
        self.assertEqual(result.name, "Valdemar Forsberg")

    def test_get_date_from_id(self):
        result = database_controller.get_date_from_id(1)
        self.assertEqual(result, 1)

    def test_get_user_from_id(self):
        result = database_controller.get_user_from_id(1)
        self.assertEqual(result.username, "Valdemar-Forsberg")

    def test_get_skill_from_id(self):
        result = database_controller.get_skill_from_id(1)
        self.assertEqual(result.name, "Java")

    def test_create_skill(self):
        new_skill = Skill(name='C#')
        db.session.add(new_skill)
        db.session.commit()
        self.assertEqual(Skill.query.filter_by(name="C#").first().name, "C#")
        Skill.query.filter_by(id=Skill.query.filter_by(name="C#").first().id).delete()

    def test_exists_success(self):
        self.assertTrue(Users.query.filter_by(username="Valdemar-Forsberg").first())

    def test_exists_fail(self):
        self.assertFalse(Users.query.filter_by(username="Lisza-Zulu").first())

    def test_get_skills(self):
        result = database_controller.get_skills("Valdemar-Forsberg")
        self.assertEqual(result, [[["Java", 3,[]]],["Python",4,[]],["JavaScript",2,[]]])

    def test_get_skills_inexistent(self):
        result = database_controller.get_skills("Lisza-Zulu")
        self.assertIsNone(result)

    def test_create_user(self):
        database_controller.create_user("Lisza-Zulu", "Lisza Zulu")
        self.assertEqual(Users.query.filter_by(name="Lisza Zulu").first().name(), "Lisza Zulu")

    def test_get_recent_level(self):
        result = database_controller.get_recent_level(1,1)
        self.assertEqual(result, 3)

    def test_get_profile_models(self):
        result = database_controller.get_profile_models([self.valdemar])
        expected_result = [dict(username='Valdemar-Forsberg',
                                name='Valdemar Forsberg',
                                skills=[[["Java", 3,[]]],
                                        ["Python",4,[]],
                                        ["JavaScript",2,[]]]
                                )]
        self.assertEqual(result, expected_result)

    def test_sum_relevant_skills(self):
        result = database_controller.sum_relevant_skills(dict(username='Valdemar-Forsberg',
                                                              name='Valdemar Forsberg',
                                                              skills=[[["Java", 3,[]]],
                                                                      ["Python",4,[]],
                                                                      ["JavaScript",2,[]]]
                                                              ),
                                                              ["Java","JavaScript"])

        expected_result = 5
        self.assertEqual(result, expected_result)


    def test_build_subcategories(self):
        pass
