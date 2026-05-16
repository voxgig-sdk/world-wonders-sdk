# ProjectName SDK exists test

import pytest
from worldwonders_sdk import WorldWondersSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WorldWondersSDK.test(None, None)
        assert testsdk is not None
