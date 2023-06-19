from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, IntegerField,DateField
from wtforms.validators import DataRequired, ValidationError

def text_length(form, field):
    # Checking if post length is correct
    text = field.data
    if len(text) > 2000 or len(text) < 5:
        raise ValidationError('Post must be between 5 and 2,000 characters')

def general_text(form, field):
    text = field.data
    if len(text) > 50 or len(text) < 5:
        raise ValidationError('Name must be between 5 and 50 characters')

class PostForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(message="Name is required"), general_text])
    description = TextAreaField("Description", validators=[DataRequired(), text_length])
    genre = StringField("Genre", validators=[DataRequired(message="Genre is required"), general_text])
    post_image = StringField("Post Image", validators=[DataRequired(message="Image is required")])
    rating = IntegerField("Rating", validators=[DataRequired(message="Rating is required")])
    created_at = DateField("Date")
    submit = SubmitField("Submit")

class ReviewForm(FlaskForm):
    content = TextAreaField("Content", validators=[DataRequired(), text_length])
    rating = IntegerField("Rating", validators=[DataRequired(message="Rating is required")])
    created_at = DateField("Date")
    submit = SubmitField("Submit")
