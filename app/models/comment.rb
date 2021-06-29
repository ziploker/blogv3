class Comment < ApplicationRecord
  include ActionView::Helpers::DateHelper
  #extend ActsAsTree::TreeView

  belongs_to :user
  belongs_to :commentable, polymorphic: true
  #has_many :comments, as: :commentable, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy
  has_ancestry


  before_create :convertToFriendlyDateFormat
  before_create :set_comment_number
  
  

  #acts_as_tree order: "body"


  private
  
  def set_comment_number

    self.comment_number = user.comment_created

  end
  
  
  
  
  def convertToFriendlyDateFormat

    puts "-----------beforeCreate------------"

    puts "created_at_date = " + self.created_at.to_s

    #newTime = self.created_at.localtime.strftime("%b #{self.created_at.localtime.day.ordinalize}, %Y")

    newTime = time_ago_in_words(self.created_at.localtime)

    puts "newTime = " + newTime.to_s

    

    self.date = newTime

    puts "-----------beforeCreate------------"
  end

end
