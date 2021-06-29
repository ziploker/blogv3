class SparksController < ApplicationController

    puts "welcome to sparks controller"
    #include CurrentUserConcern
    
    STORIES_PER_PAGE = 4

    #before_action :default_format_json

    #def default_format_json
    #    request.format = "json"
    #end

    
    
    def index

        

        puts "============Sparks controller def index start================"

        puts "---------calling setUser from sparks controller-----------"
        
        setUser

        
        #@ls = Story.last
        
        puts "=============  check to see if params[:path] exists AND corresponds to a story "
        
        if params[:path]
            puts "params[:path] is ========" + params[:path]
            puts "params exists, try to find story with it"
            
            @seeIfStoryExists = Story.find_by(slug: params[:path].split('/')[-1])
        
            
            
            puts "blank? ===== " + @seeIfStoryExists.blank?.to_s
            puts "nil? ====== " + @seeIfStoryExists.nil?.to_s
            
            
            if @seeIfStoryExists.blank?
                puts "@seeIfStoryExists.blank? was true, so no story was found, either bad params or no story found, redirect to root path with no params, aka homepage, and exit controller "
                redirect_to root_path
                return false
            end
            
            if @seeIfStoryExists.nil?
                puts "@seeIfStoryExists.blank? was true, so no story was found, either bad params or no story found, redirect to root path with no params, aka homepage, and exit controller "
                redirect_to root_path
                return false
            end
        
            puts "@seeIfStoryExists was true, so exit controller because itll be handled by react router instead"
            return false
        
        else
            puts "params[:path] didnt exist i guess, carry on"

            @path = params[:path]
            
            @page = params.fetch(:page, 0).to_i
            
            #@stories = Story.order("created_at DESC").offset(@page * STORIES_PER_PAGE).limit(STORIES_PER_PAGE)
            
            @lastStory = Story.last
            @secondToLastStory = Story.second_to_last
            @thirdToLastStory = Story.third_to_last
            @fourthToLastStory = Story.order('created_at DESC').fourth()
            @googleGeoApi = Rails.application.credentials.dig(:google, :geoapi)
        

            
        end

        
        
        
        
        #respond_to :html, :json, :xml
            


        

        
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
        
        # @comments = @article_info.comments.as_json(include: {comments: 
        #                                             { include: {comments:
        #                                                 { include: {comments:
        #                                                     { include: [:comments]}
        #                                                 }}
        #                                             }}
        #                                         })

        
        puts "===========================as_json++++++++++++++++++++++++++++"
        @comments = @article_info.comments.as_json(include: {comments: 
            { include: {comments:
                { include: {comments:
                    { include: {comments:
                        { include: {comments:
                            { include: :comments}
                        }}
                    }}
                }}
            }}
                        })
        puts "===========================as_json++++++++++++++++++++++++++++"

        #@comments = @article_info.comments.serializable_hash(include: [:comments]) 


        #@comments = @article_info.comments.as_json(include: {comments: {include: :comments}})


        #@comments = @article_info.comments.as_json(include: [:comments.**])


        #@comments = ActiveModelSerializers::SerializableResource.new(@article_info.comments, include: ['comments.**']).as_json


        #@comments = @article_info.comments.as_json(include: {comments: { include: [:comments]}})
        
        #comments = Rabl::Renderer.json(@post, 'posts/show')

        

        #puts @article_info.inspect





        puts "============= new logic test start ==================="
        puts "============= new logic test start ==================="
        puts "============= new logic test start ==================="


        @totalTopLevelComments = @article_info.comments.length
        @arrayOfLevels = []
        @levels = 0
        @dupArray = []

        
        #comment array goes in, check to see how deep it goes heeyyohh
        def findC(array)

            puts "about to array.each==>  " + array.inspect
            puts "============================================="
            puts "============================================="
            puts "============================================="
            puts "============================================="
            puts "the total length of this array is " + array.length.to_s

            
        
            array.each { |x| 
                
                puts "the total length of this array is " + x.comments.length.to_s

                @levels = @levels + 1
                
                
                #if the comment has its own comments (replies), restart loop.
                if x.comments.length > 0

                    
                    findC(x.comments)
        
                
                elsif x.comments.length == 0
                    
                    puts "no more comments found ============"
                    @arrayOfLevels.push(@levels)
                    @levels = 0

                end
                
                
                
                
                
                
                
                
            
            
            }
          
            
          
            puts "total top level comments = " + @totalTopLevelComments.to_s

            puts ' @arrayOfLevels is ' + @arrayOfLevels.inspect

        
        
            #puts " count is = " + @article_info.comments.length.to_s
        
            
        
        
        
        
            puts ' @@@@@@@@@@@ exit @@@@@@@@@@@@@@ '
        
        
        
        
        
        
        end
        
        #@dupArray = @article_info.comments.amoeba_dup
       
        
        findC(@article_info.comments)

        puts "dupArray ===========MMMMMMMMMMMMMMMMMMM== " + @dupArray.inspect
        
        puts "=============new logic test end==================="
        puts "=============new logic test end==================="
        puts "=============new logic test end==================="

        if @current_user

            puts "found current user"
            
            # render json: {


            #     article: @article_info,
            #     comments: @comments,
            #     user: @current_user
            # }


             render json: {


                article: @article_info,
               # comments: ActiveModelSerializers::SerializableResource.new(@article_info.comments, include: {comments: { include: ['**']}}).as_json,
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