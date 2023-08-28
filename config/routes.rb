Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do  
      get 'get_users', to: "users#getUsers"
      get 'show_user', to: "users#showUser"
      post 'add_user', to: "users#addUser"
    end
  end
end
