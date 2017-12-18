class PostsController < ApplicationController
  def index
    @posts = Post.all()
    render json:{ status: 200, data: @posts }
  end
end
