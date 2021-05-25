module CurrentUserConcern
    extend ActiveSupport::Concern

    included do
        before_action :set_current_user
    end

    def set_current_user
       
       puts "in ----Controllers-------set_current_user ----------- currentUserConcern----"
        
       
       #if session["user_id"]
       if cookies[:auth_token]
          puts "cookies yes auto token is " + cookies[:auth_token].to_s
           #@current_user = User.find(session[:user_id])
            if User.find_by_auth_token(cookies[:auth_token])
             @current_user = User.find_by_auth_token!(cookies[:auth_token])

             puts "ppp " + @current_user.inspect
            end
       end
       puts "cookies done"
        puts "OUt ----Controller-------set_current_user ----------- currentUserConcern----"
    end
end