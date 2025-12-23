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
    <!-- 顶部导航 & 搜索栏 - 简约风格 -->
    <template #header>
      <view class="minimal-header">
        <view class="header-content">
          <view class="user-section">
            <view class="avatar-container">
              <image
                class="avatar"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                mode="aspectFill"
              />
            </view>
            <view class="welcome-text">
              <text class="greeting">下午好,</text>
              <text class="name">张丽老师</text>
            </view>
          </view>
          
          <view class="search-section">
            <view class="search-bar">
              <u-icon name="search" color="#94a3b8" size="18"></u-icon>
              <input 
                class="search-input" 
                placeholder="搜索活动" 
                placeholder-class="placeholder-style"
              />
            </view>
          </view>
        </view>
      </view>
    </template>

    <!-- 活动列表 - 简约风格 -->
    <view class="activity-container">
      <view 
        v-for="(item, index) in activities" 
        :key="item.id" 
        class="activity-item animate-slide-up"
        :style="{ animationDelay: (index % 10) * 0.1 + 's' }"
        @click="handleCardClick(item)"
      >
        <view class="item-card">
          <view class="image-wrapper">
            <image :src="item.image" mode="aspectFill" class="activity-img" />
            <view class="date-tag">{{ item.date }}</view>
          </view>

          <view class="info-wrapper">
            <text class="item-title">{{ item.title }}</text>
            
            <view class="tag-list">
              <view 
                v-for="(tag, index) in item.tags" 
                :key="index"
                class="tag-item"
              >
                <text class="tag-label">{{ tag }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BasePage } from '@/components/BasePage'
import { request } from '../../mock/service'
import type { Activity } from '../../mock/activity'

const activities = ref<Activity[]>([])
const loading = ref(false)
const finished = ref(false)
const isEmpty = computed(() => !loading.value && activities.value.length === 0)

const fetchActivities = async (isRefresh = false) => {
  if (loading.value) return
  loading.value = true
  
  try {
    const res = await request<Activity[]>('/api/activities')
    if (res.code === 200) {
      if (isRefresh) {
        activities.value = res.data
        finished.value = false
      } else {
        // 模拟分页追加
        const nextBatch = res.data.map(item => ({
          ...item,
          id: activities.value.length + item.id
        }))
        activities.value.push(...nextBatch)
        
        if (activities.value.length >= 20) {
          finished.value = true
        }
      }
    }
  } catch (err) {
    console.error('获取活动列表失败:', err)
  } finally {
    loading.value = false
  }
}

const handleRefresh = () => {
  fetchActivities(true)
}

const handleLoadMore = () => {
  if (!finished.value) {
    fetchActivities(false)
  }
}

// 初始化
fetchActivities(true)

const handleCardClick = (item: Activity) => {
  uni.showToast({
    title: item.title,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.minimal-header {
  padding: 32rpx;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-bottom: 1rpx solid rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);

  .header-content {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 20rpx;

    .avatar-container {
      width: 90rpx;
      height: 90rpx;
      border-radius: 30rpx;
      overflow: hidden;
      border: 4rpx solid #ffffff;
      box-shadow: 0 8rpx 20rpx rgba(99, 102, 241, 0.15);
      
      .avatar {
        width: 100%;
        height: 100%;
      }
    }

    .welcome-text {
      display: flex;
      flex-direction: column;
      
      .greeting {
        font-size: 24rpx;
        color: #6366f1;
        font-weight: 500;
        letter-spacing: 1rpx;
      }
      
      .name {
        font-size: 36rpx;
        font-weight: 700;
        color: #1e1b4b;
      }
    }
  }

  .search-section {
    .search-bar {
      display: flex;
      align-items: center;
      background-color: #ffffff;
      border-radius: 24rpx;
      padding: 16rpx 24rpx;
      gap: 16rpx;
      box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.03);
      border: 1rpx solid #f1f5f9;
      
      .search-input {
        flex: 1;
        font-size: 28rpx;
        color: #1e293b;
      }
      
      .placeholder-style {
        color: #94a3b8;
      }
    }
  }
}

.activity-container {
  padding: 32rpx;
  background-color: #fbfbfe;
  min-height: 100vh;
}

.activity-item {
  margin-bottom: 40rpx;

  .item-card {
    background-color: #ffffff;
    border-radius: 32rpx;
    overflow: hidden;
    box-shadow: 0 15rpx 35rpx rgba(99, 102, 241, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1rpx solid rgba(255, 255, 255, 0.8);

    &:active {
      transform: scale(0.97);
      box-shadow: 0 5rpx 15rpx rgba(99, 102, 241, 0.05);
    }
  }

  .image-wrapper {
    position: relative;
    height: 400rpx;
    
    .activity-img {
      width: 100%;
      height: 100%;
    }
    
    .date-tag {
      position: absolute;
      top: 24rpx;
      right: 24rpx;
      background: rgba(255, 255, 255, 0.9);
      color: #6366f1;
      padding: 8rpx 20rpx;
      border-radius: 16rpx;
      font-size: 24rpx;
      font-weight: 600;
      backdrop-filter: blur(5px);
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    }
  }

  .info-wrapper {
    padding: 32rpx;
    
    .item-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1e1b4b;
      margin-bottom: 24rpx;
      line-height: 1.5;
      display: block;
    }
    
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx;
      
      .tag-item {
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
        padding: 6rpx 20rpx;
        border-radius: 12rpx;
        border: 1rpx solid rgba(99, 102, 241, 0.1);
        
        .tag-label {
          font-size: 22rpx;
          color: #6366f1;
          font-weight: 500;
        }
      }
    }
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  opacity: 0;
  animation: slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
</style>
