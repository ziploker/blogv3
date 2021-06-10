class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :edit_history, default: ''
      t.integer :commentable_id
      t.string :commentable_type
      t.references :user, null: false, foreign_key: true
      t.boolean :reply, default: false
      t.integer :comment_number
      t.text :body
      t.string :date
      t.string :author_nick
      t.string :author_avatar

      t.timestamps
    end
  end
end
