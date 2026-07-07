import { setupWorker } from 'msw/browser'
import { dashboardHandlers } from './handlers'

const worker = setupWorker(...dashboardHandlers)

export async function startMockWorker() {
  await worker.start({ onUnhandledRequest: 'bypass' })
  console.info('[mocks] MSW worker started')
}
