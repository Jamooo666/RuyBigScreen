import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../docs/screenshots/dashboard.png')
const url = process.env.DASHBOARD_URL || 'http://localhost:5173'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.goto(url, { waitUntil: 'networkidle' })
// 等待首屏渲染与实时数据滚动
await page.waitForTimeout(2500)
await page.screenshot({ path: out })
await browser.close()
console.log('[capture] 截图已保存:', out)
