class CommentsController < ApplicationController

    #before_action :find_commentable, only: [:create]
    #before_action :set_comment, except: [:create]
    #before_action :authenticate_user!
    

    def create

        puts "running setuser from comment controller, create action"
        setUser
        #things needed to post comment
        # ID of article

        ##things needed to post comment on a comment
        # ID of Comment

        @comment = params['event']['comment']
        @articleID = params['event']['articleID']
        @commentID = params['event']['commentID']

        @author_nick = params['event']['author_nick']
        @author_avatar = params['event']['author_avatar']

        s = Story.find_by(id: @articleID)

        s.comments.create!(body: @comment, author_nick: @author_nick, author_avatar: @author_avatar, user_id: @current_user.id)

       
        @comments = s.comments.as_json(include: [:comments])
        
        render json: {


            #article: @article_info,
            comments: @comments
        }



       


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

        #comment
        if params[:comment_id]
            @commentable = Comment.find_by_id(params[:comment_id])
        elsif
            @commentable = Story.find(params[:story_id])
        end

        #post
    end

    def set_comment 
        @comment = Comment.find(params[:id])
    end


end
