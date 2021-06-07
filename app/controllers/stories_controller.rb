class StoriesController < ApplicationController

    
     
    #sets @current_user if session[:id] exists
     #include CurrentUserConcern
  
    def index
        
    end
  
    def new
  
      if @current_user
        @loggedInStatus = "LOGGED_IN"
        
      else
        @loggedInStatus = "NOT_LOGGED_IN"
        
      end
  
      puts "-----------new story------"
      
        
    end
  
    def update
      puts "update go!!!!!!!!!!1"
    
      @story = Story.find(params[:id])
  
      if @story.update(event_params)
        redirect_to '/blog/' + params[:event][:slug]
        puts "good2g0"
      else
        #render 'edit'
        puts "failed"
      end
  
    end
  
    
    def create
  
      # if session["user_id"]
            
      #   @current_user = User.find(session[:user_id])
        
      # end


      if cookies[:auth_token]
          
        #@current_user = User.find(session[:user_id])
        if User.find_by_auth_token(cookies[:auth_token])
          @current_user = User.find_by_auth_token!(cookies[:auth_token])
          ###story.author_nick = @current_user.nick
          
          puts "in stories controller create function, current user set to ... " + @current_user.inspect
        end
      end


      story = Story.new(event_params)
      story.author_avatar = @current_user.avatar_url
      
      puts "story create about to begin save"
      begin
        puts "story create in begin save "
        story.save!
        puts "story create after save! "
      rescue ActiveRecord::RecordNotSaved => e
        puts story.errors.full_messages
      end
      
    #   puts "about to if story save?"
    #   if story.save!
    #     puts "story save! was true"
    #     #story.image.attach(event_params(:image))
    #     #render json: story
    #     puts "story was saved"
    #    else
    #     #render nothing: true, status: :bad_request

    #     puts story.errors.full_messages
    #     #render :partial => "nothin"
    #   end
    # end
      
      
  
    def edit
  
  
      if @current_user
        @loggedInStatus = "LOGGED_IN"
        @story2edit = Story.find(params[:id])
       
        
      else
        @loggedInStatus = "NOT_LOGGED_IN"
        redirect_to "/login"
        
      end
  
      
    end
  
    def show
        
    end
  
  
    private
      
      def event_params
        params.require(:event).permit(:title, :slug, :keywords, :body, :image, :url, :topic, :author_avatar, :caption)
      end
  end
  