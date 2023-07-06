![FlixLogo](https://i.imgur.com/O8Vs0OX.png)

Flix is an original film sharing/review application. A new user is able to create posts of movies they've recently watched and rating them on a scale of 1-5. The user can also see other user's movie posts and their ratings. Additionally, users are able to make their own reviews on other users posts and see their statistics on the platform on their profile page. This application calls for a fun user experience by sharing and seeing opinions of movies from their friends!

Flix is anticipating more features very soon.

Technologies used for this project are: Python, Flask, SQLAlchemy, JavaScript, React, HTML5, CSS3, Redux, PostgreSQL, GitHub.

Live Site: [Flix](https://flix-dyz2.onrender.com/)

## Wiki Links
[Database Schema](https://github.com/raoulandalis/Flix/wiki/Database-Schema)

[Redux Store Shape](https://github.com/raoulandalis/Flix/wiki/Redux-Store-Shape)

[API Route](https://github.com/raoulandalis/Flix/wiki/API-Routes)

## Features
- User registration and authentication: Users can create accounts and log in securely.
  
- Feed: Users can view a movie feed of all the movies existing in the database posted from all users.

- Posts: Users can create, read, update, and delete their own movie posts.

- Reviews: Users can create, read, update, and delete their own movie review/rating.

### Bonus Feature
- Search Bar: Users can look up/browse movies in the database based off name/genre.

## Installation
1. Clone the repository:

      git clone [here](https://github.com/raoulandalis/Flix)

2. Install the dependencies:

      npm install --prefix react-app &&
      npm run build --prefix react-app &&
      pip install -r requirements.txt &&
      pip install psycopg2 &&
      flask db upgrade &&
      flask seed all

3. Start project locally:

      in root directory run pipenv run flask run
      in seperate shell cd into react-app/
      run npm start

### NPM packages used
1. [React Multi Carousel](https://www.npmjs.com/package/react-multi-carousel)
   
2. [React Star Ratings](https://www.npmjs.com/package/react-star-ratings)

=======
## Acknowledgments
Flix is built using various open-source libraries and frameworks including Python, Flask, SQLAlchemy, JavaScript, React and Redux.
