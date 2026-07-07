import type { DashboardData } from '@/types/dashboard'

export function ri(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const dashboardData: DashboardData = {
  kpi: [
    { ico: '👁', label: '总访问量', value: 1284560, unit: '', dec: 0, trend: 12.4 },
    { ico: '🟢', label: '在线用户', value: 8642, unit: '', dec: 0, trend: 3.1 },
    { ico: '🛒', label: '今日订单', value: 36890, unit: '', dec: 0, trend: 8.7 },
    { ico: '📈', label: '转化率', value: 42.8, unit: '%', dec: 1, trend: -1.2 },
  ],
  trend: {
    hours: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + ':00'),
    today: Array.from({ length: 24 }, () => ri(200, 900)),
    yest: Array.from({ length: 24 }, () => ri(180, 820)),
  },
  category: [
    { name: '服饰', value: 30 },
    { name: '数码', value: 25 },
    { name: '美妆', value: 18 },
    { name: '食品', value: 15 },
    { name: '家居', value: 12 },
  ],
  channel: [
    { name: 'APP', value: 45 },
    { name: '小程序', value: 28 },
    { name: 'H5', value: 17 },
    { name: 'PC', value: 10 },
  ],
  provinces: {
    北京: 920, 天津: 410, 河北: 530, 山西: 360, 内蒙古: 300, 辽宁: 480,
    吉林: 320, 黑龙江: 350, 上海: 980, 江苏: 870, 浙江: 940, 安徽: 500,
    福建: 560, 江西: 380, 山东: 760, 河南: 690, 湖北: 600, 湖南: 580,
    广东: 1000, 广西: 430, 海南: 240, 重庆: 520, 四川: 720, 贵州: 330,
    云南: 400, 西藏: 150, 陕西: 470, 甘肃: 280, 青海: 180, 宁夏: 200,
    新疆: 260, 台湾: 300, 香港: 420, 澳门: 210,
  },
  cities: [
    { name: '北京', value: 920, coord: [116.4, 39.9] },
    { name: '上海', value: 980, coord: [121.47, 31.23] },
    { name: '广州', value: 880, coord: [113.26, 23.13] },
    { name: '深圳', value: 860, coord: [114.07, 22.62] },
    { name: '成都', value: 720, coord: [104.06, 30.67] },
    { name: '武汉', value: 600, coord: [114.31, 30.59] },
    { name: '西安', value: 470, coord: [108.95, 34.27] },
    { name: '杭州', value: 760, coord: [120.15, 30.28] },
    { name: '重庆', value: 690, coord: [106.55, 29.56] },
    { name: '沈阳', value: 430, coord: [123.43, 41.8] },
  ],
  ranking: [
    { city: '上海', value: 980 }, { city: '北京', value: 920 }, { city: '深圳', value: 860 },
    { city: '广州', value: 880 }, { city: '杭州', value: 760 }, { city: '成都', value: 720 },
    { city: '武汉', value: 600 }, { city: '南京', value: 540 }, { city: '西安', value: 470 },
    { city: '重庆', value: 690 },
  ],
  gauges: [
    { name: '系统负载', value: 62 },
    { name: '转化率', value: 42 },
  ],
}
