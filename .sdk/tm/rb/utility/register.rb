# WorldWonders SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WorldWondersUtility.registrar = ->(u) {
  u.clean = WorldWondersUtilities::Clean
  u.done = WorldWondersUtilities::Done
  u.make_error = WorldWondersUtilities::MakeError
  u.feature_add = WorldWondersUtilities::FeatureAdd
  u.feature_hook = WorldWondersUtilities::FeatureHook
  u.feature_init = WorldWondersUtilities::FeatureInit
  u.fetcher = WorldWondersUtilities::Fetcher
  u.make_fetch_def = WorldWondersUtilities::MakeFetchDef
  u.make_context = WorldWondersUtilities::MakeContext
  u.make_options = WorldWondersUtilities::MakeOptions
  u.make_request = WorldWondersUtilities::MakeRequest
  u.make_response = WorldWondersUtilities::MakeResponse
  u.make_result = WorldWondersUtilities::MakeResult
  u.make_point = WorldWondersUtilities::MakePoint
  u.make_spec = WorldWondersUtilities::MakeSpec
  u.make_url = WorldWondersUtilities::MakeUrl
  u.param = WorldWondersUtilities::Param
  u.prepare_auth = WorldWondersUtilities::PrepareAuth
  u.prepare_body = WorldWondersUtilities::PrepareBody
  u.prepare_headers = WorldWondersUtilities::PrepareHeaders
  u.prepare_method = WorldWondersUtilities::PrepareMethod
  u.prepare_params = WorldWondersUtilities::PrepareParams
  u.prepare_path = WorldWondersUtilities::PreparePath
  u.prepare_query = WorldWondersUtilities::PrepareQuery
  u.result_basic = WorldWondersUtilities::ResultBasic
  u.result_body = WorldWondersUtilities::ResultBody
  u.result_headers = WorldWondersUtilities::ResultHeaders
  u.transform_request = WorldWondersUtilities::TransformRequest
  u.transform_response = WorldWondersUtilities::TransformResponse
}
