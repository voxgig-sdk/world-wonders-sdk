-- WorldWonders SDK error

local WorldWondersError = {}
WorldWondersError.__index = WorldWondersError


function WorldWondersError.new(code, msg, ctx)
  local self = setmetatable({}, WorldWondersError)
  self.is_sdk_error = true
  self.sdk = "WorldWonders"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WorldWondersError:error()
  return self.msg
end


function WorldWondersError:__tostring()
  return self.msg
end


return WorldWondersError
