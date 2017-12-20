# An API Per Day.


Table of contents
=================

  * [Day 1 -- Rails](#rails) 
  * [Day 2 -- Django](#django) 
  * [Day 3 -- Flask](#flask)

### Day 1 -- <a name="rails">Ruby on Rails</a>.
##### Rails API: adapted from https://www.valentinog.com/blog/build-super-simple-api-ruby-rails/
##### Follow my journey here: https://medium.com/@tanyudi/an-api-a-day-challenge-day-1-rails-aeea9780898d
Steps: 
1) To start a new rails project, ```rails new rails-api --api```
2) Generate a new model via ```rails g model post title:text content:text```
3) Under Routes.rb, insert ```resources :posts``` and then run ```rake routes``` in the terminal.
4) Now, seed the database via inserting into `seeds.rb`

    ```
    posts = Post.create([{title: 'Hello World!', content: 'This is our first post!'}, {title: 'Goodbye World!', content: 'This     is our second post!'}])
    ```
5) Always remember to run ```rails db:migrate``` whenever you make a new migration. Then run ```rails db:seed``` to seed the database so we have some data to work with.
6) We now need a controller to tell the server what to do whenever a user hits a specified endpoint. Run ```rails generate controller Posts```.
7) Then, within the newly created controller, add the following method: 

      ```
      def index
        @posts = Post.all()
        render json:{ status: 200, data: @posts }
      end
      ```
   
8) Finally, run ```rails server``` and hit ```http://localhost:3000/posts/``` endpoint and the following JSON data should render


    ```
    {
    status: 200,
    data: [
            {
            id: 1,
            created_at: "2017-12-18T19:52:44.882Z",
            updated_at: "2017-12-18T19:52:44.882Z",
            title: "Hello World!",
            content: "This is our first post!"
            },
            {
            id: 2,
            created_at: "2017-12-18T19:52:44.885Z",
            updated_at: "2017-12-18T19:52:44.885Z",
            title: "Goodbye World!",
            content: "This is our second post!"
            }
            ]
   }
   ```


### Day 2 -- <a name="django">Django Rest Framework.</a>
##### Django API: adapted from https://www.youtube.com/watch?v=Yw7gETuRKjw
##### Follow my journey here https://medium.com/@tanyudi/an-api-a-day-challenge-day-2-django-14aaded9cfbb
Steps:
1) You should already have Django installed, then install the django rest framework via `pip install djangorestframework`.
2) Once installed, initiate a new Django project with `django-admin startproject PROJECTNAMEHERE`.
3) Then, create an "app" (think "component") within this newly created project via `python manage.py startapp APPNAMEHERE`.
4) Update settings.py file's installed_apps array with 'rest_framework' and 'appname.apps.APPNAMEConfig'. 
5) Navigate to APPNAME/models.py and include 

``` 
from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.TextField()
    content = models.TextField()

    def __str__(self):
        return self.title
```
6) Register your newly created Post model in the admin site by including in the admins.py file 

```
from django.contrib import admin

# Register your models here.
from .models import Post

admin.site.register(Post)
```

7) Run `python manage.py makemigrations` and `python manage.py migrate` to fully migrate your newly created model.
8) Run `python manage.py createsuperuser` and follow the instructions in the terminal to create an admin account.
9) Visit http://localhost:8000/admin and login, then click on the Post model and create a new Post object.
10) Create a new serializers.py in the same app directory and include the following 

```
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('title', 'content')
```

11) Under views.py in the same directory, include the following

```
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer

class PostList(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

        
    def post(self):
        pass
```

12) Finally, go to the main directory's urls.py and include:

```
from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from blog import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^posts/', views.PostList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
```

13) Now visit localhost:8000/posts to find your data returned as JSON.
14) Also, for it to work in production so that other sites can fetch data from this API, you need to enable CORS. To do so, first run `pip install django-cors-headers`, then include 'corsheaders' under INSTALLED_APPS and `'corsheaders.middleware.CorsMiddleware'` under MIDDLEWARE in the settings.py file. Also, add `CORS_ORIGIN_ALLOW_ALL = True` at the bottom of settings.py and you're all set.

### Day 3 -- <a name="flask">Flask MicroFramework.</a>
##### Flask API: adapted from http://www.bogotobogo.com/python/MongoDB_PyMongo/python_MongoDB_RESTAPI_with_Flask.php
##### Follow my journey here https://medium.com/@tanyudi/an-api-a-day-challenge-day-2-django-14aaded9cfbb

Steps:
1) Install dependencies at http://flask.pocoo.org/ and run `pip install Flask-PyMongo`.
2) Set up a mLab mongoDB sandbox.
3) Create a collection within the sandbox and include some documents, formatted as JSON. i.e.

```
{
    "title": "Blog Post 1",
    "content": "This is a test post!"
}
```

4) Create a user instance for that particular mongoDB collection.
5) Then, navigate to a desired directory and create a python file (I named mine flaskAPI.py).
6) Include the following code:

```
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'an-api-per-day'
//this URL is given by mLab and unique to each database, so make sure you look at yours
app.config['MONGO_URI'] = 'mongodb://<dbuser>:<dbpassword>@ds161016.mlab.com:61016/an-api-per-day' 
mongo = PyMongo(app)

@app.route('/posts', methods=['GET'])
def PostList():
    posts = mongo.db.posts
    output = []
    for p in posts.find():
        output.append({'title': p['title'], 'content': p['content']})
    return jsonify({'result': output})

```

and replace MONGO_URI's <dbuser> and <dbpassword> with the credentials of your newly created mongoDB collection user.
 
7) Spin up the development server via `FLASK_APP=flaskAPI.py flask run`
8) Navigate to http://localhost:5000/posts to see your JSON data. 
