# WorldWonders SDK utility: prepare_body
module WorldWondersUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
