class MyPromise {
  constructor(callback) {
    this.onCatch = null
    this.onFinally = null
    this.thenCallbacks = []
    this.isRejected = false
    function resolver(data) {
      if (this.isRejected) return
      this.thenCallbacks.forEach(callbackItem => {
        data = callbackItem(data)
      });
      if (this.onFinally) {
        this.onFinally()
      }
    }
    function rejecter(error) {
      this.isRejected = true
      if (this.onCatch) {
        this.onCatch(error)
      }
      if (this.onFinally) {
        this.onFinally()
      }
    }
    callback(resolver.bind(this), rejecter.bind(this))

  }
  then(cb) {
    this.thenCallbacks.push(cb)
    return this
  }

  catch(cb) {
    this.onCatch = cb
    return this
  }

  finally(cb) {
    this.onFinally = cb
    return this
  }
}

const promise = new MyPromise((resolver, rejecter) => {
  setTimeout(() => {
    rejecter('Custom error')
    resolver(10)
  }, 2000)
})
promise
  .then(num => num *= 2)
  .catch(error => console.error(error))
  .then(num => num *= 3)
  .finally(() => console.log('finally'))
  .then((num) => console.log(num))