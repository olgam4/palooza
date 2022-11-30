import { useLocation } from 'solid-start'

export default function() {
  createEffect(async () => {
    const usable = new URLSearchParams(useLocation().search)

    const response = await fetch('/api/confirm', {
      method: 'POST',
      body: JSON.stringify({
        code: usable.get('code')
      }),
    })

    console.log(await response.json())
  })

  return (
    <div>
      <Title>Palooza - Spotify</Title>
      <p>Loading...</p>
    </div>
  )
}
