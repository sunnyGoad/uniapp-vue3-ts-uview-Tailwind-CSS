<template>
  <view :class="['base-page', { 'base-page--tabbar': props.hasTabbar }]">
    <!-- 玻璃质感顶部容器 -->
    <view v-if="$slots.header" class="base-page__header-wrap glass-effect">
      <slot name="header" />
    </view>

    <!-- 主内容区域 -->
    <PullRefresh
      ref="pullRefreshRef"
      :disabled="!props.enablePullRefresh"
      @refresh="handleRefresh"
    >
      <scroll-view
        class="base-page__content"
        :class="{ 'base-page__content--has-header': $slots.header }"
        scroll-y
        @scrolltolower="handleLoadMore"
      >
        <!-- 初始加载状态 - 前沿动画 -->
        <view v-if="props.loading && !isRefreshing" class="base-page__loading">
          <view class="loading-spinner">
            <view class="spinner-dot" v-for="i in 3" :key="i"></view>
          </view>
          <text class="loading-text">探索中...</text>
        </view>

        <!-- 空页面 - 精致插画感 -->
        <view v-else-if="props.isEmpty" class="base-page__empty">
          <view class="empty-icon-wrap">
            <image v-if="props.emptyImage" :src="props.emptyImage" class="empty-image" />
            <view v-else class="empty-placeholder">✨</view>
          </view>
          <text class="empty-text">{{ props.emptyText || '空空如也，开启新发现' }}</text>
          <slot name="empty" />
        </view>

        <!-- 内容插槽 -->
        <slot v-else />

        <!-- 加载更多状态 -->
        <view v-if="props.enableLoadMore && !props.isEmpty && !props.loading && (loadingMore || props.finished)" class="base-page__loadmore">
          <view v-if="loadingMore" class="base-page__loadmore-loading">
            <u-loading-icon mode="circle" size="24" color="#6366f1" />
            <text class="loadmore-text">正在加载</text>
          </view>
          <text v-else-if="props.finished" class="base-page__loadmore-finished">
            {{ props.finishedText || '— 已经到底啦 —' }}
          </text>
        </view>
      </scroll-view>
    </PullRefresh>

    <!-- 自定义底部容器 -->
    <view v-if="$slots.footer" class="base-page__footer-wrap glass-effect">
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import PullRefresh from '@/components/PullRefresh'
import type { BasePageProps, BasePageEmits } from './types'

const props = withDefaults(defineProps<BasePageProps>(), {
  enablePullRefresh: false,
  enableLoadMore: false,
  loading: false,
  isEmpty: false,
  emptyText: '暂无数据',
  emptyImage: '',
  finished: false,
  finishedText: '没有更多了',
  autoLoad: true,
  hasTabbar: false,
})

const emit = defineEmits<BasePageEmits>()

const pullRefreshRef = ref()
const loadingMore = ref(false)
const isRefreshing = ref(false)

/**
 * 监听加载状态，自动同步刷新状态
 */
watch(() => props.loading, (newVal) => {
  if (!newVal && isRefreshing.value) {
    stopRefresh()
  }
})

/**
 * 处理下拉刷新
 */
const handleRefresh = async () => {
  if (!props.enablePullRefresh) return

  isRefreshing.value = true
  emit('refresh')
}

/**
 * 处理上拉加载
 */
const handleLoadMore = () => {
  if (!props.enableLoadMore || loadingMore.value || props.finished || props.loading) return

  loadingMore.value = true
  emit('loadMore')

  setTimeout(() => {
    loadingMore.value = false
  }, 300)
}

/**
 * 停止下拉刷新
 */
const stopRefresh = () => {
  isRefreshing.value = false
  pullRefreshRef.value?.stopRefresh()
}

/**
 * 停止上拉加载
 */
const stopLoadMore = () => {
  loadingMore.value = false
}

// 暴露方法给父组件
defineExpose({
  stopRefresh,
  stopLoadMore,
})

onMounted(() => {
  // 自动触发首次加载
  if (props.autoLoad && props.enableLoadMore) {
    emit('loadMore')
  }
})
</script>

<style lang="scss" scoped>
.base-page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

 

  &__footer-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    
    /* #ifdef H5 */
    // H5 环境下，如果有 tabbar，底部容器需要往上提 50px (或者由 tabbar 控制)
    // 但如果 BasePage.vue 已经被父级容器减去了 50px 高度，这里的 bottom: 0 实际上是 tabbar 的上方。
    // 如果没有 tabbar，则直接在底部。
    /* #endif */

    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__content {
    flex: 1;
    width: 100%;
    overflow: hidden;

  
  }

  /* 前沿加载动效 */
  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 200rpx 0;

    .loading-spinner {
      display: flex;
      gap: 12rpx;
      margin-bottom: 24rpx;

      .spinner-dot {
        width: 16rpx;
        height: 16rpx;
        background: #6366f1;
        border-radius: 50%;
        animation: pulse 1.5s infinite;

        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
      }
    }

    .loading-text {
      font-size: 26rpx;
      color: #94a3b8;
      letter-spacing: 2rpx;
    }
  }

  /* 精美空状态 */
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 200rpx 40rpx;

    .empty-icon-wrap {
      margin-bottom: 40rpx;
      
      .empty-placeholder {
        font-size: 100rpx;
        filter: drop-shadow(0 10rpx 20rpx rgba(99, 102, 241, 0.2));
      }

      .empty-image {
        width: 320rpx;
        height: 320rpx;
      }
    }

    .empty-text {
      font-size: 28rpx;
      color: #64748b;
    }
  }

  &__loadmore {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40rpx 0;

    &-loading {
      display: flex;
      align-items: center;
      gap: 12rpx;
      
      .loadmore-text {
        font-size: 24rpx;
        color: #94a3b8;
      }
    }

    &-finished {
      font-size: 24rpx;
      color: #cbd5e1;
      letter-spacing: 1rpx;
    }
  }

  // Tabbar 页面特殊处理
  &--tabbar {
    /* #ifdef H5 */
    height: calc(100vh - 50px);
    min-height: auto;
    /* #endif */
    
    /* #ifndef H5 */
    height: 100%;
    /* #endif */
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.5); opacity: 1; filter: blur(1px); }
}
</style>
