import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import '@/app/style.css'
import { useDashboardStore } from '@/stores/dashboard'
import { startMockWorker } from '@/mocks/browser'

async function bootstrap() {
  // 可选：启用 MSW 拦截 /api/* 请求（默认关闭，直接走前端 mock）
  if (import.meta.env.VITE_USE_MSW === 'true') {
    await startMockWorker()
  }

  const app = createApp(App)
  app.use(createPinia())
  app.mount('#app')

  // 启动实时数据
  useDashboardStore().start()
}

bootstrap()
