<template>
  <BasePage
    :enable-pull-refresh="true"
    :enable-load-more="true"
    :loading="loading"
    :is-empty="isEmpty"
    :finished="finished"
    :has-tabbar="true"
    @refresh="handleRefresh"
    @load-more="handleLoadMore"
  >
    <!-- 顶部导航 -->
    <template #header>
      <view class="premium-header">
        <view class="header-content">
          <text class="header-title">创作空间</text>
          <text class="header-subtitle">记录灵感，构建无限可能</text>
        </view>
        <view class="header-action" @click="handlePlusClick">
          <u-icon name="plus" color="#6366f1" size="20"></u-icon>
        </view>
      </view>
    </template>

    <!-- 列表内容 -->
    <view class="temple-list">
      <view
        v-for="(item, index) in listData"
        :key="index"
        class="list-item-card animate-slide-up"
        :style="{ animationDelay: index * 0.1 + 's' }"
        @click="handleItemClick(item)"
      >
        <view class="item-decoration" :style="{ background: getGradient(index) }"></view>
        <view class="item-main">
          <view class="item-header">
            <text class="item-title">{{ item.title }}</text>
            <view class="item-tag" :class="'tag-' + item.type">{{ item.type.toUpperCase() }}</view>
          </view>
          <text class="item-desc">{{ item.description }}</text>
          <view class="item-footer">
            <view class="user-info">
              <view class="avatar-sm"></view>
              <text class="username">{{ item.author }}</text>
            </view>
            <text class="time">{{ item.time }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 浮动操作 -->
    <template #footer>
      <view class="footer-hint" v-if="finished">
        <text class="hint-text">已为您展示全部灵感</text>
      </view>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BasePage } from '@/components/BasePage'
import { request } from '../../mock/service'

interface ListItem {
  id: number
  title: string
  description: string
  type: 'ui' | 'logic' | 'core'
  author: string
  time: string
}

const loading = ref(false)
const listData = ref<ListItem[]>([])
const finished = ref(false)
const isEmpty = computed(() => !loading.value && listData.value.length === 0)

const getGradient = (index: number) => {
  const gradients = [
    'linear-gradient(to bottom, #6366f1, #a855f7)',
    'linear-gradient(to bottom, #22d3ee, #6366f1)',
    'linear-gradient(to bottom, #f472b6, #fb923c)',
  ]
  return gradients[index % gradients.length]
}

const handleRefresh = async () => {
  loading.value = true
  try {
    const res = await request<ListItem[]>('/api/temples')
    if (res.code === 200) {
      listData.value = [...res.data]
    }
  } catch (err) {
    console.error('刷新失败:', err)
  } finally {
    loading.value = false
    finished.value = false
  }
}

const handleLoadMore = async () => {
  if (finished.value || loading.value) return
  loading.value = true
  try {
    const res = await request<ListItem[]>('/api/temples')
    if (res.code === 200) {
      // 模拟分页追加数据
      const nextBatch = res.data.map((item) => ({
        ...item,
        id: listData.value.length + item.id,
        title: `${item.title} (进阶)`,
      }))
      
      listData.value.push(...nextBatch)
      
      if (listData.value.length >= 20) {
        finished.value = true
      }
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
  }
}

const handleItemClick = (item: ListItem) => {
  uni.showToast({ title: item.title, icon: 'none' })
}

const handlePlusClick = () => {
  uni.showToast({ title: '添加新实验', icon: 'success' })
}

// 初始化
handleRefresh()
</script>

<style lang="scss" scoped>
.premium-header {
  padding: 32rpx;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-bottom: 1rpx solid rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .header-content {
    display: flex;
    flex-direction: column;
  }

  .header-title {
    font-size: 40rpx;
    font-weight: 800;
    color: #1e1b4b;
    margin-bottom: 8rpx;
  }

  .header-subtitle {
    font-size: 22rpx;
    color: #6366f1;
    font-weight: 500;
  }

  .header-action {
    width: 80rpx;
    height: 80rpx;
    background: #ffffff;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  }
}

.temple-list {
  padding: 40rpx;
  background-color: #fbfbfe;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.list-item-card {
  position: relative;
  overflow: hidden;
  padding: 32rpx;
  padding-left: 48rpx;
  background: #ffffff;
  border-radius: 32rpx;
  box-shadow: 0 10rpx 30rpx rgba(99, 102, 241, 0.05);
  border: 1rpx solid rgba(99, 102, 241, 0.05);
  display: flex;

  &:active {
    transform: scale(0.98);
  }

  .item-decoration {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8rpx;
  }

  .item-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;

    .item-title {
      font-size: 32rpx;
      font-weight: 700;
      color: #1e1b4b;
    }

    .item-tag {
      padding: 6rpx 16rpx;
      border-radius: 10rpx;
      font-size: 20rpx;
      font-weight: 700;
      
      &.tag-ui { background: rgba(99, 102, 241, 0.08); color: #6366f1; }
      &.tag-logic { background: rgba(168, 85, 247, 0.08); color: #a855f7; }
      &.tag-core { background: rgba(99, 102, 241, 0.15); color: #4338ca; }
    }
  }

  .item-desc {
    font-size: 26rpx;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 24rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-info {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .avatar-sm {
        width: 32rpx;
        height: 32rpx;
        border-radius: 50%;
        background: #f1f1f1;
        border: 2rpx solid #fff;
      }

      .username {
        font-size: 22rpx;
        color: #94a3b8;
      }
    }

    .time {
      font-size: 22rpx;
      color: #cbd5e1;
    }
  }
}

.footer-hint {
  padding: 40rpx;
  text-align: center;
  
  .hint-text {
    font-size: 22rpx;
    color: #94a3b8;
    letter-spacing: 2rpx;
    opacity: 0.8;
  }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  opacity: 0;
  animation: slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
</style>
