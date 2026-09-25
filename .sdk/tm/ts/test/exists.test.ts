
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WorldWondersSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WorldWondersSDK.test()
    equal(testsdk instanceof WorldWondersSDK, true,
      'WorldWondersSDK.test() must return a client synchronously')
  })

})
