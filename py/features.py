# WorldWonders SDK feature factory

from feature.base_feature import WorldWondersBaseFeature
from feature.test_feature import WorldWondersTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WorldWondersBaseFeature(),
        "test": lambda: WorldWondersTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
