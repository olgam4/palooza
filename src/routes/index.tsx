import sunset from '@assets/sunset.svg'

export default function() {
  const [artists, setArtists] = createSignal<string[]>([])
  const [firstDay, setFirstDay] = createSignal<string[]>([])
  const [secondDay, setSecondDay] = createSignal<string[]>([])
  const [thirdDay, setThirdDay] = createSignal<string[]>([])
  const [name, setName] = createSignal('')

  createEffect(on(artists, async () => {
    const artistsL = [...artists()]

    const firstDay = []
    const secondDay = []
    const thirdDay = []

    console.log(artistsL)

    for (let i = 0; i < artistsL.length; i += 3) {
      firstDay.push(artistsL[i])
    }
    for (let i = 1; i < artistsL.length; i += 3) {
      secondDay.push(artistsL[i])
    }
    for (let i = 2; i < artistsL.length; i += 3) {
      thirdDay.push(artistsL[i])
    }

    console.log(firstDay, secondDay, thirdDay)

    setFirstDay(firstDay)
    setSecondDay(secondDay)
    setThirdDay(thirdDay)
  }))

  const getData = async () => {
    const selected = document.querySelector('input[name="type"]:checked')!.value

    const data = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({
        code: localStorage.getItem('access_token'),
        selected,
      }),
    })
    const json = await data.json()

    setArtists(json.artists)
    setName(json.name)
  }

  return (
    <div class="flex flex-center full flex-col space-y-2">
      <Title>Palooza - Generate</Title>
      <a href="/api/login">
        login
      </a>

      <button onClick={getData}>
        get data
      </button>

      <input type="radio" name="type" id="4weeks" value="short_term" />
      <label for="4weeks">4weeks</label>
      <input type="radio" name="type" id="6months" value="medium_term" />
      <label for="6months">6months</label>
      <input type="radio" name="type" id="longterm" value="long_term" />
      <label for="longterm">longterm</label>

      <div class="absolute font-black text-white uppercase text-center space-y-6 top-96 right-[40px] w-[800px]">
        <h1>{name()}palooza</h1>
        <For each={(() => [firstDay, secondDay, thirdDay])()}>
          {day => (
            <>
              <div class="text-7xl">
                <For each={day()}>
                  {(artist, index) => (
                    <Show when={index() === 0}>
                      <span>{artist}</span>
                    </Show>
                  )}
                </For>
              </div>
              <div class="text-4xl space-x-6">
                <For each={day()}>
                  {(artist, index) => (
                    <Show when={index() < 4 && index() !== 0}>
                      <span>{artist}</span>
                    </Show>
                  )}
                </For>
              </div>
              <div class="text-lg space-x-2">
                <For each={day()}>
                  {(artist, index) => (
                    <Show when={index() >= 4}>
                      <span>{artist}</span>
                    </Show>
                  )}
                </For>
              </div>
            </>
          )}
        </For>
      </div>
      <Show when={name()}>
        <p>{name()}palooza</p>
      </Show>
      <img src={sunset} />
    </div>
  )
}
