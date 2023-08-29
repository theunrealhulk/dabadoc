Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do  
      post 'signup', to: "users#signUp"
      post 'signin', to: "users#signIn"
      #authorized routes
      post 'signout', to: "users#signOut"
      post 'post_question', to: "users#postQuestion"
      post 'post_answer', to: "users#postAnswer"
      post 'like_question', to: "users#likeQuestion"
      post 'unlike_question', to: "users#unlikeQuestion" 
      get 'favorites', to: "users#favorits"
      get 'questions', to: "users#listQuestions"
      get 'question', to: "users#getQuestion"
      get 'get_users', to: "users#getUsers" # delete this
    end
  end
end
