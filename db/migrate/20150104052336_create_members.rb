class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :name
      t.integer :age
      t.integer :height
      t.integer :weight
      t.string :occupation

      t.timestamps
    end
  end
end
