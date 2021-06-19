class SparksController < ApplicationController

    puts "welcome to sparks controller"
    #include CurrentUserConcern

    STORIES_PER_PAGE = 4
    
    
    def index

        puts "============Sparks controller def index start================"

        puts "---------calling setUser from sparks controller-----------"
        
        setUser

        @path = params[:path]
        
        @page = params.fetch(:page, 0).to_i
        
        #@stories = Story.order("created_at DESC").offset(@page * STORIES_PER_PAGE).limit(STORIES_PER_PAGE)
        
        @lastStory = Story.last
        @secondToLastStory = Story.second_to_last
        @thirdToLastStory = Story.third_to_last
        @fourthToLastStory = Story.order('created_at DESC').fourth()
        @googleGeoApi = Rails.application.credentials.dig(:google, :geoapi)

        
        puts "============Sparks controller def index end================"
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

        puts "============Sparks controller def get_article_info start================"


        puts "set user from sparks get article info start"
        setUser
        puts "set user from sparks get article info end"
        puts " SLUG = " + params["data"]["slug"]

        @article_info = Story.find_by(slug: params["data"]["slug"])
        #@comments = @article_info.comments.as_json(include: [:comments])
        @comments = @article_info.comments.as_json(include: {comments: { include: [:comments]}})
        puts @article_info.inspect

        if @current_user

            puts "found current user"
            
            render json: {


                article: @article_info,
                comments: @comments,
                user: @current_user
            }

        else

            puts "did not find current user"
            render json: {


                article: @article_info,
                comments: @comments
            }
        end
        puts "============Sparks controller def get_article_info end================"

    end
    
    
    
    puts "farewell to sparks controller"
end