Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      post '/user/register', to: 'users#register'
      post '/user/login', to: 'users#login'
      post '/user/addTruck', to: 'users#addTruck'
      post '/user/addLocation', to: 'users#addLocation'
      get '/user/getTrucks', to: 'users#getTrucks'
      post '/user/getLocations', to: 'users#getLocations'
      post '/user/liveLocation', to: 'users#liveLocation'
    end
  end
end
