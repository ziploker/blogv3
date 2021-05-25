class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    #include CurrentUserConcern

    def setUser

        puts "in ----APPControllers-------set_current_user ----------- currentUserConcern----"
        
       
       #if session["user_id"]
       if cookies[:auth_token]
          puts "found cookie, auth token is " + cookies[:auth_token].to_s
           #@current_user = User.find(session[:user_id])
            if User.find_by_auth_token(cookies[:auth_token])
             @current_user = User.find_by_auth_token!(cookies[:auth_token])

             puts "ppp " + @current_user.inspect
            end
       end
       puts "cookies done"
        puts "OUt ----APPControllers-------set_current_user ----------- currentUserConcern----"
    end
end
