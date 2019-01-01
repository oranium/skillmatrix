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

        test_setup = Setup()

        valdemar = Users(username='Valdemar-Forsberg', name="Valdemar Forsberg")
        karl = Users(username='Karl-Kalagin', name="Karl Kalagin")
        isaac = Users(username='Isaac-Hunt', name="Isaac Hunt")
        test_setup.session.add(valdemar)
        test_setup.session.add(karl)
        test_setup.session.add(isaac)
        prog = Skill(name='Programming', root=True)
        java1 = Skill(name='Java')
        python1 = Skill(name='Python')
        js1 = Skill(name='JavaScript')
        test_setup.session.add(java1)
        test_setup.session.add(python1)
        test_setup.session.add(prog)
        test_setup.session.add(js1)
        date1 = Date()
        test_setup.session.add(date1)
        a = Association(level=4)
        a.skill_assoc = js1
        a.date_assoc = date1
        a.users_assoc = isaac
        b = MilestoneAssociation(comment='bootcamp69')
        b.skill_milestone_assoc = js1
        b.date_milestone_assoc = date1
        b.users_milestone_assoc = isaac
        test_setup.create_skill(3, js1, date1, isaac)
        test_setup.create_skill(3, python1, date1, karl)
        test_setup.create_skill(3, java1, date1, valdemar)
        test_setup.create_skill(4, js1, date1, karl)
        test_setup.create_skill(4, python1, date1, valdemar)
        test_setup.create_skill(2, java1, date1, isaac)
        test_setup.create_skill(2, js1, date1, valdemar)
        test_setup.create_skill(3, python1, date1, isaac)
        test_setup.create_skill(1, java1, date1, karl)
        x = Hierachy()
        x.parent_skill_assoc = java1
        x.child_skill_assoc = js1
        test_setup.session.add(x)
        test_setup.create_hiestory(python1, js1)
        test_setup.session.commit()

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
        result = database_controller.get_profile_models([Users("Valdemar-Forsberg", "Valdemar Forsberg"),
                                                         Users("Karl-Kalagin", "Karl Kalagin")])
        expected_result = None
        self.assertEqual(result, 1)

    def test_sum_relevant_skills(self):
        pass
