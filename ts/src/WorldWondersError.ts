
import { Context } from './Context'


class WorldWondersError extends Error {

  isWorldWondersError = true

  sdk = 'WorldWonders'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  WorldWondersError
}

