class AddMissingItemsToComment < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :date, :string
    add_column :comments, :author_nick, :string
    add_column :comments, :author_avatar, :string
  end
end
