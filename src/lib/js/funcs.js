import axios from 'axios'

export const getData = async endpoint => {
  const axiosConfig = {
    headers: {
      'X-API-KEY': import.meta.env.VITE_XAPIKEY
    }
  }
  const res = await axios.get(endpoint, axiosConfig)

  if (res.status === 200) return res.data.result
  else throw new Error(res.data.message)
}