/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3c9cff',
          light: '#66b3ff',
          dark: '#0081ff',
        },
        success: {
          DEFAULT: '#5ac725',
          light: '#7ed321',
          dark: '#3fa518',
        },
        warning: {
          DEFAULT: '#ff9900',
          light: '#ffad33',
          dark: '#cc7a00',
        },
        error: {
          DEFAULT: '#f56c6c',
          light: '#f89898',
          dark: '#dd4d4d',
        },
        info: {
          DEFAULT: '#909399',
          light: '#a6a9ad',
          dark: '#7a7d80',
        },
      },
      fontSize: {
        'xs': ['24rpx', '32rpx'],
        'sm': ['26rpx', '36rpx'],
        'base': ['28rpx', '40rpx'],
        'lg': ['32rpx', '44rpx'],
        'xl': ['36rpx', '48rpx'],
        '2xl': ['40rpx', '52rpx'],
        '3xl': ['48rpx', '60rpx'],
      },
      spacing: {
        '1': '10rpx',
        '2': '20rpx',
        '3': '30rpx',
        '4': '40rpx',
        '5': '50rpx',
        '6': '60rpx',
      },
      borderRadius: {
        'sm': '4rpx',
        'DEFAULT': '8rpx',
        'md': '12rpx',
        'lg': '16rpx',
        'xl': '24rpx',
        'full': '9999rpx',
      },
      boxShadow: {
        'sm': '0 2rpx 4rpx rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 2rpx 8rpx rgba(0, 0, 0, 0.1)',
        'md': '0 4rpx 12rpx rgba(0, 0, 0, 0.12)',
        'lg': '0 8rpx 16rpx rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
