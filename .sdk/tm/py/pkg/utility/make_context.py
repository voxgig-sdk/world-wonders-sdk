# WorldWonders SDK utility: make_context

from projectname_sdk.core.context import WorldWondersContext


def make_context_util(ctxmap, basectx):
    return WorldWondersContext(ctxmap, basectx)
