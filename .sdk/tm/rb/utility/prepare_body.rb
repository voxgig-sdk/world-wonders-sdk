# WorldWonders SDK utility: prepare_body
require_relative 'media'
module WorldWondersUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return WorldWondersUtilities.raw_body(ctx.reqdata) if WorldWondersUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
