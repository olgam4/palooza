import { useLocation } from 'solid-start'

export default function() {
  createEffect(() => {
    const usable = new URLSearchParams(useLocation().search)

    fetch('/api/confirm', {
      method: 'POST',
      body: JSON.stringify({
        code: usable.get('code')
      }),
    })
  })

  return (
    <div>
      <Title>Palooza - Spotify</Title>
      <p>Loading...</p>
    </div>
  )
}
