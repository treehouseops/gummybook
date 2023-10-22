# config/routes.rb
Rails.application.routes.draw do
  root "pages#home"

  namespace :api do
    resources :questions, only: [:create] do
      collection do
        post :ask
        get :recent_questions
      end
    end
  end
end
