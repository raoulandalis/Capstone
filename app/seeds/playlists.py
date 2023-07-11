from app.models.models import db, Playlist, Post, PlaylistPost, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker

fake = Faker()

def seed_playlists():
    playlist1 = Playlist(
        name = "Blockbusters", user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    playlist2 = Playlist(
        name = "Spooky Night-In", user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    playlist3 = Playlist(
        name = "Anime Vibes", user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )

    playlists = [playlist1, playlist2, playlist3]

    [db.session.add(playlist) for playlist in playlists]
    db.session.commit()

    #Join table seeds
    playlist_post1 = PlaylistPost(
        playlist_id=1, post_id=1
    )
    playlist_post2 = PlaylistPost(
        playlist_id=1, post_id=2
    )
    playlist_post3 = PlaylistPost(
        playlist_id=1, post_id=21
    )
    playlist_post4 = PlaylistPost(
        playlist_id=2, post_id=12
    )
    playlist_post5 = PlaylistPost(
        playlist_id=2, post_id=15
    )
    playlist_post6 = PlaylistPost(
        playlist_id=2, post_id=19
    )
    playlist_post7 = PlaylistPost(
        playlist_id=3, post_id=29
    )
    playlist_post8 = PlaylistPost(
        playlist_id=3, post_id=17
    )
    playlist_post9 = PlaylistPost(
        playlist_id=3, post_id=27
    )


    playlist_posts = [playlist_post1, playlist_post2, playlist_post3, playlist_post4, playlist_post5, playlist_post6, playlist_post7, playlist_post8, playlist_post9]

    [db.session.add(playlist_post) for playlist_post in playlist_posts]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_playlists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
