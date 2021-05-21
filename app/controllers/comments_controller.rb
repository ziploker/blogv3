class CommentsController < ApplicationController

    def create

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

        s.comments.create(body: @comment, author_nick: @author_nick, author_avatar: @author_avatar)

       
        @comments = s.comments.as_json(include: [:comments])
        
        render json: {


            #article: @article_info,
            comments: @comments
        }

       


    end
end
