from app.models.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date
from faker import Faker

fake = Faker()


def seed_posts():
    post1 = Post(
        name='Fast X', description='In "Fast X," Dom Toretto and his crew face Cipher, a vengeful cyber-terrorist. They embark on a high-stakes mission, racing through exotic locations, engaging in intense chases, and performing breathtaking stunts. With themes of family and loyalty, "Fast X" delivers non-stop action and unexpected twists. Buckle up for a pulse-pounding adventure.', genre='Action', post_image='https://m.media-amazon.com/images/I/71FtQA0+fiL._AC_UF894,1000_QL80_.jpg', rating= 4, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post2 = Post(
        name='The Flash', description='"The Flash" brings the iconic superhero to life as Barry Allen discovers his superhuman speed and time-travel abilities. With a formidable enemy threatening the timeline, Barry must use his powers to save his loved ones and restore order. Packed with mind-bending action and heartfelt moments, "The Flash" delivers an exhilarating journey of heroism and self-discovery.', genre='Action', post_image='https://i0.wp.com/batman-news.com/wp-content/uploads/2023/04/The-Flash-Movie-Poster-International-01.jpeg?fit=1382%2C2048&quality=80&strip=info&ssl=1', rating= 5, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post3 = Post(
        name='Air', description='Sonny Vaccaro and Nike pursue basketball rookie Michael Jordan, creating a partnership that revolutionizes the world of sports and contemporary culture.', genre='Drama', post_image='https://www.joblo.com/wp-content/uploads/2023/02/air-final-poster.jpg', rating= 2, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post4 = Post(
        name='Spider-Man: Across the Spider-Verse', description="After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.", genre='Action/Adventure', post_image='https://m.media-amazon.com/images/I/719UgUPLYNL._AC_SL1500_.jpg', rating=5, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post5 = Post(
        name='Interstellar', description="Earth's last chance to find a habitable planet before a lack of resources causes the human race to go extinct.", genre='Sci-Fi/Adventure', post_image='https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating=5, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post6 = Post(
        name='Tranformers: Rise of the Beasts', description="Optimus Prime and the Autobots take on their biggest challenge yet. When a new threat capable of destroying the entire planet emerges, they must team up with a powerful faction of Transformers known as the Maximals to save Earth.", genre='Action/Sci-Fi', post_image='https://m.media-amazon.com/images/M/MV5BZTNiNDA4NmMtNTExNi00YmViLWJkMDAtMDAxNmRjY2I2NDVjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg', rating=3, user_id=1, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post7 = Post(
        name='The Perks of Being a Wallflower', description="Socially awkward teen Charlie (Logan Lerman) is a wallflower, always watching life from the sidelines, until two charismatic students become his mentors.", genre='Drama', post_image='https://m.media-amazon.com/images/M/MV5BZThjMmQ5YjktMTUyMC00MjljLWJmMTAtOWIzNDIzY2VhNzQ0XkEyXkFqcGdeQXVyMTAyNjg4NjE0._V1_FMjpg_UX1000_.jpg', rating=4, user_id=2, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post8 = Post(
        name='Bridge to Terabithia', description='The life of Jesse, an adolescent, changes when he befriends Leslie, the class outsider.', genre='Fantasy', post_image='https://m.media-amazon.com/images/M/MV5BMTMzOTk1MzIyN15BMl5BanBnXkFtZTcwNTM3MjczMQ@@._V1_FMjpg_UX1000_.jpg', rating=5, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post9 = Post(
        name='The Super Mario Bros. Movie', description='With help from Princess Peach, Mario gets ready to square off against the all-powerful Bowser to stop his plans from conquering the world.', genre='Adventure', post_image='https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_FMjpg_UX1000_.jpg', rating=1, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post10 = Post(
        name='Bring It On', description="The Toro cheerleading squad from Rancho Carne High School in San Diego has got spirit, spunk, sass and a killer routine that's sure to land them the national championship trophy for the sixth year in a row.", genre='Comedy', post_image='https://m.media-amazon.com/images/M/MV5BZmFlOWY1YTMtOGRkZC00ODRmLTlkNTQtZDBhNGU1Y2E0NmE1XkEyXkFqcGdeQXVyNDUzNzgxODE@._V1_FMjpg_UX1000_.jpg', rating=5, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post11 = Post(
        name='Jackass Forever', description="Celebrate the joy of a perfectly executed shot to the groin as Johnny Knoxville, Steve-O and the rest of the gang return for another round of hilarious, wildly absurd and often dangerous displays of stunts and comedy.", genre='Comedy', post_image='https://m.media-amazon.com/images/M/MV5BNTdmMDNmYmItOWFmNC00YzdkLWIyZWMtMGRlMTQyZDZmNDU0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg', rating=1, user_id=3, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post12 = Post(
        name='The Menu', description="The film is centered around a group of elite guests who arrive on a private island for a dining experience at celebrity chef Julian Slowik's exclusive restaurant, Hawthorne.", genre='Horror/Comedy', post_image='https://m.media-amazon.com/images/M/MV5BMzdjNjI5MmYtODhiNS00NTcyLWEzZmUtYzVmODM5YzExNDE3XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_FMjpg_UX1000_.jpg', rating=4, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post13 = Post(
        name='Brokeback Mountain', description="The story of two young men, Ennis del Mar and Jack Twist, a Wyoming ranch hand and a rodeo cowboy, who meet in the summer of 1963 sheepherding in the harsh, high grasslands of contemporary Wyoming and form an unorthodox yet life-long bond--by turns ecstatic, bitter and conflicted", genre='Romance', post_image='https://m.media-amazon.com/images/M/MV5BMTY5NTAzNTc1NF5BMl5BanBnXkFtZTYwNDY4MDc3._V1_.jpg', rating=4, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post14 = Post(
        name='Creed III', description="Still dominating the boxing world, Adonis Creed is thriving in his career and family life. When Damian, a childhood friend and former boxing prodigy resurfaces after serving time in prison, he's eager to prove that he deserves his shot in the ring.", genre='Action', post_image='https://m.media-amazon.com/images/M/MV5BYWY1ZDY4MmQtYjhiYS00N2QwLTk1NzgtOWI2YzUwZThjNDYwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg', rating=3, user_id=4, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post15 = Post(
        name='A Quiet Place', description="A family struggle to survive in a post-apocalyptic world inhabited by blind extraterrestrial creatures with an acute sense of hearing.", genre='Horror/Sci-Fi', post_image='https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_.jpg', rating=4, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post16 = Post(
        name='Where the Crawdads Sing', description="A coming-of-age story of a young girl raised by the marshlands of the south in the 1950s.", genre='Mystery/Romance', post_image='https://m.media-amazon.com/images/M/MV5BMTJmNGJmYTgtYjAxNy00YmMzLTk2YTYtMGIzMmUwNDMyMTY1XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg', rating=2, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post17 = Post(
        name='A Silent Voice', description="An elementary school student named Shōya Ishida and his friends bully Shōko Nishimiya, a transfer student who was born deaf. When word of the bullying reaches the principal, Shōya is framed as the sole perpetrator by his friends.", genre='Romance', post_image='https://m.media-amazon.com/images/M/MV5BZGRkOGMxYTUtZTBhYS00NzI3LWEzMDQtOWRhMmNjNjJjMzM4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg', rating=4, user_id=5, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post18 = Post(
        name='Glass Onion', description="Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Benoit Blanc is put on the case.", genre='Mystery', post_image='https://m.media-amazon.com/images/M/MV5BYmZlZDZkZjYtNzE5Mi00ODFhLTk2OTgtZWVmODBiZTI4NGFiXkEyXkFqcGdeQXVyMTE5MTg5NDIw._V1_FMjpg_UX1000_.jpg', rating=3, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post18 = Post(
        name='Barbarian', description="A young woman discovers the rental home she booked is already occupied by a stranger. Against her better judgment, she decides to spend the night but soon discovers there's a lot more to fear than just an unexpected house guest.", genre='Horror', post_image='https://m.media-amazon.com/images/M/MV5BN2M3Y2NhMGYtYjUxOS00M2UwLTlmMGUtYzY4MzFlNjZkYzY2XkEyXkFqcGdeQXVyODc0OTEyNDU@._V1_FMjpg_UX1000_.jpg', rating=4, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post19 = Post(
        name='The Batman', description="Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.", genre='Action', post_image='https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg', rating=3, user_id=6, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post20 = Post(
        name='Avatar: The Way of Water', description="Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora. When an ancient threat resurfaces, Jake must fight a difficult war against the humans.", genre='Adventure', post_image='https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg', rating=4, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post21 = Post(
        name='The Big Short', description="In 2006-2007 a group of investors bet against the United States mortgage market. In their research, they discover how flawed and corrupt the market is.", genre='Drama', post_image='https://m.media-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg', rating=3, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post22 = Post(
        name='PAW Patrol: The Movie', description="When their biggest rival, Humdinger, starts wreaking havoc as the mayor of Adventure City, Ryder and everyone's favorite heroic pups kick into high gear to face the challenge.", genre='Adventure', post_image='https://m.media-amazon.com/images/M/MV5BOTFkN2JhOGEtODQzOC00NzA2LThkNzktYjhkMWIyNjM5YjNlXkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_FMjpg_UX1000_.jpg', rating=5, user_id=7, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post23 = Post(
        name='John Wick: Chapter 4', description="With the price on his head ever increasing, legendary hit man John Wick takes his fight against the High Table global as he seeks out the most powerful players in the underworld, from New York to Paris to Japan to Berlin.", genre='Action', post_image='https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_FMjpg_UX1000_.jpg', rating=3, user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post24 = Post(
        name='Kung Fu Hustle', description="When the hapless Sing and his dim-witted pal Bone try to scam the residents of Pig Sty Alley into thinking they're members of the dreaded Axe Gang, the real gangsters descend on this Shanghai slum to restore their fearsome reputation.", genre='Action', post_image='https://m.media-amazon.com/images/M/MV5BMjZiOTNlMzYtZWYwZS00YWJjLTk5NDgtODkwNjRhMDI0MjhjXkEyXkFqcGdeQXVyMjgyNjk3MzE@._V1_FMjpg_UX1000_.jpg', rating=4, user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post25 = Post(
        name='Rush Hour', description="When a Chinese diplomat's daughter is kidnapped in Los Angeles, he calls in Hong Kong Detective Inspector Lee to assist the FBI with the case. But the FBI doesn't want anything to do with Lee, and they dump him off on the LAPD, who assign wisecracking Detective James Carter to watch over him.", genre='Action', post_image='https://m.media-amazon.com/images/M/MV5BYWM2NDZmYmYtNzlmZC00M2MyLWJmOGUtMjhiYmQ2OGU1YTE1L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg', rating=5, user_id=9, created_at=fake.date_between(start_date='-5y', end_date='today')
    )
    post26 = Post(
        name='I Want to Eat Your Pancreas', description='An aloof boy comes across a book in a hospital waiting room. He soon discovers that it is a diary kept by his very popular classmate who reveals to him that she is secretly suffering from a fatal pancreatic illness.', genre='Romance', post_image='https://m.media-amazon.com/images/M/MV5BNDM4MWE3NGQtODlkYS00NWU5LTg3ZjMtMTEyNjljOWI4NWIxXkEyXkFqcGdeQXVyNzkzODk2Mzc@._V1_.jpg', rating=5, user_id=8, created_at=fake.date_between(start_date='-5y', end_date='today')
    )



    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post16, post17, post18, post19, post20, post21, post22, post23, post24, post25, post26]

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
