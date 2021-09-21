Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/win_loss_history/:user_id', to: 'win_loss_histories#show'
  post '/win_loss_history', to: 'win_loss_histories#create'

  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/users/:id', to: 'users#update'

  post '/signin', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'
 
  resources :games, only: [:index]

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
