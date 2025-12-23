<template>
  <BasePage :has-tabbar="true">
    <template #header>
      <view class="game-header">
        <view class="header-content">
          <text class="header-title">探索中心</text>
          <view class="header-subtitle-box">
             <text class="header-subtitle">在趣味挑战中提升自我</text>
          </view>
        </view>
      </view>
    </template>

    <view class="game-container">
      <view 
        v-for="game in gameTypes" 
        :key="game.id"
        class="game-item"
        @click="handleGameClick(game)"
      >
        <view class="game-card">
          <view class="game-icon-box" :style="{ background: game.id === 'word-match' ? 'rgba(252, 128, 5, 0.1)' : 'rgba(253, 154, 61, 0.1)' }">
             <text class="game-icon-text">{{ game.icon }}</text>
          </view>
          <view class="game-info">
            <text class="game-name">{{ game.name }}</text>
            <text class="game-desc">{{ game.description }}</text>
          </view>
          <view class="action-btn">
            <u-icon name="arrow-right" color="#FC8005" size="20"></u-icon>
          </view>
        </view>
      </view>

      <!-- 统计信息 -->
      <view class="stats-section mt-8">
        <view class="stats-header">
           <text class="stats-title">成长轨迹</text>
        </view>
        <view class="stats-grid mt-4">
          <view class="stat-item item-orange">
            <text class="stat-value">156</text>
            <text class="stat-label">累计探索</text>
          </view>
          <view class="stat-item item-pale">
            <text class="stat-value">89%</text>
            <text class="stat-label">完成度</text>
          </view>
          <view class="stat-item item-accent">
            <text class="stat-value">2340</text>
            <text class="stat-label">积分</text>
          </view>
        </view>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { BasePage } from '@/components/BasePage'
import { gameTypes } from '../../mock/game-data'
import type { GameType } from '../../mock/game-data'

const handleGameClick = (game: GameType) => {
  uni.navigateTo({
    url: game.route
  })
}
</script>

<style lang="scss" scoped>
.game-header {
  padding: 32rpx;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-bottom: 1rpx solid rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);
  
  .header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header-title {
    font-size: 40rpx;
    font-weight: 800;
    color: #1e1b4b;
    margin-bottom: 12rpx;
  }

  .header-subtitle {
    font-size: 24rpx;
    color: #6366f1;
    font-weight: 500;
  }
}

.game-container {
  padding: 40rpx;
  background-color: #fbfbfe;
  min-height: 100vh;
}

.game-item {
  margin-bottom: 32rpx;

  .game-card {
    background: #fff;
    border-radius: 32rpx;
    padding: 32rpx;
    display: flex;
    align-items: center;
    gap: 32rpx;
    box-shadow: 0 10rpx 30rpx rgba(99, 102, 241, 0.05);
    border: 1rpx solid rgba(99, 102, 241, 0.05);

    &:active {
      transform: scale(0.98);
    }
  }

  .game-icon-box {
    width: 100rpx;
    height: 100rpx;
    border-radius: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .game-icon-text {
      font-size: 50rpx;
    }
  }

  .game-info {
    flex: 1;
    min-width: 0;

    .game-name {
      font-size: 32rpx;
      font-weight: 700;
      color: #1e1b4b;
      margin-bottom: 8rpx;
      display: block;
    }

    .game-desc {
      font-size: 22rpx;
      color: #64748b;
      line-height: 1.4;
    }
  }

  .action-btn {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.stats-section {
  .stats-header {
    margin-bottom: 24rpx;

    .stats-title {
      font-size: 32rpx;
      font-weight: 700;
      color: #1e1b4b;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24rpx;
    
    .stat-item {
      padding: 32rpx 20rpx;
      border-radius: 24rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8rpx;
      box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.02);

      &.item-orange { background: rgba(99, 102, 241, 0.1); }
      &.item-pale { background: rgba(168, 85, 247, 0.1); }
      &.item-accent { background: #fbfbfe; border: 1rpx solid #f1f5f9; }

      .stat-value {
        font-size: 36rpx;
        font-weight: 800;
        color: #6366f1;
        line-height: 1;
      }

      .stat-label {
        font-size: 20rpx;
        color: #64748b;
        font-weight: 500;
      }
    }
  }
}
</style>
