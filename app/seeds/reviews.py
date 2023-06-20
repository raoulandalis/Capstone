from app.models.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker

fake = Faker()

def seed_reviews():
    review1= Review(
        content='This is the definition of comedy!', rating=4, post_id=11, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review2= Review(
        content='The easter eggs in this film were insane', rating=5, post_id=2, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review3= Review(
        content='Never wanted a cheeseburger more after seeing this', rating=3, post_id=12, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review4= Review(
        content='That ending socked me in the face', rating=5, post_id=8, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review5= Review(
        content='Hit the gym after I saw this...', rating=4, post_id=14, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review6= Review(
        content='Someone let me know how long they spent doing CGI for this', rating=4, post_id=20, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review7= Review(
        content='Had one eye open the whole time', rating=3, post_id=18, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review8= Review(
        content='WAR...HOOO', rating=4, post_id=25, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review9= Review(
        content='Took 6 guys to move a rock nice!!', rating=1, post_id=29, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review10= Review(
        content='This is a masterpiece', rating=5, post_id=8, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review11= Review(
        content='This movie was tugging my heart strings!', rating=4, post_id=7, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review12= Review(
        content='This makes me wanna work on my jump shot(never played basketball in my life)', rating=4, post_id=3, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review13= Review(
        content='GIVE THEM THE OSCAR!', rating=5, post_id=27, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review14= Review(
        content='Family is everything', rating=5, post_id=1, user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review15= Review(
        content='Josh Hutcherson is a heart throb', rating=5, post_id=8, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review16= Review(
        content='This is a cinematic masterpiece', rating=5, post_id=5, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review17= Review(
        content='Okay why did I not read the book first', rating=3, post_id=16, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review18= Review(
        content='Riddle me this, riddle me that mans...how is he for sure gonna mess with the batmans', rating=5, post_id=19, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review19= Review(
        content='What they said!! ^^', rating=5, post_id=8, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review20= Review(
        content='Had this on while I was coding, pretty good watch', rating=4, post_id=18, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review21= Review(
        content='This was such a good murder mystery...gives me some inspiritation', rating=3, post_id=18, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review22= Review(
        content='Why did David tell me to watch this', rating=3, post_id=26, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review23= Review(
        content='This was fire bring Miles to the big screen', rating=5, post_id=4, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review24= Review(
        content="I should've bought a home 15 years ago but I was messing around in 2nd grade", rating=4, post_id=21, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review25= Review(
        content='No Megan Fox, no good rating', rating=2, post_id=6, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review26= Review(
        content="Wasn't expecting this..but damn was it good", rating=5, post_id=13, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review27= Review(
        content='Peaches peaches peaches peaches peaches', rating=3, post_id=9, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review28= Review(
        content='Nothings more important than FAMILY', rating=5, post_id=1, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review29= Review(
        content='I hate horror films why did I do this to myself', rating=1, post_id=15, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review30= Review(
        content='WHY DID I LIKE THIS SO MUCH', rating=4, post_id=10, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review31= Review(
        content='I am a weeb I love all anime', rating=5, post_id=28, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review32= Review(
        content='HIYAAAAAA!!!!', rating=4, post_id=24, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review33= Review(
        content='This touched my heart', rating=4, post_id=17, user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review34= Review(
        content='Saw this with David, wow did not disappoint', rating=5, post_id=8, user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review35= Review(
        content='Non-action for almost 3 hours my brain!!', rating=3, post_id=23, user_id=10, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review36= Review(
        content='I agree, Josh Hutcherson has my heart', rating=5, post_id=8, user_id=10, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    review37= Review(
        content='Josh was my childhood crush..also the movie was great', rating=5, post_id=8, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    # review8= Review(
    #     content='Content 8 description', rating=3, post_id=8, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    # )

    # reviews = [review1, review2, review3, review4, review5, review6, review7, review8]

    reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18, review19, review20, review21, review22, review23, review24, review25, review26, review27, review28, review29, review30, review31, review32, review33, review34, review35, review36, review37]

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
