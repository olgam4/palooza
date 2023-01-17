import bg from '@assets/bg.jpg'
import spotify from '@assets/spotify.png'

export default function() {
  const [isLogged, setIsLogged] = createSignal(false)
  const [artists, setArtists] = createSignal<string[]>([])
  const [firstDay, setFirstDay] = createSignal<string[]>([])
  const [secondDay, setSecondDay] = createSignal<string[]>([])
  const [thirdDay, setThirdDay] = createSignal<string[]>([])
  const [name, setName] = createSignal('')
  const [days, setDays] = createSignal<string[]>([])
  const [daysOfWeek, setDaysOfWeek] = createSignal<string[]>([])

  createEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dayAfterTomorrow = new Date(tomorrow)
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1)

    const todayString = today.toDateString().split(' ').slice(1, 3).join(' ')
    const tomorrowString = tomorrow.toDateString().split(' ').slice(1, 3).join(' ')
    const dayAfterTomorrowString = dayAfterTomorrow.toDateString().split(' ').slice(1, 3).join(' ')

    setDays([todayString, tomorrowString, dayAfterTomorrowString])
    setDaysOfWeek([today.toDateString().split(' ')[0], tomorrow.toDateString().split(' ')[0], dayAfterTomorrow.toDateString().split(' ')[0]])
  })

  createEffect(() => {
    const { now } = JSON.parse(localStorage.getItem('access_token') || '{}')
    if ((new Date() - now) < (3600 * 1000)) {
      setIsLogged(true)
    }

  })

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
    <div class="flex flex-col sm:flex-row flex-center full space-x-2">
      <Title>Palooza - Generate</Title>
      <div class="flex justify-center items-center space-x-5">
        <Show when={!isLogged()}
          fallback={() => (
            <button class="px-4 py-2 bg-[#FEA98B] rounded" onClick={getData}>
              Generate
            </button>
          )}
        >
          <a class="px-4 py-2 bg-[#FEA98B] rounded" href="/api/login">
            Login
          </a>
        </Show>
        <fieldset id="type" class="space-x-3">
          <input type="radio" name="type" id="4weeks" value="short_term" />
          <label for="4weeks">Last 4 weeks</label>
          <input type="radio" name="type" id="6months" value="medium_term" />
          <label for="6months">Last 6 months</label>
          <input type="radio" name="type" id="longterm" value="long_term" />
          <label for="longterm">All time</label>
        </fieldset>
      </div>

      <div id="poster" class="relative w-[600px]">
        <div class="absolute left-[50px] w-[500px] h-[1016px] text-[#FEA98B] font-black top-4 uppercase text-center flex flex-col justify-around">
          <div>
            <h1 class="sm:text-7xl nerko">{name()}palooza</h1>
            <h2 class="text-sm text-gray-400">Presented by palooza.glo.quebec</h2>
          </div>
          <For each={(() => [firstDay, secondDay, thirdDay])()}>
            {day => (
              <div class={`${day() === firstDay() ? 'text-gray-600' : day() === secondDay() ? 'text-gray-50' : 'text-gray-600'}`}>
                <div class="relative">
                  <p class="absolute right-0 top-3">{days()[day() === firstDay() ? 0 : day() === secondDay() ? 1 : 2]}</p>
                  <p class="absolute left-0 top-3">{daysOfWeek()[day() === firstDay() ? 0 : day() === secondDay() ? 1 : 2]}</p>
                  <div class="flex flex-col space-y-2">
                    <div class="text-5xl">
                      <For each={day()}>
                        {(artist, index) => (
                          <Show when={index() === 0}>
                            <span>{artist}</span>
                          </Show>
                        )}
                      </For>
                    </div>
                    <div class="text-xl space-x-6">
                      <For each={day()}>
                        {(artist, index) => (
                          <Show when={index() < 4 && index() !== 0}>
                            <span>{artist}</span>
                          </Show>
                        )}
                      </For>
                    </div>
                    <div class="text-base space-x-2">
                      <For each={day()}>
                        {(artist, index) => (
                          <Show when={index() >= 4}>
                            <span>{artist}</span>
                          </Show>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
        <img src={bg} width="600px" class="border-2" />
        <img src={spotify} width="50" class="absolute bottom-6 left-6" />
      </div>
    </div>
  )
}
