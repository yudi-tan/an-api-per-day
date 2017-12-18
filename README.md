# An API Per Day.

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
