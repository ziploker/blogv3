class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    #include CurrentUserConcern

    def setUser

        puts "=============applicaton controller setUser Start==========="
        
        if cookies[:auth_token]
            puts "auth_token found!! its " + cookies[:auth_token]
        else

            puts "auth_token not found"
        end
       
       #if session["user_id"]
       if cookies[:auth_token]
          
           #@current_user = User.find(session[:user_id])
            if User.find_by_auth_token(cookies[:auth_token])
             @current_user = User.find_by_auth_token!(cookies[:auth_token])

             puts "current user set to ... " + @current_user.inspect
            end
       end
       
       
    end

    puts "=============applicaton controller setUser End==========="
end
