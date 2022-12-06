import { XAPIKEY } from '$env/static/private'

export async function GET({ url }) {
  const param = String(url.searchParams.get('prefs'))

  try {
    const res = await fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${param}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': XAPIKEY
      }
    })
    const resBody = await res.body
    return await new Response(resBody, {status: 200})
  } catch (e) {
    return await new Response(JSON.stringify(e), {status: 400})
  }
}
