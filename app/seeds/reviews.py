from app.models.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker

fake = Faker()

def seed_reviews():
    review1= Review(
        content='Content 1 description', rating=4, post_id=1, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review2= Review(
        content='Content 2 description', rating=3, post_id=2, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review3= Review(
        content='Content 3 description', rating=4, post_id=3, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    # review4= Review(
    #     content='Content 4 description', rating=2, post_id=4, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )
    # review5= Review(
    #     content='Content 5 description', rating=5, post_id=5, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )
    # review6= Review(
    #     content='Content 6 description', rating=3, post_id=6, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )
    # review7= Review(
    #     content='Content 7 description', rating=4, post_id=7, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )
    # review8= Review(
    #     content='Content 8 description', rating=3, post_id=8, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )

    # reviews = [review1, review2, review3, review4, review5, review6, review7, review8]

    reviews = [review1, review2, review3]

    [db.session.add(review) for review in reviews]
    db.session.commit()

    # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
