# An API Per Day.

### Day 1 -- Ruby on Rails.
##### Rails API: adapted from https://www.valentinog.com/blog/build-super-simple-api-ruby-rails/
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


### Day 2 -- Django Rest Framework.
##### Django API: adapted from https://www.youtube.com/watch?v=Yw7gETuRKjw
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
