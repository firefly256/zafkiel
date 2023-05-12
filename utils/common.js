export function test(fn, cookies) {
  return new Promise(async (resolve) => {
    const settled = []

    const check = () => {
      if (settled.length === cookies.length) resolve(settled)
    }

    for (let cookie of cookies) {
      let time = 0

      const request = () => {
        time++
        fn(cookie)
          .then((response) => {
            settled.push(response)
            check()
          })
          .catch((error) => {
            if (time > MAX_TIME) {
              settled.push(error)
              check()
            } else {
              // Re-request
              setTimeout(request, 3000)
            }
          })
      }
      request()
    }
  })
}
