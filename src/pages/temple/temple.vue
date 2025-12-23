<template>
  <BasePage
    :enable-pull-refresh="true"
    :enable-load-more="true"
    :loading="loading"
    :is-empty="isEmpty"
    :finished="finished"
    empty-text="暂无数据"
    @refresh="handleRefresh"
    @load-more="handleLoadMore"
  >
    <!-- 顶部自定义区域 -->
    <template #header>
      <view class="temple-header bg-primary p-3">
        <text class="text-white text-xl font-bold">示例页面</text>
        <text class="text-white text-sm mt-1">展示 BasePage 组件完整功能</text>
      </view>
    </template>

    <!-- 内容区域 -->
    <view class="temple-content p-3">
      <!-- 功能说明卡片 -->
      <view class="temple-card bg-white p-3 rounded-lg shadow mb-3">
        <text class="text-lg font-semibold text-dark mb-2">功能说明</text>
        <view class="temple-feature">
          <text class="text-base text-gray">✅ 下拉刷新</text>
          <text class="text-base text-gray">✅ 上拉加载更多</text>
          <text class="text-base text-gray">✅ 加载状态显示</text>
          <text class="text-base text-gray">✅ 空页面显示</text>
          <text class="text-base text-gray">✅ 主题配置支持</text>
        </view>
      </view>

      <!-- 数据列表 -->
      <view
        v-for="item in dataList"
        :key="item.id"
        class="temple-item bg-white p-3 rounded-lg shadow mb-2"
      >
        <view class="flex items-center justify-between">
          <view class="flex-1">
            <text class="text-base font-medium text-dark">{{ item.title }}</text>
            <text class="text-sm text-gray mt-1">{{ item.description }}</text>
          </view>
          <view :class="`temple-tag bg-${item.type} rounded-full px-2 py-1`">
            <text class="text-white text-xs">{{ item.tag }}</text>
          </view>
        </view>
      </view>

      <!-- 操作按钮组 -->
      <view class="temple-actions mt-4">
        <u-button type="primary" @click="handleClearData">清空数据</u-button>
        <u-button type="success" class="mt-2" @click="handleResetData">重置数据</u-button>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BasePage } from '@/components/BasePage'
import request from '@/utils/request'

interface DataItem {
  id: number
  title: string
  description: string
  tag: string
  type: string
}

const loading = ref(false)
const dataList = ref<DataItem[]>([])
const page = ref(1)
const pageSize = 10

const isEmpty = computed(() => !loading.value && dataList.value.length === 0)
const finished = computed(() => dataList.value.length >= 30)

/**
 * 模拟获取数据
 */
const fetchData = async (isRefresh = false) => {
  try {
    loading.value = true

    if (isRefresh) {
      page.value = 1
    }

    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newData: DataItem[] = Array.from({ length: pageSize }, (_, i) => {
      const index = (page.value - 1) * pageSize + i + 1
      return {
        id: index,
        title: `数据项 ${index}`,
        description: `这是第 ${index} 条数据的描述信息`,
        tag: ['推荐', '热门', '新品'][index % 3],
        type: ['primary', 'success', 'warning'][index % 3],
      }
    })

    if (isRefresh) {
      dataList.value = newData
    }
    else {
      dataList.value = [...dataList.value, ...newData]
    }

    page.value++
  }
  catch (error) {
    console.error('获取数据失败:', error)
    uni.showToast({
      title: '获取数据失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

/**
 * 下拉刷新
 */
const handleRefresh = async () => {
  await fetchData(true)
}

/**
 * 上拉加载
 */
const handleLoadMore = async () => {
  if (finished.value) return
  await fetchData(false)
}

/**
 * 清空数据
 */
const handleClearData = () => {
  dataList.value = []
  page.value = 1
  uni.showToast({
    title: '数据已清空',
    icon: 'success',
  })
}

/**
 * 重置数据
 */
const handleResetData = async () => {
  page.value = 1
  await fetchData(true)
  uni.showToast({
    title: '数据已重置',
    icon: 'success',
  })
}

// 初始化数据
fetchData()
</script>

<style lang="scss" scoped>
.temple-header {
  display: flex;
  flex-direction: column;
}

.temple-content {
  min-height: 100vh;
}

.temple-card {
  display: flex;
  flex-direction: column;
}

.temple-feature {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.temple-item {
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
}

.temple-tag {
  min-width: 100rpx;
  text-align: center;
}

.temple-actions {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
