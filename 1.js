const x = (arr) => {
  return new Promise((resolve) => {
    const result = []
    const settled = new Proxy(result, {
      set() {
        Reflect.set(...arguments)
        if (settled.length === arr.length) resolve(result)
      }
    })

    for (let item of arr) {
      const wrap = (value) => {
        checkNum(value)
          .then((response) => {
            console.log('item :>> ', item)
            settled.push({ old: item, new: response })
          })
          .catch((error) => {
            wrap(error)
          })
      }

      wrap(item)
    }
  })
}

const checkNum = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num > 5) {
        resolve(num)
      } else {
        reject(num + 1)
      }
    }, 1000)
  })
}

x([4]).then((res) => {
  console.log('end :>> ', res)
})
