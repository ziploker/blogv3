Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/lookup', to: 'lookups#incoming'
  root :to => "sparks#index"

end
