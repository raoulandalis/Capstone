from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demolition', first_name="Demo", last_name="Lition", email='demo@aa.io', password='password')
    tien = User(
        username='tienhoang', first_name="Tien", last_name="Hoang", email='tien-hoang@aa.io', password='password')
    nessa = User(
        username='nessagonzalez', first_name="Nessa", last_name="Gonzalez", email='nessa-gonzalez@aa.io', password='password')
    miguel = User(
        username='miguelreyes', first_name="Miguel", last_name="Reyes", email='miguel-reyes@aa.io', password='password')
    jenna = User(
        username='jennagodfrey', first_name="Jenna", last_name="Godfrey", email='jenna-godfrey@aa.io', password='password')
    matias = User(
        username='matiasperez', first_name="Matias", last_name="Perez", email='matias-perez@aa.io', password='password')
    kc = User(
        username='kcosmani', first_name="KC", last_name="Osmani", email='kc-osmani@aa.io', password='password')
    david = User(
        username='davidkim', first_name="David", last_name="Kim", email='david-kim@aa.io', password='password')
    albert = User(
        username='albertkim', first_name="Albert", last_name="Kim", email='albert-kim@aa.io', password='password')
    adanna = User(
        username='adannaliu', first_name="Adanna", last_name="Liu", email='adanna-liu@aa.io', password='password')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.commit()

    users = [demo, tien, nessa, miguel, jenna, matias, kc, david, albert, adanna]

    [db.session.add(user) for user in users]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
