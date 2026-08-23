<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PageBreadcrumbs from '~/components/PageBreadcrumbs.vue'
import PageHeader from '~/components/PageHeader.vue'

useHead({
  title: '服务状态 - EQAD Network',
  meta: [
    {
      name: 'description',
      content: '查看 EQAD Network 各服务节点的实时运行状态和历史可用性。'
    }
  ]
})

const SERVICE_API_URL = 'https://api.eqad.fun/mcsm/api/services'
const AVAILABILITY_API_URL = 'https://api.eqad.fun/monitor'
const MAX_HISTORY_POINTS = 96
const NODE_LIST = ['EQAD-001', 'EQAD-002', 'EQAD-003']
const NODE_CPU_INFO: Record<string, string> = {
  'EQAD-001': 'AMD Ryzen 9 9900X',
  'EQAD-002': 'Intel Core i9-13900K',
  'EQAD-003': 'AMD Ryzen 7 5800X'
}

type RequestState = 'loading' | 'ready' | 'error'
type StatusTab = 'details' | 'history'
type NodeCardState = 'loading' | 'online' | 'offline'

interface ServiceNode {
  nickname?: string
  system?: {
    type?: string
    cpuUsage?: number
    memUsage?: number
    loadavg?: number[]
    totalmem?: number
  }
  instance?: {
    running?: number
    total?: number
  }
  timestamp?: string | number
}

interface AvailabilityPoint {
  time?: string | number
  status?: string
}

interface NodeCard {
  name: string
  state: NodeCardState
  node?: ServiceNode
}

interface AvailabilitySegment {
  key: string
  type: 'none' | 'online' | 'down'
  time?: string
  statusText: string
}

interface AvailabilityCard {
  name: string
  uptime: string
  color: string
  segments: AvailabilitySegment[]
}

const activeTab = ref<StatusTab>('details')
const nodeRequestState = ref<RequestState>('loading')
const availabilityRequestState = ref<RequestState>('loading')
const nodes = ref<ServiceNode[]>([])
const availabilityHistory = ref<Record<string, AvailabilityPoint[]>>({})
let refreshTimer: ReturnType<typeof setInterval> | undefined

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const formatBytes = (bytes: number | undefined, decimals = 2) => {
  if (bytes === undefined || !Number.isFinite(bytes)) {
    return '-'
  }

  if (bytes === 0) {
    return '0 Bytes'
  }

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const index = Math.floor(Math.log(bytes) / Math.log(1024))
  const decimalPlaces = decimals < 0 ? 0 : decimals

  return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(decimalPlaces))} ${sizes[index] ?? 'Bytes'}`
}

const formatTimestamp = (timestamp: string | number | undefined) => {
  if (timestamp === undefined || timestamp === '') {
    return '-'
  }

  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const formatLoadAverage = (loadavg: number[] | undefined) => {
  if (!loadavg || loadavg.length < 3 || !loadavg.slice(0, 3).every(Number.isFinite)) {
    return '-'
  }

  return loadavg.slice(0, 3).map(value => value.toFixed(2)).join(', ')
}

const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} 分钟`
  }

  const hours = minutes / 60
  if (hours < 24) {
    return `${hours % 1 === 0 ? hours : hours.toFixed(1)} 小时`
  }

  const days = minutes / 1440
  return `${days % 1 === 0 ? days : days.toFixed(1)} 天`
}

const usagePercent = (usage: number | undefined) => {
  if (usage === undefined || !Number.isFinite(usage)) {
    return 0
  }

  return Math.min(Math.max(usage * 100, 0), 100)
}

const formatUsagePercent = (usage: number | undefined) => `${usagePercent(usage).toFixed(1)}%`

const progressStyle = (usage: number | undefined) => {
  const percent = usagePercent(usage)

  return {
    width: `${percent}%`,
    ...(percent > 80 ? { backgroundColor: '#e74c3c' } : {})
  }
}

const progressStyleForCard = (state: NodeCardState, usage: number | undefined) => {
  if (state === 'offline') {
    return { width: '0%' }
  }

  return state === 'online' ? progressStyle(usage) : undefined
}

const nodeCards = computed<NodeCard[]>(() => {
  const nodeMap = new Map<string, ServiceNode>(
    nodes.value
      .filter(node => Boolean(node.nickname))
      .map(node => [node.nickname as string, node] as [string, ServiceNode])
  )

  return NODE_LIST.map(name => {
    const node = nodeMap.get(name)

    return {
      name,
      state: nodeRequestState.value === 'loading' ? 'loading' : node ? 'online' : 'offline',
      node
    }
  })
})

const availabilityCards = computed<AvailabilityCard[]>(() => {
  const names = [...new Set([...NODE_LIST, ...Object.keys(availabilityHistory.value)])]
  const cards: AvailabilityCard[] = []

  names.forEach(name => {
    const history = (availabilityHistory.value[name] ?? []).slice(-MAX_HISTORY_POINTS)
    if (history.length === 0) {
      return
    }

    const onlineCount = history.filter(point => point.status === 'online').length
    const uptimeValue = (onlineCount / history.length) * 100
    const uptime = uptimeValue.toFixed(1)
    const color = uptimeValue <= 20 ? '#e74c3c' : uptimeValue < 90 ? '#dfb50d' : '#2ecc71'
    const emptyPoints = Math.max(MAX_HISTORY_POINTS - history.length, 0)
    const segments: AvailabilitySegment[] = []

    for (let index = 0; index < emptyPoints; index += 1) {
      segments.push({
        key: `${name}-empty-${index}`,
        type: 'none',
        statusText: '无数据'
      })
    }

    history.forEach((point, index) => {
      const isOnline = point.status === 'online'
      segments.push({
        key: `${name}-${index}-${point.time ?? 'unknown'}`,
        type: isOnline ? 'online' : 'down',
        time: formatTimestamp(point.time),
        statusText: isOnline ? '正常' : '离线'
      })
    })

    cards.push({ name, uptime, color, segments })
  })

  return cards
})

const fetchNodeData = async (isAutoRefresh = false) => {
  if (!isAutoRefresh) {
    nodeRequestState.value = 'loading'
  }

  try {
    const response = await fetch(SERVICE_API_URL)
    if (!response.ok) {
      throw new Error('服务状态请求失败')
    }

    const payload = await response.json() as { status?: number; data?: unknown }
    nodes.value = payload.status === 200 && Array.isArray(payload.data)
      ? payload.data.filter(isRecord) as ServiceNode[]
      : []
    nodeRequestState.value = 'ready'
  } catch {
    nodes.value = []
    nodeRequestState.value = 'error'
  }
}

const fetchAvailability = async (isAutoRefresh = false) => {
  if (!isAutoRefresh) {
    availabilityRequestState.value = 'loading'
  }

  try {
    const response = await fetch(AVAILABILITY_API_URL)
    if (!response.ok) {
      throw new Error('历史状态请求失败')
    }

    const payload = await response.json()
    if (!isRecord(payload)) {
      throw new Error('历史状态数据格式错误')
    }

    const history: Record<string, AvailabilityPoint[]> = {}
    Object.entries(payload).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        history[name] = value.filter(isRecord) as AvailabilityPoint[]
      }
    })

    availabilityHistory.value = history
    availabilityRequestState.value = 'ready'
  } catch {
    availabilityHistory.value = {}
    availabilityRequestState.value = 'error'
  }
}

const switchTab = (tab: StatusTab) => {
  if (activeTab.value === tab) {
    return
  }

  activeTab.value = tab
  if (tab === 'details') {
    fetchNodeData()
  } else {
    fetchAvailability()
  }
}

onMounted(() => {
  fetchNodeData()
  fetchAvailability()

  refreshTimer = setInterval(() => {
    if (activeTab.value === 'details') {
      fetchNodeData(true)
    } else {
      fetchAvailability(true)
    }
  }, 60000)
})

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})
</script>

<template>
  <div class="service-status-page">
    <PageHeader title="服务状态" subtitle="Server status" />
    <PageBreadcrumbs :items="[{ label: '服务状态' }]" />

    <div class="basic-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="status-pagination-ctrl" role="tablist" aria-label="服务状态内容">
              <button
                id="status-tab-details"
                class="page-btn"
                :class="{ active: activeTab === 'details' }"
                type="button"
                role="tab"
                :aria-selected="activeTab === 'details'"
                aria-controls="status-page-1"
                @click="switchTab('details')"
              >
                详细状态
              </button>
              <button
                id="status-tab-history"
                class="page-btn"
                :class="{ active: activeTab === 'history' }"
                type="button"
                role="tab"
                :aria-selected="activeTab === 'history'"
                aria-controls="status-page-2"
                @click="switchTab('history')"
              >
                历史状态
              </button>
            </div>

            <Transition name="status-panel" mode="out-in">
              <section
                v-if="activeTab === 'details'"
                id="status-page-1"
                key="details"
                class="status-page active"
                role="tabpanel"
                aria-labelledby="status-tab-details"
              >
              <div class="node-container">
                <article v-for="card in nodeCards" :key="card.name" class="node-card">
                  <div class="node-header">
                    <div class="node-title">{{ card.name }}</div>
                  </div>

                  <div class="info-sections">
                    <div class="info-section">
                      <div class="info-title">系统信息</div>
                      <div class="info-grid">
                        <div class="info-item">
                          <div class="info-label">系统类型</div>
                          <div class="info-value" :class="{ 'loading-text': card.state === 'loading' }">
                            <template v-if="card.state === 'loading'">&nbsp;</template>
                            <template v-else>{{ card.node?.system?.type || '-' }}</template>
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">CPU</div>
                          <div class="info-value" :class="{ 'loading-text': card.state === 'loading' }">
                            <template v-if="card.state === 'loading'">&nbsp;</template>
                            <template v-else>{{ NODE_CPU_INFO[card.name] || '-' }}</template>
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">实例总数</div>
                          <div class="info-value" :class="{ 'loading-text': card.state === 'loading' }">
                            <template v-if="card.state === 'loading'">&nbsp;</template>
                            <template v-else>
                              {{ card.node?.instance?.running ?? '-' }}/{{ card.node?.instance?.total ?? '-' }}
                            </template>
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">服务器时间</div>
                          <div class="info-value" :class="{ 'loading-text': card.state === 'loading' }">
                            <template v-if="card.state === 'loading'">&nbsp;</template>
                            <template v-else>{{ formatTimestamp(card.node?.timestamp) }}</template>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="info-section">
                      <div class="info-title">系统资源</div>
                      <div class="info-grid">
                        <div class="info-item">
                          <div class="info-label">CPU 使用率</div>
                          <div class="info-value" :class="{ 'loading-text': card.state === 'loading' }">
                            <template v-if="card.state === 'loading'">&nbsp;</template>
                            <template v-else-if="card.state === 'offline'">-</template>
                            <template v-else>{{ formatUsagePercent(card.node?.system?.cpuUsage) }}</template>
                          </div>
                          <div class="progress-container">
                            <div
                              class="progress-bar"
                              :class="{ 'loading-bar': card.state === 'loading' }"
                              :style="progressStyleForCard(card.state, card.node?.system?.cpuUsage)"
                            ></div>
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">内存使用率</div>
                          <div class="info-value" :class="{ 'loading-text': card.state === 'loading' }">
                            <template v-if="card.state === 'loading'">&nbsp;</template>
                            <template v-else-if="card.state === 'offline'">-</template>
                            <template v-else>{{ formatUsagePercent(card.node?.system?.memUsage) }}</template>
                          </div>
                          <div class="progress-container">
                            <div
                              class="progress-bar"
                              :class="{ 'loading-bar': card.state === 'loading' }"
                              :style="progressStyleForCard(card.state, card.node?.system?.memUsage)"
                            ></div>
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">系统负载</div>
                          <div class="info-value" :class="{ 'loading-text': card.state === 'loading' }">
                            <template v-if="card.state === 'loading'">&nbsp;</template>
                            <template v-else>{{ formatLoadAverage(card.node?.system?.loadavg) }}</template>
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">总内存</div>
                          <div class="info-value" :class="{ 'loading-text': card.state === 'loading' }">
                            <template v-if="card.state === 'loading'">&nbsp;</template>
                            <template v-else>{{ formatBytes(card.node?.system?.totalmem) }}</template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="node-footer">
                    <span
                      class="node-status-indicator"
                      :class="{
                        'status-inloading': card.state === 'loading',
                        'status-online': card.state === 'online',
                        'status-offline': card.state === 'offline'
                      }"
                    ></span>
                    <span class="node-status-text">
                      {{ card.state === 'loading' ? '正在获取' : card.state === 'online' ? '在线' : '离线' }}
                    </span>
                  </div>
                </article>
              </div>
              </section>

              <section
                v-else
                id="status-page-2"
                key="history"
                class="status-page active"
                role="tabpanel"
                aria-labelledby="status-tab-history"
              >
              <div v-if="availabilityRequestState === 'loading'" class="availability-container">
                <div v-for="nodeName in NODE_LIST" :key="nodeName" class="uptime-card">
                  <div class="uptime-header">
                    <div class="uptime-title">{{ nodeName }}</div>
                    <div class="uptime-pct loading-text" style="width: 50px;">&nbsp;</div>
                  </div>
                  <div class="uptime-bar">
                    <div class="loading-bar" style="height: 100%; border-radius: 3px;"></div>
                  </div>
                  <div class="uptime-footer">
                    <span>{{ formatDuration(MAX_HISTORY_POINTS * 15) }}前</span>
                    <span>最近</span>
                    <span>现在</span>
                  </div>
                </div>
              </div>

              <div v-else-if="availabilityRequestState === 'error'" class="loading">
                加载失败
              </div>

              <div v-else-if="availabilityCards.length === 0" class="loading">
                暂无数据...
              </div>

              <div v-else class="availability-container">
                <div v-for="card in availabilityCards" :key="card.name" class="uptime-card">
                  <div class="uptime-header">
                    <div class="uptime-title">{{ card.name }}</div>
                    <div class="uptime-pct" :style="{ color: card.color }">{{ card.uptime }}%</div>
                  </div>
                  <div class="uptime-bar">
                    <div
                      v-for="segment in card.segments"
                      :key="segment.key"
                      class="uptime-segment"
                      :class="{ down: segment.type === 'down', none: segment.type === 'none' }"
                    >
                      <span class="tooltip-text">
                        <template v-if="segment.type === 'none'">{{ segment.statusText }}</template>
                        <template v-else>{{ segment.time }}<br>状态: {{ segment.statusText }}</template>
                      </span>
                    </div>
                  </div>
                  <div class="uptime-footer">
                    <span>{{ formatDuration(MAX_HISTORY_POINTS * 15) }}前</span>
                    <span>最近</span>
                    <span>现在</span>
                  </div>
                </div>
              </div>
              </section>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
