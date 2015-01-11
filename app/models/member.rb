class Member < ActiveRecord::Base
  searchable do
    string  :name
    integer :id
    integer :height
    integer :weight
    integer :age
    string  :occupation
  end
end
