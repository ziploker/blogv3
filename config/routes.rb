Rails.application.routes.draw do

  resources :sessions, only: [:create]
  resources :registrations, only: [:create], param: :confirm_token do
    member do
      get :confirm_email
    end
  end

  resources :registrations, only: [:update]
  

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  
  post '/lookup', to: 'lookups#incoming'
  
  
  put '/registrations/:id', to: 'registrations#update'
  post '/registrations/forgot', to: 'registrations#forgot'
  post '/registrations/resend', to: 'registrations#resend'
  post '/registrations/:token/reset', to: 'registrations#reset', as: 'registrations_reset'
  
  
  
  
  
  get '/ziploker/edit/:id', to: 'stories#edit'
  get '/ziploker', to: 'stories#new'
  









  
  

  







  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  
  root :to => "sparks#index"

  match '*path', to: 'sparks#index', via: :all


end
