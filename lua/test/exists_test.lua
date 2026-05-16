-- ProjectName SDK exists test

local sdk = require("world-wonders_sdk")

describe("WorldWondersSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
