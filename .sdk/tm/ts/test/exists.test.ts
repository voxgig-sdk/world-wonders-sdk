
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WorldWondersSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await WorldWondersSDK.test()
    equal(null !== testsdk, true)
  })

})
