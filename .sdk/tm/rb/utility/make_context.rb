# WorldWonders SDK utility: make_context
require_relative '../core/context'
module WorldWondersUtilities
  MakeContext = ->(ctxmap, basectx) {
    WorldWondersContext.new(ctxmap, basectx)
  }
end
