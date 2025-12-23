<template>
  <BasePage :has-tabbar="true">
    <!-- 沉浸式顶部 -->
    <template #header>
      <view class="nav-header glass-effect">
        <text class="nav-title premium-gradient-text">UNIAFF.ULTRA</text>
      </view>
    </template>

    <!-- 首页内容 -->
    <view class="index-content">
      <!-- Hero 区域 -->
      <view class="hero-section">
        <view class="hero-bg"></view>
        <view class="hero-info animate-fade-in">
          <text class="hero-title">构建前沿体验</text>
          <text class="hero-subtitle">基于 Vue3 + TypeScript 的极致开发底座</text>
        </view>
      </view>

      <!-- 核心特性网格 -->
      <view class="section-container">
        <view class="section-header">
          <text class="section-title">核心引擎</text>
          <text class="section-more">探索全部</text>
        </view>
        
        <view class="feature-grid">
          <view
            v-for="feature in features"
            :key="feature.id"
            class="feature-card soft-card"
            @click="handleCardClick(feature)"
          >
            <view class="feature-icon-wrap" :style="{ background: feature.gradient }">
              <text class="feature-icon">{{ feature.icon }}</text>
            </view>
            <view class="feature-body">
              <text class="feature-title">{{ feature.title }}</text>
              <text class="feature-desc">{{ feature.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 操作区 -->
      <view class="section-container pb-8">
        <u-button
          color="linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
          shape="circle"
          size="large"
          customStyle="box-shadow: 0 10rpx 30rpx rgba(99, 102, 241, 0.4); border: none;"
          @click="gotoTemple"
        >
          即刻体验示例
        </u-button>

        <view class="mt-8 flex justify-center">
          <text class="text-sm text-slate opacity-60">Version 2.0.0 Alpha</text>
        </view>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BasePage } from '@/components/BasePage'

interface Feature {
  id: number
  icon: string
  title: string
  desc: string
  gradient: string
}

const features = ref<Feature[]>([
  { id: 1, icon: '⚡', title: '高性能请求', desc: '预设拦截器与TS类型增强', gradient: 'rgba(99, 102, 241, 0.1)' },
  { id: 2, icon: '💎', title: '玻璃态组件', desc: '基于前沿 Glassmorphism 视觉', gradient: 'rgba(34, 211, 238, 0.1)' },
  { id: 3, icon: '🎨', title: '高级主题', desc: '深邃色彩映射与原子化CSS', gradient: 'rgba(244, 114, 182, 0.1)' },
  { id: 4, icon: '🚀', title: '开发工厂', desc: '自动化 API 生成与 Shims 注入', gradient: 'rgba(168, 85, 247, 0.1)' },
])

const handleCardClick = (feature: Feature) => {
  uni.showToast({
    title: feature.title,
    icon: feature.icon as any,
  })
}

const gotoTemple = () => {
  uni.switchTab({
    url: '/pages/temple/temple',
  })
}
</script>

<style lang="scss" scoped>
.nav-header {
  padding: 32rpx;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-bottom: 1rpx solid rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  font-size: 34rpx;
  letter-spacing: 4rpx;
  font-weight: 800;
  color: #6366f1;
}

.index-content {
  background-color: #fbfbfe;
}

.hero-section {
  position: relative;
  height: 520rpx;
  display: flex;
  align-items: center;
  padding: 0 40rpx;
  overflow: hidden;

  .hero-bg {
    position: absolute;
    top: -100rpx;
    right: -100rpx;
    width: 600rpx;
    height: 600rpx;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    z-index: 0;
  }

  .hero-info {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  .hero-title {
    font-size: 64rpx;
    font-weight: 800;
    color: #1e1b4b;
    line-height: 1.2;
    margin-bottom: 20rpx;
  }

  .hero-subtitle {
    font-size: 28rpx;
    color: #64748b;
    max-width: 80%;
  }
}

.section-container {
  padding: 40rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;

  .section-title {
    font-size: 36rpx;
    font-weight: 700;
    color: #1e1b4b;
  }

  .section-more {
    font-size: 24rpx;
    color: #6366f1;
    font-weight: 600;
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.feature-card {
  padding: 40rpx 32rpx;
  background: #ffffff;
  border-radius: 32rpx;
  box-shadow: 0 10rpx 30rpx rgba(99, 102, 241, 0.05);
  border: 1rpx solid rgba(99, 102, 241, 0.05);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.96);
  }

  .feature-icon-wrap {
    width: 90rpx;
    height: 90rpx;
    border-radius: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24rpx;
    
    .feature-icon {
      font-size: 44rpx;
    }
  }

  .feature-title {
    font-size: 30rpx;
    font-weight: 600;
    color: #1e1b4b;
    margin-bottom: 8rpx;
  }

  .feature-desc {
    font-size: 22rpx;
    color: #64748b;
    line-height: 1.4;
  }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}
</style>
