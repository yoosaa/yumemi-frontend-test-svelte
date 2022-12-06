import { XAPIKEY } from '$env/static/private'

export async function load() {
  try {
    const res = await fetch(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
      method: 'GET',
      headers: {
        'X-API-KEY': XAPIKEY
      }
    })
    const prefectures = await res.json()
    return await prefectures
  } catch (e) {
    throw new Error(`Error! ${e}`)
  }
}