Rails.application.routes.draw do
  resources :bank_transactions
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/comments', to: 'comments#index'
  post '/comments', to: 'comments#create'
  patch '/comments/:id', to: 'comments#update'
  delete '/comments/:id', to: 'comments#destroy'

  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  patch '/users/:id', to: 'users#update'

  post '/signin', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'
 
  resources :games, only: [:index]
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
