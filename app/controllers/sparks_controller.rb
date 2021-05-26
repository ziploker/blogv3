class SparksController < ApplicationController
    #include CurrentUserConcern

    STORIES_PER_PAGE = 4
    
    
    def index

        puts "---------calling setUser from sparks controller-----------"
        setUser

        # puts "Set Current User from sparks controller"
        # if cookies[:auth_token]
        #     puts "cookies found AND AUTH     token is " + cookies[:auth_token].to_s
        #     #@current_user = User.find(session[:user_id])
              
        #     if User.find_by_auth_token(cookies[:auth_token])
        #         @current_user = User.find_by_auth_token!(cookies[:auth_token])
  
        #         puts "USER_INSPECT " + @current_user.inspect
        #       end
        #  end

        @path = params[:path]
        #@story = Story.order("created_at").last

        @page = params.fetch(:page, 0).to_i
        
        #@stories = Story.order("created_at DESC").offset(@page * STORIES_PER_PAGE).limit(STORIES_PER_PAGE)
        #@story = Story.all

        @lastStory = Story.last
        @secondToLastStory = Story.second_to_last
        @thirdToLastStory = Story.third_to_last
        @fourthToLastStory = Story.order('created_at DESC').fourth()
        @googleGeoApi = Rails.application.credentials.dig(:google, :geoapi)

        
        
        


        
        #puts "google api is = " + @googleGeoApi
        

        #@image = "http://localhost.com/" + @image

        #@image = polymorphic_url(lastStory.image)

        #@image = lastStory.image.service_url
        #@image = rails_blob_url(lastStory.image, disposition: "attachment")

        #@image = rails_blob_url(lastStory.image, only_path: true) if lastStory.image.attached?

        ##if @story.count > 0 

        ##    lastStory = Story.last
        
        ##    @image = lastStory.image.service_url&.split("?")&.first 
        ##    @imagelong = lastStory.image.service_url 
        ##end
    end



    def next_page

        puts "next----------------page"
        @page = params.fetch(:page, 0).to_i
        
        @stories = Story.order("created_at DESC").offset(@page * STORIES_PER_PAGE).limit(STORIES_PER_PAGE)

        render json: {
                
            
            stories: @stories
        }
    end


    def get_article_info

        puts " SLUG = " + params["data"]["slug"]

        @article_info = Story.find_by(slug: params["data"]["slug"])
        @comments = @article_info.comments.as_json(include: [:comments])
        puts @article_info.inspect

        if @current_user
            
            render json: {


                article: @article_info,
                comments: @comments,
                user: @current_user
            }

        else

            render json: {


                article: @article_info,
                comments: @comments
            }
        end
    end
end