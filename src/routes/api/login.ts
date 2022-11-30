
export function GET() {
  const state = 'someverylongstring'

  const scope = 'user-read-private user-read-email'

  const response_type = 'code'

  const redirect_uri = 'http://localhost:3000/confirm'

  const client_id = 'REPLACE API CLIENT ID HERE'

  const Location = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
    client_id,
    response_type,
    redirect_uri,
    scope,
    state,
  })

  return new Response(null, {
    status: 302,
    headers: {
      Location,
    },
  })
}
