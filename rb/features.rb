# WorldWonders SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module WorldWondersFeatures
  def self.make_feature(name)
    case name
    when "base"
      WorldWondersBaseFeature.new
    when "test"
      WorldWondersTestFeature.new
    else
      WorldWondersBaseFeature.new
    end
  end
end
