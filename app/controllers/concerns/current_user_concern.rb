module CurrentUserConcern
    extend ActiveSupport::Concern

    included do
        before_action :set_current_user
    end

    def set_current_user
       
       puts "in -----------set_current_user ----------- currentUserConcern----"
        
        if session["user_id"]
           
            puts "session[user_id] found !!!!!!!!!!!!"
            @current_user = User.find(session[:user_id])
            
        end

        puts "OUt -----------set_current_user ----------- currentUserConcern----"
    end
end