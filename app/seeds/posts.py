from app.models.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker

fake = Faker()


def seed_posts():
    post1 = Post(
        name='Fake Movie 1', description='Fake Description 1', genre='Fake Genre 1', post_image='urlimage1', user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post2 = Post(
        name='Fake Movie 2', description='Fake Description 2', genre='Fake Genre 2', post_image='urlimage2', user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post3 = Post(
        name='Fake Movie 3', description='Fake Description 3', genre='Fake Genre 3', post_image='urlimage1', user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    # post4 = Post(
    #     name='Fake Movie 4', description='Fake Description 4', genre='Fake Genre 4', post_image='urlimage4', user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )
    # post5 = Post(
    #     name='Fake Movie 5', description='Fake Description 5', genre='Fake Genre 5', post_image='urlimage5', user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )
    # post6 = Post(
    #     name='Fake Movie 6', description='Fake Description 6', genre='Fake Genre 6', post_image='urlimage6', user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )
    # post7 = Post(
    #     name='Fake Movie 7', description='Fake Description 7', genre='Fake Genre 7', post_image='urlimage7', user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )
    # post8 = Post(
    #     name='Fake Movie 8', description='Fake Description 8', genre='Fake Genre 8', post_image='urlimage8', user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )

    # posts = [post1, post2, post3, post4, post5, post6, post7, post8]

    posts = [post1, post2, post3]

    [db.session.add(post) for post in posts]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
