/* ============================================================
 * 大鹏诡屏 DaPengHorror · main-horror.js（恐怖猎奇主题）
 * 纯前端 Mock + ECharts，等比缩放适配，实时动效。
 * ========================================================== */

const charts = [];
const hasEcharts = typeof echarts !== "undefined";

/* ---------- 1. 等比缩放适配 ---------- */
function fitScreen() {
  const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  document.getElementById("screen").style.transform = `translate(-50%, -50%) scale(${s})`;
}
window.addEventListener("resize", () => {
  fitScreen();
  charts.forEach((c) => c && c.resize());
});
fitScreen();

function fallback(el, msg) {
  el.innerHTML = `<div class="fallback">${msg || "异象无法显形"}</div>`;
}
function initChart(id) {
  const el = document.getElementById(id);
  if (!hasEcharts || !el) { if (el) fallback(el); return null; }
  const c = echarts.init(el);
  charts.push(c);
  return c;
}

/* ---------- 2. 时钟（阴历风格） ---------- */
const weekMap = ["血月", "幽冥", "无常", "噬魂", "惊悚", "魇夜", "终焉"];
function pad(n) { return String(n).padStart(2, "0"); }
function tick() {
  const d = new Date();
  const ds = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${weekMap[d.getDay()]}`;
  const ts = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  document.getElementById("date").textContent = ds;
  document.getElementById("clock").textContent = ts;
  document.getElementById("refreshTime").textContent = "窥探 " + ts;
}
tick();
setInterval(tick, 1000);

/* ---------- 3. Mock 数据（恐怖猎奇） ---------- */
const rnd = (min, max) => Math.random() * (max - min) + min;
const ri = (min, max) => Math.floor(rnd(min, max + 1));

const mock = {
  kpi: [
    { ico: "👁", label: "失踪人口", val: 1342, unit: "", dec: 0, trend: 9.4 },
    { ico: "💀", label: "灵异事件", val: 867, unit: "", dec: 0, trend: 5.6 },
    { ico: "🩸", label: "诅咒触发", val: 213, unit: "", dec: 0, trend: -2.3 },
    { ico: "🕯", label: "存活率", val: 38.6, unit: "%", dec: 1, trend: -4.1 },
  ],
  trend: {
    hours: Array.from({ length: 24 }, (_, i) => pad(i) + ":00"),
    today: Array.from({ length: 24 }, () => ri(20, 200)),
    yest: Array.from({ length: 24 }, () => ri(15, 180)),
  },
  category: [
    { name: "恶灵", value: 30 }, { name: "怨灵", value: 25 },
    { name: "妖物", value: 18 }, { name: "诅咒", value: 15 }, { name: "未知", value: 12 },
  ],
  channel: [
    { name: "梦境", value: 45 }, { name: "镜像", value: 28 },
    { name: "网络", value: 17 }, { name: "诅咒物", value: 10 },
  ],
  provinces: {
    "北京": 920, "天津": 410, "河北": 530, "山西": 360, "内蒙古": 300, "辽宁": 480,
    "吉林": 320, "黑龙江": 350, "上海": 980, "江苏": 870, "浙江": 940, "安徽": 500,
    "福建": 560, "江西": 380, "山东": 760, "河南": 690, "湖北": 600, "湖南": 580,
    "广东": 1000, "广西": 430, "海南": 240, "重庆": 520, "四川": 720, "贵州": 330,
    "云南": 400, "西藏": 150, "陕西": 470, "甘肃": 280, "青海": 180, "宁夏": 200,
    "新疆": 260, "台湾": 300, "香港": 420, "澳门": 210,
  },
  cities: [
    { name: "北京", value: 920, coord: [116.4, 39.9] },
    { name: "上海", value: 980, coord: [121.47, 31.23] },
    { name: "广州", value: 880, coord: [113.26, 23.13] },
    { name: "深圳", value: 860, coord: [114.07, 22.62] },
    { name: "成都", value: 720, coord: [104.06, 30.67] },
    { name: "武汉", value: 600, coord: [114.31, 30.59] },
    { name: "西安", value: 470, coord: [108.95, 34.27] },
    { name: "杭州", value: 760, coord: [120.15, 30.28] },
    { name: "重庆", value: 690, coord: [106.55, 29.56] },
    { name: "沈阳", value: 430, coord: [123.43, 41.8] },
  ],
  ranking: [
    { city: "上海", val: 980 }, { city: "北京", val: 920 }, { city: "深圳", val: 860 },
    { city: "广州", val: 880 }, { city: "杭州", val: 760 }, { city: "成都", val: 720 },
    { city: "武汉", val: 600 }, { city: "南京", val: 540 }, { city: "西安", val: 470 },
    { city: "重庆", val: 690 },
  ],
  gauges: [{ name: "理智值 SAN", val: 38 }, { name: "诅咒浓度", val: 72 }],
};

const users = ["无名氏", "夜行者", "阿飘", "Ghost", "老槐", "小白", "隔壁老王", "空瞳", "泣女", "迷藏"];
const acts = ["目击黑影", "听见哭声", "离奇失踪", "触发诅咒", "镜中浮现脸", "惊现异象", "收到诡异私信"];

/* ---------- 4. KPI 卡片 + 数字滚动 ---------- */
function renderKpi() {
  const grid = document.getElementById("kpiGrid");
  grid.innerHTML = mock.kpi.map((k, i) => `
    <div class="kpi">
      <div class="ico">${k.ico}</div>
      <div class="label">${k.label}</div>
      <div class="val"><span id="kpi${i}">0</span><span class="unit">${k.unit}</span></div>
      <div class="trend ${k.trend >= 0 ? "up" : "down"}">${k.trend >= 0 ? "▲" : "▼"} ${Math.abs(k.trend)}%</div>
    </div>`).join("");
  mock.kpi.forEach((k, i) => animateValue("kpi" + i, 0, k.val, 1200, k.dec));
}
function animateValue(id, start, end, dur, dec) {
  const el = document.getElementById(id);
  const t0 = performance.now();
  function step(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    const v = start + (end - start) * e;
    el.textContent = dec ? v.toFixed(dec) : Math.floor(v).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
renderKpi();

setInterval(() => {
  mock.kpi.forEach((k, i) => {
    const delta = k.val * rnd(-0.02, 0.025);
    k.val = Math.max(0, k.val + delta);
    k.trend = +(k.trend + rnd(-0.6, 0.6)).toFixed(1);
    const el = document.getElementById("kpi" + i);
    if (el) animateValue("kpi" + i, parseFloat(el.textContent.replace(/,/g, "")) || 0, k.val, 800, k.dec);
    const tr = el.parentElement.parentElement.querySelector(".trend");
    tr.className = "trend " + (k.trend >= 0 ? "up" : "down");
    tr.textContent = (k.trend >= 0 ? "▲ " : "▼ ") + Math.abs(k.trend) + "%";
  });
}, 3000);

/* ---------- 5. 灵异波动趋势 ---------- */
const trendChart = initChart("trendChart");
if (trendChart) {
  trendChart.setOption({
    tooltip: { trigger: "axis" },
    legend: { data: ["今夜", "昨夜"], textStyle: { color: "#c9a8a8" }, top: 0, right: 10 },
    grid: { left: 40, right: 16, top: 36, bottom: 24 },
    xAxis: { type: "category", data: mock.trend.hours, axisLine: { lineStyle: { color: "#5a2020" } },
      axisLabel: { color: "#c9a8a8", interval: 3 } },
    yAxis: { type: "value", splitLine: { lineStyle: { color: "rgba(255,255,255,.06)" } }, axisLabel: { color: "#c9a8a8" } },
    series: [
      { name: "今夜", type: "line", smooth: true, symbol: "none", data: mock.trend.today,
        lineStyle: { color: "#c0102a", width: 2 },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "rgba(192,16,42,.5)" }, { offset: 1, color: "rgba(192,16,42,0)" }]) } },
      { name: "昨夜", type: "line", smooth: true, symbol: "none", data: mock.trend.yest,
        lineStyle: { color: "#8a2be2", width: 2 },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "rgba(138,43,226,.30)" }, { offset: 1, color: "rgba(138,43,226,0)" }]) } },
    ],
  });
  setInterval(() => {
    mock.trend.today.shift(); mock.trend.today.push(ri(20, 200));
    mock.trend.yest.shift(); mock.trend.yest.push(ri(15, 180));
    trendChart.setOption({ series: [{ data: mock.trend.today }, { data: mock.trend.yest }] });
  }, 3000);
}

/* ---------- 6. 怨灵类别占比 环图 ---------- */
const categoryChart = initChart("categoryChart");
if (categoryChart) {
  const palette = ["#c0102a", "#6bff5b", "#8a2be2", "#cfcaba", "#7a0010"];
  categoryChart.setOption({
    color: palette,
    tooltip: { trigger: "item", formatter: "{b}: {c}%" },
    legend: { bottom: 0, textStyle: { color: "#c9a8a8" } },
    series: [{
      type: "pie", radius: ["45%", "70%"], center: ["50%", "45%"], avoidLabelOverlap: false,
      itemStyle: { borderColor: "#1a0303", borderWidth: 2 },
      label: { color: "#e7d2d2", formatter: "{b}\n{c}%" },
      data: mock.category,
    }],
  });
  setInterval(() => {
    mock.category.forEach((c) => (c.value = Math.max(5, c.value + ri(-2, 3))));
    const sum = mock.category.reduce((s, c) => s + c.value, 0);
    mock.category.forEach((c) => (c.value = +((c.value / sum) * 100).toFixed(0)));
    categoryChart.setOption({ series: [{ data: mock.category }] });
  }, 5000);
}

/* ---------- 7. 渗透途径 横向条形 ---------- */
const channelChart = initChart("channelChart");
if (channelChart) {
  channelChart.setOption({
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: 70, right: 30, top: 16, bottom: 10 },
    xAxis: { type: "value", axisLabel: { color: "#c9a8a8" }, splitLine: { lineStyle: { color: "rgba(255,255,255,.06)" } } },
    yAxis: { type: "category", data: mock.channel.map((c) => c.name), axisLine: { lineStyle: { color: "#5a2020" } }, axisLabel: { color: "#e7d2d2" } },
    series: [{
      type: "bar", data: mock.channel.map((c) => c.value), barWidth: 14,
      label: { show: true, position: "right", color: "#e7d2d2", formatter: "{c}%" },
      itemStyle: { borderRadius: 7, color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: "#7a0010" }, { offset: 1, color: "#6bff5b" }]) },
    }],
  });
  setInterval(() => {
    mock.channel.forEach((c) => (c.value = Math.max(3, c.value + ri(-2, 3))));
    channelChart.setOption({ series: [{ data: mock.channel.map((c) => c.value) }] });
  }, 5000);
}

/* ---------- 8. 仪表盘：理智值 / 诅咒浓度 ---------- */
function gaugeOpt(name, val, color) {
  return {
    series: [{
      type: "gauge", radius: "92%", center: ["50%", "58%"], startAngle: 210, endAngle: -30,
      min: 0, max: 100, progress: { show: true, width: 10, itemStyle: { color } },
      axisLine: { lineStyle: { width: 10, color: [[1, "rgba(255,255,255,.12)"]] } },
      axisTick: { show: false }, splitLine: { length: 8, lineStyle: { color: "#5a2020" } },
      axisLabel: { color: "#b58a8a", fontSize: 10, distance: 12 },
      pointer: { width: 4, itemStyle: { color } },
      anchor: { show: true, size: 8, itemStyle: { color } },
      title: { offsetCenter: [0, "32%"], color: "#e7d2d2", fontSize: 13 },
      detail: { valueAnimation: true, color: "#fff", fontSize: 22, offsetCenter: [0, "0%"], formatter: "{value}%" },
      data: [{ value: val, name }],
    }],
  };
}
const g1 = initChart("gauge1"), g2 = initChart("gauge2");
if (g1) g1.setOption(gaugeOpt(mock.gauges[0].name, mock.gauges[0].val, "#c0102a"));
if (g2) g2.setOption(gaugeOpt(mock.gauges[1].name, mock.gauges[1].val, "#8a2be2"));
setInterval(() => {
  mock.gauges[0].val = Math.round(Math.min(95, Math.max(5, mock.gauges[0].val + rnd(-6, 5))));
  mock.gauges[1].val = Math.round(Math.min(98, Math.max(20, mock.gauges[1].val + rnd(-4, 6))));
  if (g1) g1.setOption({ series: [{ data: [{ value: mock.gauges[0].val, name: mock.gauges[0].name }] }] });
  if (g2) g2.setOption({ series: [{ data: [{ value: mock.gauges[1].val, name: mock.gauges[1].name }] }] });
}, 3000);

/* ---------- 9. 城市灵异榜 TOP10 ---------- */
function renderRanking() {
  const max = Math.max(...mock.ranking.map((r) => r.val));
  const rows = mock.ranking
    .slice().sort((a, b) => b.val - a.val)
    .map((r, i) => `
      <div class="rank-row">
        <div class="no ${i < 3 ? "top" : ""}">${i + 1}</div>
        <div class="city">${r.city}</div>
        <div class="meter"><i style="width:${(r.val / max * 100).toFixed(1)}%"></i></div>
        <div class="num">${r.val}</div>
      </div>`).join("");
  document.getElementById("rankTrack").innerHTML = rows + rows;
}
renderRanking();
setInterval(() => {
  mock.ranking.forEach((r) => (r.val = Math.max(100, r.val + ri(-30, 40))));
  renderRanking();
}, 4000);

/* ---------- 10. 诡异动态日志 ---------- */
function pushLog() {
  const list = document.getElementById("logList");
  const u = users[ri(0, users.length - 1)];
  const a = acts[ri(0, acts.length - 1)];
  const c = mock.cities[ri(0, mock.cities.length - 1)].name;
  const d = new Date();
  const t = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const item = document.createElement("div");
  item.className = "log-item";
  item.innerHTML = `<span class="t">${t}</span>用户 <span class="u">${u}</span> 在 <b>${c}</b> ${a}`;
  list.prepend(item);
  while (list.children.length > 9) list.removeChild(list.lastChild);
}
setInterval(pushLog, 2000);

/* ---------- 11. 中国灵异分布地图 ---------- */
const mapChart = initChart("mapChart");
if (mapChart) {
  mapChart.showLoading({ text: "怨气汇聚中...", textColor: "#c0102a", maskColor: "rgba(10,2,2,.6)" });
  fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
    .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then((geo) => {
      echarts.registerMap("china", geo);
      mapChart.hideLoading();
      const bj = [116.4, 39.9];
      const lines = mock.cities.filter((c) => c.name !== "北京").map((c) => ({ coords: [bj, c.coord] }));
      mapChart.setOption({
        tooltip: { trigger: "item", formatter: (p) => p.name + "：怨气 " + (mock.provinces[p.name] ?? p.value ?? "-") },
        visualMap: { min: 100, max: 1000, left: 16, bottom: 16, calculable: true,
          textStyle: { color: "#c9a8a8" }, inRange: { color: ["#1a0303", "#7a0010", "#c0102a"] } },
        geo: { map: "china", roam: false, label: { show: false },
          itemStyle: { areaColor: "rgba(18,4,4,.6)", borderColor: "rgba(192,16,42,.4)" },
          emphasis: { itemStyle: { areaColor: "rgba(192,16,42,.3)" }, label: { color: "#fff" } } },
        series: [
          { name: "怨气", type: "map", geoIndex: 0, data: Object.entries(mock.provinces).map(([name, value]) => ({ name, value })) },
          { name: "怨气流动", type: "lines", coordinateSystem: "geo", zlevel: 2,
            effect: { show: true, period: 5, trailLength: 0.4, color: "#6bff5b", symbol: "arrow", symbolSize: 6 },
            lineStyle: { color: "#6bff5b", width: 1, opacity: 0.6, curveness: 0.3 }, data: lines },
          { name: "现世", type: "effectScatter", coordinateSystem: "geo", zlevel: 3,
            rippleEffect: { brushType: "stroke", scale: 4 }, symbolSize: (v) => 6 + v[2] / 90,
            itemStyle: { color: "#c0102a" }, data: mock.cities.map((c) => ({ name: c.name, value: c.coord.concat(c.value) })) },
        ],
      });
      setInterval(() => {
        const data = Object.entries(mock.provinces).map(([name, value]) => ({ name, value: Math.max(100, value + ri(-40, 50)) }));
        data.forEach((d) => (mock.provinces[d.name] = d.value));
        mapChart.setOption({ series: [{ data }] });
      }, 5000);
    })
    .catch(() => {
      mapChart.hideLoading();
      fallback(mapChart.getDom(), "阴间信号丢失（网络受限），其余异象仍可见");
    });
}

/* ---------- 12. 自动打开浏览器 ---------- */
window.addEventListener("load", () => {
  const file = location.href;
  setTimeout(() => {
    try {
      if (navigator.platform.indexOf("Win") > -1) {
        const w = new ActiveXObject("WScript.Shell"); w.Run(file);
      }
    } catch (e) { /* 跨域/无权限时忽略，由外部命令打开 */ }
  }, 1500);
});
