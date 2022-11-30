const FAILURE = new Response('failure', {
  status: 400,
})

export async function POST({ params, request }: any) {

  const body = await request.json()

  if (body === null) return FAILURE
  if (params.state === null) return FAILURE

  const code = body.code

  const clientSecret = 'REPLACE API CLIENT SECRET HERE'
  const clientId = 'REPLACE API CLIENT ID HERE'

  const token = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:3000/confirm',
    }),
  })

  console.log(token)

  return new Response('Hello world!', {
    status: 200,
  })
}
