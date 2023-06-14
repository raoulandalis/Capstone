from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField,TextAreaField, IntegerField,DateField
from wtforms.validators import DataRequired, Length, URL, Email, ValidationError

def text_length(form, field):
    # Checking if post length is correct
    text = field.data
    if len(text) > 2000 or len(text) < 5:
        raise ValidationError('Post must be between 5 and 5,000 characters')

class PostForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired(), text_length])
    genre = StringField("Genre", validators=[DataRequired()])
    post_image = StringField("Post Image", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    created_at = DateField("Date")
    submit = SubmitField("Submit")

class ReviewForm(FlaskForm):
    content = StringField("Content", validators=[DataRequired(), text_length])
    rating = IntegerField("Rating", validators=[DataRequired()])
    created_at = DateField("Date")
    submit = SubmitField("Submit")
