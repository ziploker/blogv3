class CommentsController < ApplicationController
    puts "[][][][][][][][][ welcome to comments controller ][][][][][]"
    before_action :find_commentable, only: [:create]
    before_action :set_comment, except: [:create]
    #before_action :authenticate_user!
    

    def create

        puts "===========in comments controller, create function ==============="
        puts "running setuser from comment controller, create action"
        setUser
        #things needed to post comment
        # ID of article

        ##things needed to post comment on a comment
        # ID of Comment

        # @comment = params['event']['comment']
        # @articleID = params['event']['articleID']
        # @commentID = params['event']['commentID']

        # @author_nick = params['event']['author_nick']
        # @author_avatar = params['event']['author_avatar']

        # s = Story.find_by(id: @articleID)

        # s.comments.create!(body: @comment, author_nick: @author_nick, author_avatar: @author_avatar, user_id: @current_user.id)

       
        # @comments = s.comments.as_json(include: [:comments])
        
        # render json: {


        #     #article: @article_info,
        #     comments: @comments
        # }



        puts "about to save comment, check if current user==================="
        if @current_user

            puts "current user found, build and save comment"
            @comment = @commentable.comments.build(comment_params)

            @comment.user = @current_user

            @comment.reply = true  if params[:comment_id]

            @comment.save!

            puts "build and save comment commplete!!"
        
        
        
        else


            puts "current user not found, send login message"

        end


    end


    def edit
    end


    def update 
    end

    def destroy
    end

    def history 
    end


    private

    def comment_params
        params.require(:comment).permit(:body)
    end

    def find_commentable

        puts "in comments controller, find_commentable before action ==========="
        #comment
        if params[:comment_id]
            puts "params[:comment_id] was true so @commentable will be a comment reply"
            @commentable = Comment.find_by_id(params[:comment_id])
        elsif params[:story_id]
            
            puts "params[:story_id] was true so @commentable will be a comment reply"

            @commentable = Story.find(params[:story_id])
        end

        #post
    end

    def set_comment 
        @comment = Comment.find(params[:id])
    end

    puts "[][][][][][][][][ farewell to comments controller ][][][][][]"
end
