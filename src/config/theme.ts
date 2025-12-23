/**
 * 主题配置
 */
export const themeConfig = {
  // 颜色配置
  colors: {
    primary: '#3c9cff',
    primaryLight: '#66b3ff',
    primaryDark: '#0081ff',
    success: '#5ac725',
    successLight: '#7ed321',
    successDark: '#3fa518',
    warning: '#ff9900',
    warningLight: '#ffad33',
    warningDark: '#cc7a00',
    error: '#f56c6c',
    errorLight: '#f89898',
    errorDark: '#dd4d4d',
    info: '#909399',
    infoLight: '#a6a9ad',
    infoDark: '#7a7d80',
  },
  
  // 文字大小配置（rpx）
  fontSize: {
    xs: 24,
    sm: 26,
    base: 28,
    lg: 32,
    xl: 36,
    '2xl': 40,
    '3xl': 48,
  },
  
  // 间距配置（rpx）
  spacing: {
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
  },
  
  // 圆角配置（rpx）
  borderRadius: {
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  // 阴影配置
  boxShadow: {
    sm: '0 2rpx 4rpx rgba(0, 0, 0, 0.05)',
    base: '0 2rpx 8rpx rgba(0, 0, 0, 0.1)',
    md: '0 4rpx 12rpx rgba(0, 0, 0, 0.12)',
    lg: '0 8rpx 16rpx rgba(0, 0, 0, 0.15)',
  },
}

export type ThemeConfig = typeof themeConfig
