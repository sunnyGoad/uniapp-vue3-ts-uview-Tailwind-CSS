<template>
  <view class="base-page">
    <!-- 自定义顶部插槽 -->
    <slot name="header" />

    <!-- 主内容区域 -->
    <scroll-view
      class="base-page__content"
      scroll-y
      :refresher-enabled="enablePullRefresh"
      :refresher-triggered="refreshing"
      @refresherrefresh="handleRefresh"
      @scrolltolower="handleLoadMore"
    >
      <!-- 刷新状态 -->
      <view v-if="refreshing" class="base-page__refreshing">
        <u-loading-icon mode="circle" />
        <text class="base-page__refreshing-text">刷新中...</text>
      </view>

      <!-- 初始加载状态 -->
      <view v-else-if="loading && !refreshing" class="base-page__loading">
        <u-loading-icon mode="circle" />
        <text class="base-page__loading-text">加载中...</text>
      </view>

      <!-- 空页面 -->
      <view v-else-if="isEmpty" class="base-page__empty">
        <image v-if="emptyImage" :src="emptyImage" class="base-page__empty-image" />
        <text class="base-page__empty-text">{{ emptyText || '暂无数据' }}</text>
        <slot name="empty" />
      </view>

      <!-- 内容插槽 -->
      <slot v-else />

      <!-- 加载更多状态 -->
      <view v-if="enableLoadMore && !isEmpty && !loading" class="base-page__loadmore">
        <view v-if="loadingMore" class="base-page__loadmore-loading">
          <u-loading-icon mode="circle" size="24" />
          <text class="base-page__loadmore-text">加载中...</text>
        </view>
        <text v-else-if="finished" class="base-page__loadmore-finished">
          {{ finishedText || '没有更多了' }}
        </text>
      </view>
    </scroll-view>

    <!-- 自定义底部插槽 -->
    <slot name="footer" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
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
})

// 解构 props 以便在模板中直接使用
const {
  enablePullRefresh,
  enableLoadMore,
  loading,
  isEmpty,
  emptyText,
  emptyImage,
  finished,
  finishedText,
  autoLoad
} = toRefs(props)

const emit = defineEmits<BasePageEmits>()

const refreshing = ref(false)
const loadingMore = ref(false)

/**
 * 处理下拉刷新
 */
const handleRefresh = () => {
  if (!props.enablePullRefresh || refreshing.value) return

  refreshing.value = true
  emit('refresh')

  // 最短刷新时间 300ms，确保用户能看到刷新动画
  setTimeout(() => {
    refreshing.value = false
  }, 300)
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
  refreshing.value = false
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;

  &__content {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }

  &__refreshing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;

    &-text {
      margin-top: 20rpx;
      font-size: 28rpx;
      color: #909399;
    }
  }

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;

    &-text {
      margin-top: 20rpx;
      font-size: 28rpx;
      color: #909399;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;

    &-image {
      width: 300rpx;
      height: 300rpx;
      margin-bottom: 30rpx;
    }

    &-text {
      font-size: 28rpx;
      color: #909399;
    }
  }

  &__loadmore {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30rpx 0;

    &-loading {
      display: flex;
      align-items: center;
      gap: 16rpx;
    }

    &-text {
      font-size: 26rpx;
      color: #909399;
    }

    &-finished {
      font-size: 26rpx;
      color: #c0c4cc;
    }
  }
}
</style>
