<template>
  <BasePage :has-tabbar="false">
    <template #header>
      <view class="quiz-header-kids">
        <view class="header-left" @click="handleBack">
          <view class="back-btn"><text class="back-icon">←</text></view>
        </view>
        <view class="header-center">
          <text class="header-title-kids">智慧小勇士 🧠</text>
        </view>
        <view class="header-right">
          <view class="score-bubble">
            <text class="score-text">✨ {{ score }}</text>
          </view>
        </view>
      </view>
    </template>

    <view class="quiz-content-kids px-4">
      <!-- 准备界面 -->
      <view v-if="gameState === 'ready'" class="ready-screen-kids">
        <view class="ready-card-kids">
          <view class="ready-icon-box animate-bounce-short">🦉</view>
          <text class="ready-title-kids">知识大闯关</text>
          <text class="ready-desc-kids">准备好了吗？我们要开始智慧冒险啦！</text>
          <view class="start-btn-kids mt-8" @click="startQuiz">
            <text>🚀 确认出发!</text>
          </view>
        </view>
      </view>

      <!-- 答题界面 -->
      <view v-else-if="gameState === 'playing'" class="playing-screen-kids">
        <!-- 进度条 - 铅笔样式 -->
        <view class="progress-section-kids mb-6">
           <view class="pencil-track">
              <view class="pencil-fill" :style="{ width: progressPercent + '%' }"></view>
              <view class="pencil-tip">✏️</view>
           </view>
           <view class="progress-count mt-2">
              <text>{{ currentQuestionIndex + 1 }} / {{ questions.length }}</text>
           </view>
        </view>

        <!-- 问题卡片 - 笔记本样式 -->
        <view class="question-card-kids mb-6">
          <view class="notebook-line"></view>
          <view class="question-header-kids">
            <text class="category-tag">{{ currentQuestion.category }}</text>
            <view class="difficulty-stars">
               <text v-for="i in getDifficultyStars(currentQuestion.difficulty)" :key="i">⭐</text>
            </view>
          </view>
          <text class="question-text-kids">{{ currentQuestion.question }}</text>
        </view>

        <!-- 选项列表 -->
        <view class="options-list-kids">
          <view
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option-bubble"
            :class="{
              'opt-selected': selectedAnswer === index,
              'opt-correct': showResult && index === currentQuestion.correctAnswer,
              'opt-wrong': showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer
            }"
            @click="handleSelectAnswer(index)"
          >
            <view class="option-label-kids">{{ String.fromCharCode(65 + index) }}</view>
            <text class="option-text-kids">{{ option }}</text>
            <view v-if="showResult" class="result-icon-kids">
              <text v-if="index === currentQuestion.correctAnswer">✅</text>
              <text v-else-if="selectedAnswer === index">❌</text>
            </view>
          </view>
        </view>

        <!-- 下一题 -->
        <view v-if="showResult" class="next-action-kids mt-8">
          <view class="btn-next-kids" @click="nextQuestion">
            <text>{{ currentQuestionIndex < questions.length - 1 ? '继续前进 👣' : '查看宝箱 🎁' }}</text>
          </view>
        </view>
      </view>

      <!-- 结束界面 -->
      <view v-else-if="gameState === 'finished'" class="finished-screen-kids">
        <view class="result-card-kids">
          <view class="result-banner">闯关报告</view>
          <view class="result-icon-big">{{ resultEmoji }}</view>
          <text class="result-msg">{{ resultTitle }}</text>
          
          <view class="result-score-box">
             <view class="score-item">
                <text class="s-val">{{ score }}</text>
                <text class="s-lab">获得积分</text>
             </view>
             <view class="score-divider"></view>
             <view class="score-item">
                <text class="s-val">{{ accuracy }}%</text>
                <text class="s-lab">正确率</text>
             </view>
          </view>

          <view class="result-btns-kids mt-8">
            <view class="result-btn restart" @click="restartQuiz">
               <text>再玩一次</text>
            </view>
            <view class="result-btn home" @click="handleBack">
               <text>回岛上</text>
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
import { quizQuestions } from '../../../mock/game-data'
import type { QuizQuestion } from '../../../mock/game-data'

type GameState = 'ready' | 'playing' | 'finished'

const gameState = ref<GameState>('ready')
const questions = ref<QuizQuestion[]>([])
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const showResult = ref(false)
const score = ref(0)
const correctCount = ref(0)

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const progressPercent = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100)
const accuracy = computed(() => questions.value.length > 0 ? Math.round((correctCount.value / questions.value.length) * 100) : 0)

const getDifficultyStars = (difficulty: string) => {
  return difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1
}

const resultEmoji = computed(() => {
  if (accuracy.value >= 80) return '👑'
  if (accuracy.value >= 60) return '🥇'
  return '🎗️'
})

const resultTitle = computed(() => {
  if (accuracy.value >= 80) return '荣誉小才子'
  if (accuracy.value >= 60) return '答题小能手'
  return '继续加油哦'
})

const startQuiz = () => {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5)
  questions.value = shuffled.slice(0, 8)
  currentQuestionIndex.value = 0
  score.value = 0
  correctCount.value = 0
  gameState.value = 'playing'
}

const handleSelectAnswer = (index: number) => {
  if (showResult.value) return
  selectedAnswer.value = index
  showResult.value = true
  
  if (index === currentQuestion.value.correctAnswer) {
    correctCount.value++
    const points = currentQuestion.value.difficulty === 'hard' ? 15 : currentQuestion.value.difficulty === 'medium' ? 10 : 5
    score.value += points
    uni.showToast({ title: '太棒了! 👏', icon: 'none' })
  } else {
    uni.showToast({ title: '差一点点! 💪', icon: 'none' })
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    showResult.value = false
  } else {
    gameState.value = 'finished'
  }
}

const restartQuiz = () => {
  gameState.value = 'ready'
}

const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.quiz-header-kids {
  padding: 28rpx 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FF9FF3;
  border-bottom: 5rpx solid #2D3436;

  .back-btn {
    width: 72rpx;
    height: 72rpx;
    background: #fff;
    border: 4rpx solid #2D3436;
    border-radius: 18rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 4rpx 4rpx 0 #2D3436;

    .back-icon {
      font-size: 32rpx;
      font-weight: 900;
      color: #2D3436;
    }
  }

  .header-title-kids {
    font-size: 32rpx;
    font-weight: 900;
    color: #2D3436;
    text-shadow: 2rpx 2rpx 0 #fff;
  }

  .score-bubble {
    background: #FF6B6B;
    border: 4rpx solid #2D3436;
    padding: 8rpx 20rpx;
    border-radius: 30rpx;
    box-shadow: 4rpx 4rpx 0 #2D3436;
    .score-text { font-size: 26rpx; font-weight: 800; color: #fff; }
  }
}

.quiz-content-kids {
  padding-top: 100rpx;
  background: #FDFEFE;
  min-height: calc(100vh - 140rpx);
}

.ready-screen-kids {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.ready-card-kids {
  background: #fff;
  border: 6rpx solid #2D3436;
  border-radius: 40rpx;
  padding: 60rpx 40rpx;
  text-align: center;
  width: 100%;
  box-shadow: 12rpx 12rpx 0 #FFD93D;

  .ready-icon-box { font-size: 120rpx; margin-bottom: 30rpx; }
  .ready-title-kids { font-size: 48rpx; font-weight: 900; color: #2D3436; display: block; margin-bottom: 20rpx; }
  .ready-desc-kids { font-size: 28rpx; color: #636E72; font-weight: 600; }
  
  .start-btn-kids {
    background: #FF6B6B;
    border: 5rpx solid #2D3436;
    padding: 24rpx 64rpx;
    border-radius: 40rpx;
    font-size: 32rpx;
    font-weight: 900;
    color: #fff;
    box-shadow: 0 6rpx 0 #2D3436;
    text-shadow: 2rpx 2rpx 0 rgba(0,0,0,0.15);
    max-width: 480rpx;
    margin: 0 auto;
    &:active { transform: translateY(4rpx); box-shadow: 0 2rpx 0 #2D3436; }
  }
}

.progress-section-kids {
  .pencil-track {
    height: 40rpx;
    background: #eee;
    border: 4rpx solid #2D3436;
    border-radius: 10rpx;
    position: relative;
    .pencil-fill {
      height: 100%;
      background: #74B9FF;
      transition: width 0.3s ease;
    }
    .pencil-tip {
      position: absolute;
      right: -20rpx;
      top: -10rpx;
      font-size: 40rpx;
    }
  }
  .progress-count {
    text-align: center;
    font-size: 24rpx;
    font-weight: 800;
    color: #2D3436;
  }
}

.question-card-kids {
  background: #fff;
  border: 6rpx solid #2D3436;
  border-radius: 20rpx;
  padding: 40rpx;
  position: relative;
  box-shadow: 8rpx 8rpx 0 rgba(0,0,0,0.05);

  .notebook-line {
    position: absolute;
    top: 20rpx;
    left: 20rpx;
    bottom: 20rpx;
    width: 4rpx;
    background: #FF6B6B;
    opacity: 0.3;
  }

  .question-header-kids {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
    .category-tag {
      background: #A0E9FF;
      border: 2rpx solid #2D3436;
      padding: 4rpx 16rpx;
      border-radius: 10rpx;
      font-size: 22rpx;
      font-weight: 800;
    }
  }

  .question-text-kids {
    font-size: 36rpx;
    font-weight: 900;
    color: #2D3436;
    line-height: 1.6;
    margin-left: 20rpx;
  }
}

.options-list-kids {
  display: flex;
  flex-direction: column;
  gap: 24rpx;

  .option-bubble {
    background: #fff;
    border: 4rpx solid #2D3436;
    border-radius: 30rpx;
    padding: 24rpx 30rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    transition: all 0.1s ease;
    box-shadow: 6rpx 6rpx 0 #eee;

    &:active { transform: translate(4rpx, 4rpx); box-shadow: 0 0 0; }

    .option-label-kids {
      width: 60rpx;
      height: 60rpx;
      background: #F1F2F6;
      border: 2rpx solid #2D3436;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      font-weight: 900;
    }

    .option-text-kids { flex: 1; font-size: 30rpx; font-weight: 700; color: #2D3436; }
    
    &.opt-selected { background: #E0E7FF; border-color: #6366F1; }
    &.opt-correct { background: #D1FAE5; border-color: #10B981; }
    &.opt-wrong { background: #FEE2E2; border-color: #EF4444; }
  }
}

.btn-next-kids {
  background: #FFD93D;
  border: 5rpx solid #2D3436;
  padding: 24rpx 64rpx;
  border-radius: 40rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: 900;
  box-shadow: 0 6rpx 0 #2D3436;
  color: #2D3436;
  max-width: 480rpx;
  margin: 0 auto;
  &:active { transform: translateY(4rpx); box-shadow: 0 2rpx 0 #2D3436; }
}

.result-card-kids {
  background: #fff;
  border: 8rpx solid #2D3436;
  border-radius: 50rpx;
  width: 100%;
  padding: 60rpx 40rpx;
  position: relative;
  text-align: center;
  box-shadow: 15rpx 15rpx 0 #FF9FF3;

  .result-banner {
    position: absolute;
    top: -40rpx;
    left: 50%;
    transform: translateX(-50%);
    background: #FFEE58;
    border: 6rpx solid #2D3436;
    padding: 10rpx 60rpx;
    border-radius: 40rpx;
    font-size: 32rpx;
    font-weight: 900;
  }

  .result-icon-big { font-size: 140rpx; margin: 40rpx 0 20rpx; }
  .result-msg { font-size: 40rpx; font-weight: 900; color: #2D3436; }

  .result-score-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50rpx;
    background: #F8F9FA;
    border: 4rpx solid #2D3436;
    border-radius: 30rpx;
    padding: 30rpx;
    
    .score-item {
      display: flex;
      flex-direction: column;
      .s-val { font-size: 40rpx; font-weight: 900; color: #FF6B6B; }
      .s-lab { font-size: 22rpx; color: #636E72; font-weight: 700; }
    }
    .score-divider { width: 4rpx; height: 60rpx; background: #2D3436; opacity: 0.1; }
  }

  .result-btns-kids {
    display: flex;
    gap: 20rpx;
    .result-btn {
      flex: 1;
      padding: 24rpx;
      border: 4rpx solid #2D3436;
      border-radius: 30rpx;
      font-size: 28rpx;
      font-weight: 900;
      box-shadow: 4rpx 4rpx 0 #2D3436;
      &.restart { background: #9EFFA9; }
      &.home { background: #A0E9FF; }
      &:active { transform: translate(4rpx, 4rpx); box-shadow: 0 0 0; }
    }
  }
}

@keyframes bounce-short {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20rpx); }
}
.animate-bounce-short { animation: bounce-short 1s ease-in-out infinite; }
</style>
