import axios from 'axios'

const { COOKIES } = process.env

const headers = {}

const SIGN = { methods: 'GET', url: '', headers }

const MAX_TIME = 3

const het = (cookie) => {
  return axios.request({ cookie })
}

const main = async () => {
  if (!COOKIES) {
    console.log('Please configure cookie !')
    return
  }

  const cookies = COOKIES.split('|').filter((each) => !!each)

  const userMap = new Map()

  // Get user informaions
  await new Promise(async (resolve) => {
    const settled = []

    const check = () => {
      if (settled.length === cookies.length) resolve(settled)
    }

    for (let cookie of cookies) {
      let time = 0

      const request = () => {
        time++
        het(cookie)
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

  console.log('Completion of execution!')
}

main()
