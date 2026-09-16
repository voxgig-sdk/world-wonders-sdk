# WorldWonders SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WorldWondersFeatures
  def self.make_feature(name)
    case name
    when "base"
      WorldWondersBaseFeature.new
    when "ratelimit"
      WorldWondersRatelimitFeature.new
    when "retry"
      WorldWondersRetryFeature.new
    when "test"
      WorldWondersTestFeature.new
    when "timeout"
      WorldWondersTimeoutFeature.new
    else
      WorldWondersBaseFeature.new
    end
  end
end
