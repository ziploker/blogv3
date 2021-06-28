
collection @ls
attributes :id


# collection @lastStory
# attributes :id, :title, :body
#child(:comments) { attributes :body, :id }
# #node(:read) { |post| post.read_by?(@user) }


child :comments do
    attributes :id, :body
    
  end