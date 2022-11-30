import { useLocation, useNavigate } from 'solid-start'

export default function() {
  createEffect(async () => {
    const usable = new URLSearchParams(useLocation().search)
    const navigator = useNavigate()

    const response = await fetch('/api/confirm', {
      method: 'POST',
      body: JSON.stringify({
        code: usable.get('code')
      }),
    })

    const data = await response.text()
    const accessToken = data

    localStorage.setItem('access_token', accessToken)
    navigator('/')
  })

  return (
    <div>
      <Title>Palooza - Spotify</Title>
      <p>Loading...</p>
    </div>
  )
}
