import { Link } from '@solidjs/router'

export default function() {
  return (
    <div>
      <Title>404</Title>
      <div class="full flex-center flex-col bg-gray-100/75 text-gray-400 dark:bg-gray-800">
        <h1 class="text-4xl font-extrabold">404</h1>
        <div class="flex space-x-1 mt-1">
          <p>Page not found</p>
          <div class="pt-1">
            <div class="i-carbon-face-dissatisfied-filled h-4 w-4" />
          </div>
        </div>
        <Link href="/" class="flex items-center space-x-1 mt-4 transition hover:(text-gray-400/40)">
          <div class="i-carbon-arrow-left h-7 w-7" />
          <span class="font-extrabold">
            Go back home
          </span>
        </Link>
      </div>
    </div>
  )
}
