const top = async (token: string, type: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${type}&limit=50`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    }
  })
  const data = await response.json()
  return data.items.map((artist: any) => artist.name)
}
const get = async (token: string) => {
  const reponse = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    }
  })
  const data = await reponse.json()
  return data.display_name
}

export async function POST({ request }: { request: Request }) {
  const json = await request.json()
  const token = json.code
  const time = json.selected

  const artists = await top(token, time)
  const name = await get(token)

  return new Response(JSON.stringify({ name, artists }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
