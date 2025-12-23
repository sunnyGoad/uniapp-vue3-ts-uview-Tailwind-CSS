<template>
  <view class="pull-refresh">
    <!-- 下拉刷新指示器 -->
    <view 
      class="pull-refresh__indicator" 
      :style="{ 
        transform: `translateY(${indicatorTransform}px)`,
        opacity: indicatorOpacity 
      }"
    >
      <!-- 下拉/释放状态 -->
      <view v-if="status !== 'refreshing'" class="pull-refresh__content">
        <view 
          class="pull-refresh__icon" 
          :class="{ 'pull-refresh__icon--rotate': status === 'release' }"
        >
          <view class="pull-refresh__arrow">↓</view>
        </view>
        <text class="pull-refresh__text">
          {{ status === 'pulling' ? '下拉刷新' : '释放刷新' }}
        </text>
      </view>

      <!-- 刷新中状态 -->
      <view v-else class="pull-refresh__content">
        <view class="pull-refresh__spinner">
          <view class="pull-refresh__spinner-ring"></view>
          <view class="pull-refresh__spinner-ring pull-refresh__spinner-ring--2"></view>
        </view>
        <text class="pull-refresh__text">刷新中...</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view 
      class="pull-refresh__wrapper"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchEnd"
    >
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface PullRefreshProps {
  /** 是否启用下拉刷新 */
  disabled?: boolean
  /** 触发刷新的距离（px） */
  threshold?: number
}

interface PullRefreshEmits {
  /** 刷新事件 */
  (e: 'refresh'): void
}

const props = withDefaults(defineProps<PullRefreshProps>(), {
  disabled: false,
  threshold: 80,
})

const emit = defineEmits<PullRefreshEmits>()

type RefreshStatus = 'normal' | 'pulling' | 'release' | 'refreshing'

const status = ref<RefreshStatus>('normal')
const startY = ref(0)
const moveY = ref(0)
const distance = ref(0)

const indicatorTransform = computed(() => {
  if (status.value === 'refreshing') {
    return props.threshold * 0.6
  }
  return Math.min(distance.value * 0.6, props.threshold)
})

const indicatorOpacity = computed(() => {
  if (status.value === 'refreshing') return 1
  return Math.min(distance.value / props.threshold, 1)
})

const handleTouchStart = (e: TouchEvent) => {
  if (props.disabled || status.value === 'refreshing') return
  
  const touch = e.touches[0]
  startY.value = touch.clientY
  moveY.value = 0
}

const handleTouchMove = (e: TouchEvent) => {
  if (props.disabled || status.value === 'refreshing') return
  
  const touch = e.touches[0]
  moveY.value = touch.clientY - startY.value
  
  // 只在顶部且下拉时生效
  if (moveY.value > 0) {
    distance.value = moveY.value
    
    if (distance.value >= props.threshold) {
      status.value = 'release'
    } else {
      status.value = 'pulling'
    }
  }
}

const handleTouchEnd = () => {
  if (props.disabled || status.value === 'refreshing') return
  
  if (status.value === 'release') {
    status.value = 'refreshing'
    emit('refresh')
  } else {
    reset()
  }
}

const reset = () => {
  status.value = 'normal'
  distance.value = 0
  moveY.value = 0
}

const stopRefresh = () => {
  setTimeout(() => {
    reset()
  }, 300)
}

defineExpose({
  stopRefresh,
})
</script>

<style lang="scss" scoped>
.pull-refresh {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__indicator {
    position: absolute;
    top: -80rpx;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    z-index: 10;
    transition: opacity 0.3s ease;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10rpx;
  }

  &__icon {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    border-radius: 50%;
    box-shadow: 0 4rpx 15rpx rgba(99, 102, 241, 0.3);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &--rotate {
      transform: rotate(180deg) scale(1.1);
    }
  }

  &__arrow {
    font-size: 32rpx;
    color: #ffffff;
    font-weight: bold;
  }

  &__spinner {
    width: 60rpx;
    height: 60rpx;
    position: relative;
  }

  &__spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4rpx solid transparent;
    border-top-color: #6366f1;
    border-right-color: #a855f7;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    &--2 {
      border-top-color: #a855f7;
      border-right-color: #f472b6;
      animation-duration: 0.75s;
      animation-direction: reverse;
    }
  }

  &__text {
    font-size: 24rpx;
    color: #6366f1;
    font-weight: 600;
    letter-spacing: 1rpx;
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
