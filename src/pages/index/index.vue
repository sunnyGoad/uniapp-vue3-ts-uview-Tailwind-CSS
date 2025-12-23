<template>
  <view class="index-page">
    <!-- 顶部横幅 -->
    <view class="index-banner bg-primary p-4">
      <text class="text-white text-2xl font-bold">uniapp 基础框架</text>
      <text class="text-white text-base mt-2">Vue3 + TypeScript + uView + Tailwind CSS</text>
    </view>

    <!-- 功能卡片 -->
    <view class="index-content p-3">
      <!-- 核心功能 -->
      <view class="index-section mb-4">
        <text class="text-lg font-semibold text-dark mb-3">核心功能</text>
        <view class="index-grid">
          <view
            v-for="feature in features"
            :key="feature.id"
            class="index-card bg-white p-3 rounded-lg shadow"
            @click="handleCardClick(feature)"
          >
            <text class="index-card-icon">{{ feature.icon }}</text>
            <text class="text-base font-medium text-dark mt-2">{{ feature.title }}</text>
            <text class="text-sm text-gray mt-1">{{ feature.desc }}</text>
          </view>
        </view>
      </view>

      <!-- 快速开始 -->
      <view class="index-section">
        <text class="text-lg font-semibold text-dark mb-3">快速开始</text>
        <view class="index-steps bg-white p-3 rounded-lg shadow">
          <view
            v-for="(step, index) in steps"
            :key="index"
            class="index-step"
          >
            <view class="index-step-number bg-primary text-white">{{ index + 1 }}</view>
            <view class="index-step-content flex-1">
              <text class="text-base font-medium text-dark">{{ step.title }}</text>
              <text class="text-sm text-gray mt-1">{{ step.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="index-actions mt-4">
        <u-button type="primary" size="large" @click="gotoTemple">
          查看示例页面
        </u-button>
        <u-button type="success" size="large" class="mt-2" @click="generateApi">
          生成 API
        </u-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()

interface Feature {
  id: number
  icon: string
  title: string
  desc: string
}

interface Step {
  title: string
  desc: string
}

const features = ref<Feature[]>([
  { id: 1, icon: '📦', title: 'Request 请求', desc: '封装请求工具，支持拦截器' },
  { id: 2, icon: '💾', title: 'Storage 缓存', desc: '支持过期时间的缓存工具' },
  { id: 3, icon: '🎨', title: '主题配置', desc: '预设 class，快速开发' },
  { id: 4, icon: '📄', title: 'BasePage 组件', desc: '支持刷新、加载的页面组件' },
  { id: 5, icon: '🔌', title: 'Swagger 对接', desc: '自动生成 API 和类型' },
  { id: 6, icon: '📱', title: '多端兼容', desc: '兼容微信小程序和 H5' },
])

const steps = ref<Step[]>([
  { title: '安装依赖', desc: 'npm install' },
  { title: '配置 Swagger', desc: '修改 swagger.config.json' },
  { title: '生成 API', desc: 'npm run generate:api' },
  { title: '开始开发', desc: 'npm run dev:h5 或 dev:mp-weixin' },
])

const handleCardClick = (feature: Feature) => {
  uni.showToast({
    title: feature.title,
    icon: 'none',
  })
}

const gotoTemple = () => {
  uni.switchTab({
    url: '/pages/temple/temple',
  })
}

const generateApi = () => {
  uni.showModal({
    title: '提示',
    content: '请在命令行运行: npm run generate:api',
    showCancel: false,
  })
}
</script>

<style lang="scss" scoped>
.index-page {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.index-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 40rpx;
}

.index-content {
  padding-bottom: 40rpx;
}

.index-section {
  display: flex;
  flex-direction: column;
}

.index-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.index-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30rpx 20rpx;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
    opacity: 0.8;
  }
}

.index-card-icon {
  font-size: 60rpx;
}

.index-steps {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.index-step {
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
}

.index-step-number {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  font-weight: bold;
  flex-shrink: 0;
}

.index-step-content {
  display: flex;
  flex-direction: column;
}

.index-actions {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
