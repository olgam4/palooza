
export function GET() {
  const state = 'someverylongstring'

  const scope = 'user-read-private user-read-email user-top-read'

  const response_type = 'code'

  const redirect_uri = 'https://palooza.glo.quebec/confirm'

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
