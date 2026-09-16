# WorldWonders SDK feature factory

from worldwonders_sdk.feature.base_feature import WorldWondersBaseFeature
from worldwonders_sdk.feature.ratelimit_feature import WorldWondersRatelimitFeature
from worldwonders_sdk.feature.retry_feature import WorldWondersRetryFeature
from worldwonders_sdk.feature.test_feature import WorldWondersTestFeature
from worldwonders_sdk.feature.timeout_feature import WorldWondersTimeoutFeature


_FEATURES = {
    "base": lambda: WorldWondersBaseFeature(),
    "ratelimit": lambda: WorldWondersRatelimitFeature(),
    "retry": lambda: WorldWondersRetryFeature(),
    "test": lambda: WorldWondersTestFeature(),
    "timeout": lambda: WorldWondersTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
