// 计算 1920x1080 设计稿到当前视口的等比缩放比例
export function fitScreen(): number {
  return Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
}
