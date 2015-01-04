json.array!(@members) do |member|
  json.extract! member, :id, :name, :age, :height, :weight, :occupation
  json.url member_url(member, format: :json)
end
