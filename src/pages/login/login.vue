<template>
  <view class="login-container min-h-screen bg-white relative flex flex-col">
    <!-- 顶部橙色背景 -->
    <view class="header-section relative w-full h-[500rpx]">
      <view class="header-content p-10 pt-[120rpx]">
        <view class="welcome-text">欢迎登录</view>
        <view class="sub-title">学生助教小程序</view>
      </view>
      <!-- 插画图片 -->
      <image
        src="https://img.js.design/assets/img/65321f57f59d4134816c74d4.png"
        class="header-illustration"
        mode="aspectFit"
      />
    </view>

    <!-- 登录内容区 -->
    <view class="content-wrapper flex-1 bg-white px-8 pt-10 relative">
      <!-- Tab 切换 -->
      <view class="tab-container flex justify-around mb-10">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          class="tab-item"
          :class="{ active: currentTab === index }"
          @click="currentTab = index"
        >
          <text class="tab-text">{{ item }}</text>
          <view v-if="currentTab === index" class="tab-line"></view>
        </view>
      </view>

      <!-- 账号登录 -->
      <view v-if="currentTab === 0" class="login-form">
        <view class="input-item mb-6">
          <u-input
            v-model="loginForm.account"
            placeholder="请输入账号"
            border="none"
            class="custom-input"
            prefixIcon="account"
          ></u-input>
        </view>
        <view class="input-item mb-10">
          <u-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            border="none"
            class="custom-input"
            type="password"
            prefixIcon="lock"
          ></u-input>
        </view>
      </view>

      <!-- 验证码登录 -->
      <view v-else class="login-form">
        <view class="input-item mb-6">
          <u-input
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            border="none"
            class="custom-input"
            prefixIcon="phone"
          ></u-input>
        </view>
        <view class="input-item mb-10">
          <u-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            border="none"
            class="custom-input"
            prefixIcon="lock"
          >
            <template #suffix>
              <view class="code-btn-wrap">
                <u-code
                  ref="uCode"
                  @change="codeChange"
                  seconds="60"
                  changeText="X秒重新获取"
                ></u-code>
                <text class="code-tips" @click="getCode">{{ tips }}</text>
              </view>
            </template>
          </u-input>
        </view>
      </view>

      <!-- 登录按钮 -->
      <view class="submit-btn-wrap mb-4">
        <u-button
          text="登录"
          class="custom-submit-btn"
          @click="handleLogin"
        ></u-button>
      </view>

      <!-- 忘记密码 -->
      <view v-if="currentTab === 0" class="flex justify-center text-[#999] text-[26rpx] mb-10">
        <view class="flex items-center" @click="handleForgot">
          <u-icon name="lock" size="14" color="#999" class="mr-1"></u-icon>
          <text>忘记密码？</text>
        </view>
      </view>
    </view>

    <!-- 底部协议 -->
    <view class="footer-agreement w-full pb-10 px-10 flex items-center justify-center">
      <view class="flex items-center" @click="isAgreed = !isAgreed">
        <view
          class="checkbox-box mr-2"
          :class="{ checked: isAgreed }"
        >
          <u-icon v-if="isAgreed" name="checkbox-mark" size="10" color="white"></u-icon>
        </view>
        <view class="text-[24rpx] text-[#999]">
          已阅读并同意 <text class="text-[#FF7E01]" @click.stop="handleAgreement">《用户协议》</text> 和 <text class="text-[#FF7E01]" @click.stop="handlePrivacy">《隐私政策》</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const tabs = ['账号登录', '验证码登录']
const currentTab = ref(0)
const isAgreed = ref(false)
const tips = ref('获取验证码')
const uCode = ref()

const loginForm = reactive({
  account: '',
  password: '',
  phone: '',
  code: ''
})

const codeChange = (text: string) => {
  tips.value = text
}

const getCode = () => {
  if (uCode.value.canGetCode) {
    uni.showLoading({ title: '正在获取验证码' })
    setTimeout(() => {
      uni.hideLoading()
      uCode.value.start()
    }, 1000)
  } else {
    uni.showToast({ title: '请稍后重试', icon: 'none' })
  }
}

const handleLogin = () => {
  if (!isAgreed.value) {
    return uni.showToast({ title: '请先阅读并同意用户协议', icon: 'none' })
  }
  
  if (currentTab.value === 0) {
    if (!loginForm.account || !loginForm.password) {
      return uni.showToast({ title: '请输入账号和密码', icon: 'none' })
    }
  } else {
    if (!loginForm.phone || !loginForm.code) {
      return uni.showToast({ title: '请输入手机号和验证码', icon: 'none' })
    }
  }

  uni.showLoading({ title: '登录中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/index/index' })
    }, 1500)
  }, 1500)
}

const handleForgot = () => {
  uni.showToast({ title: '功能开发中', icon: 'none' })
}

const handleAgreement = () => {
  uni.showToast({ title: '用户协议', icon: 'none' })
}

const handlePrivacy = () => {
  uni.showToast({ title: '隐私政策', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #fff;
}

.header-section {
  background: linear-gradient(135deg, #FF9D41 0%, #FF7E01 100%);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  
  .welcome-text {
    font-size: 48rpx;
    font-weight: bold;
    color: #fff;
    margin-bottom: 16rpx;
  }
  
  .sub-title {
    font-size: 44rpx;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }
  
  .header-illustration {
    position: absolute;
    right: 40rpx;
    bottom: 20rpx;
    width: 320rpx;
    height: 240rpx;
    z-index: 1;
  }
}

.content-wrapper {
  margin-top: -60rpx;
  border-top-left-radius: 60rpx;
  border-top-right-radius: 60rpx;
  background-color: #fff;
  z-index: 2;
  box-shadow: 0 -10rpx 40rpx rgba(0, 0, 0, 0.05);
}

.tab-container {
  .tab-item {
    position: relative;
    padding-bottom: 20rpx;
    
    .tab-text {
      font-size: 32rpx;
      color: #999;
      transition: all 0.3s;
    }
    
    &.active {
      .tab-text {
        color: #333;
        font-weight: bold;
      }
      
      .tab-line {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 6rpx;
        background-color: #FF7E01;
        border-radius: 6rpx;
      }
    }
  }
}

.custom-input {
  background-color: #F7F8FA !important;
  border-radius: 50rpx !important;
  height: 100rpx !important;
  padding: 0 40rpx !important;
  
  :deep(.u-input__content) {
    height: 100% !important;
  }
  
  :deep(.u-input__prefix-icon) {
    color: #999 !important;
    font-size: 40rpx !important;
    margin-right: 20rpx !important;
  }
}

.code-btn-wrap {
  display: flex;
  align-items: center;
  height: 100%;
  border-left: 2rpx solid #E5E7EB;
  padding-left: 30rpx;
  margin-left: 20rpx;
  
  .code-tips {
    color: #FF7E01;
    font-size: 28rpx;
  }
}

.submit-btn-wrap {
  .custom-submit-btn {
    width: 100% !important;
    height: 100rpx !important;
    background: linear-gradient(to right, #FFBD71, #FF8E1B) !important;
    color: #fff !important;
    border: none !important;
    border-radius: 50rpx !important;
    font-size: 32rpx !important;
    font-weight: bold !important;
    box-shadow: 0 10rpx 30rpx rgba(255, 126, 1, 0.2) !important;
    
    &:active {
      opacity: 0.8 !important;
    }
  }
}

.checkbox-box {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 2rpx solid #D1D5DB;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &.checked {
    background-color: #FF7E01;
    border-color: #FF7E01;
  }
}
</style>
