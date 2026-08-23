<script setup lang="ts">
type ServerState = 'loading' | 'online' | 'offline'

interface ServerStatusResponse {
  online?: boolean
  players?: {
    online?: number
    max?: number
  }
}

const props = withDefaults(defineProps<{
  host: string
  port?: number
}>(), {
  port: 25565
})

const state = ref<ServerState>('loading')
const playerCount = ref<{ online: number; max: number } | null>(null)

const statusText = computed(() => {
  if (state.value === 'loading') {
    return `${props.host} - 查询中...`
  }

  if (state.value === 'online' && playerCount.value) {
    return `${props.host} - 玩家: ${playerCount.value.online}/${playerCount.value.max}`
  }

  return `${props.host} - 离线`
})

const fetchServerStatus = async () => {
  state.value = 'loading'
  playerCount.value = null

  try {
    const endpoint = new URL('https://api.eqad.fun/mc-status/ping-mc')
    endpoint.searchParams.set('host', props.host)
    endpoint.searchParams.set('port', String(props.port))

    const response = await fetch(endpoint.toString())
    if (!response.ok) {
      throw new Error('Network Error')
    }

    const data = await response.json() as ServerStatusResponse
    if (!data.online) {
      state.value = 'offline'
      return
    }

    state.value = 'online'
    playerCount.value = {
      online: data.players?.online ?? 0,
      max: data.players?.max ?? 0
    }
  } catch {
    state.value = 'offline'
  }
}

onMounted(fetchServerStatus)
</script>

<template>
  <div class="server-status" :class="state" role="status" :aria-label="statusText">
    <div class="server-status-content">
      <div class="server-status-details">
        <div class="server-status-title">
          <span class="status-indicator" :class="state" aria-hidden="true"></span>
          {{ statusText }}
        </div>
      </div>
    </div>
  </div>
</template>
