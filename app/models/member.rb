class Member < ActiveRecord::Base
  searchable do
    string  :name do
      name.downcase.gsub(/^(an?|the)/, '')
    end
    integer :height
    integer :weight
    integer :age
    string  :occupation do
      occupation.downcase.gsub(/^(an?|the)/, '')
    end
  end
end
