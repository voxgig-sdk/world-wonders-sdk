# WorldWonders SDK utility: feature_add
module WorldWondersUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
