# WorldWonders SDK exists test

require "minitest/autorun"
require_relative "../WorldWonders_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WorldWondersSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
