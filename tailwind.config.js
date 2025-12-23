/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 主品牌色 - 活力橙色系
        primary: {
          DEFAULT: '#FF6B2C',
          light: '#FF8547',
          dark: '#E65A24',
          50: '#FFF5F0',
          100: '#FFE8DD',
          200: '#FFD1BA',
          300: '#FFBA98',
          400: '#FFA375',
          500: '#FF6B2C',
          600: '#E65A24',
          700: '#CC4A1D',
          800: '#B33A16',
          900: '#992A0F',
        },
        // 辅助色
        secondary: {
          blue: '#3B82F6',
          'blue-light': '#60A5FA',
          'blue-dark': '#2563EB',
        },
        // 功能色
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        // 中性色系统
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
          disabled: '#D1D5DB',
        },
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6',
          dark: '#D1D5DB',
        },
        bg: {
          DEFAULT: '#F9FAFB',
          white: '#FFFFFF',
          gray: '#F3F4F6',
          dark: '#1F2937',
        },
        // 保留原有的暗色主题和玻璃态效果
        dark: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.2)',
        }
      },
      fontSize: {
        // 超小字号
        'xs': ['22rpx', { lineHeight: '32rpx', fontWeight: '400' }],
        // 小字号 - 辅助文字
        'sm': ['24rpx', { lineHeight: '34rpx', fontWeight: '400' }],
        // 基础字号 - 正文
        'base': ['26rpx', { lineHeight: '38rpx', fontWeight: '400' }],
        // 副标题
        'lg': ['28rpx', { lineHeight: '40rpx', fontWeight: '500' }],
        // 标题
        'xl': ['32rpx', { lineHeight: '44rpx', fontWeight: '600' }],
        // 大标题
        '2xl': ['40rpx', { lineHeight: '52rpx', fontWeight: '600' }],
        // 超大标题
        '3xl': ['48rpx', { lineHeight: '60rpx', fontWeight: '700' }],
        // 巨大标题
        '4xl': ['56rpx', { lineHeight: '72rpx', fontWeight: '700' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '0': '0rpx',
        '1': '8rpx',
        '1.5': '12rpx',
        '2': '16rpx',
        '3': '24rpx',
        '4': '32rpx',
        '5': '40rpx',
        '6': '48rpx',
        '7': '56rpx',
        '8': '64rpx',
        '9': '72rpx',
        '10': '80rpx',
        '12': '96rpx',
        '14': '112rpx',
        '16': '128rpx',
        '20': '160rpx',
        '24': '192rpx',
      },
      borderRadius: {
        'none': '0rpx',
        'sm': '8rpx',
        'DEFAULT': '12rpx',
        'md': '16rpx',
        'lg': '24rpx',
        'xl': '32rpx',
        '2xl': '48rpx',
        '3xl': '64rpx',
        'full': '9999rpx',
      },
      boxShadow: {
        // 微阴影
        'xs': '0 2rpx 8rpx rgba(0, 0, 0, 0.04)',
        // 小阴影 - 卡片
        'sm': '0 4rpx 12rpx rgba(0, 0, 0, 0.08)',
        // 标准阴影
        'DEFAULT': '0 6rpx 16rpx rgba(0, 0, 0, 0.10)',
        // 中等阴影 - 弹窗、浮层
        'md': '0 8rpx 24rpx rgba(0, 0, 0, 0.12)',
        // 大阴影 - 模态框
        'lg': '0 16rpx 48rpx rgba(0, 0, 0, 0.16)',
        // 超大阴影
        'xl': '0 24rpx 64rpx rgba(0, 0, 0, 0.20)',
        // 特殊效果
        'glass': '0 8rpx 32rpx 0 rgba(31, 38, 135, 0.37)',
        'premium': '0 20rpx 50rpx rgba(0, 0, 0, 0.1)',
        'neon': '0 0 15rpx rgba(255, 107, 44, 0.5)',
        // 内阴影
        'inner': 'inset 0 2rpx 4rpx rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B2C 0%, #FF8547 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
        'gradient-premium': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
