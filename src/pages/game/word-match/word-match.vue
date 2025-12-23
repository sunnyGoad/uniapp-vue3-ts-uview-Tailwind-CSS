<template>
  <BasePage :has-tabbar="false">
    <template #header>
      <view class="game-header-kids">
        <view class="header-left" @click="handleBack">
          <view class="back-btn"><text class="back-icon">←</text></view>
        </view>
        <view class="header-center">
          <text class="header-title-kids">单词碰碰碰 ✨</text>
        </view>
        <view class="header-right">
          <view class="score-bubble">
            <text class="score-text">⭐ {{ score }}</text>
          </view>
        </view>
      </view>
    </template>

    <view class="game-content-kids px-4">
      <!-- 关卡进度条 - 趣味化 -->
      <view class="progress-section-kids mb-6">
         <view class="progress-track">
            <view class="progress-fill" :style="{ width: gameProgress + '%' }">
               <view class="progress-character animate-bounce-short">🏃‍♂️</view>
            </view>
         </view>
         <view class="progress-info mt-2">
            <text class="info-tag">第 {{ currentLevel }} 关</text>
            <text class="info-tag time-tag">⏱️ {{ formatTime(timeElapsed) }}</text>
         </view>
      </view>

      <!-- 卡片网格 -->
      <view class="cards-grid-kids">
        <view
          v-for="(card, index) in cards"
          :key="index"
          class="card-container-kids"
          :class="{
            'card-flipped': card.isFlipped,
            'card-matched': card.isMatched,
            'card-selected': selectedCards.includes(index)
          }"
          @click="handleCardClick(index)"
        >
          <view class="card-inner-kids">
            <!-- 背面 (点击前) -->
            <view class="card-front-kids shadow-sm">
              <text class="question-mark">?</text>
            </view>
            <!-- 正面 (点击后) -->
            <view class="card-back-kids shadow-sm" :style="{ background: getCardColor(card.pairId) }">
              <text class="card-text">{{ card.content }}</text>
            </view>
          </view>
          <view class="card-shadow-kids"></view>
        </view>
      </view>

      <!-- 控制按钮 -->
      <view class="controls-kids mt-8">
        <view 
          v-if="gameState === 'ready' || gameState === 'finished'"
          class="btn-kids btn-primary animate-pulse-slow"
          @click="startGame"
        >
          <text class="btn-text">{{ gameState === 'ready' ? '🚀 开始大冒险' : '🔄 再挑战一次' }}</text>
        </view>
        <view 
          v-else
          class="btn-kids btn-secondary"
          @click="resetGame"
        >
          <text class="btn-text">↻ 重新开始</text>
        </view>
      </view>
    </view>

    <!-- 胜利特效弹窗 -->
    <view v-if="showVictory" class="victory-overlay" @click.stop="">
      <view class="victory-modal animate-bounce-in">
        <view class="modal-header">🎉 太棒啦！🎉</view>
        <view class="victory-kids">
          <view class="victory-icon">🏆</view>
          <text class="victory-title">闯关成功！</text>
          <view class="victory-stats mt-4">
             <view class="victory-stat-box">
                <text class="v-label">获得星星</text>
                <text class="v-value">⭐ {{ score }}</text>
             </view>
             <view class="victory-stat-box">
                <text class="v-label">用时</text>
                <text class="v-value">⏱️ {{ formatTime(timeElapsed) }}</text>
             </view>
          </view>
          <view class="next-btn-kids mt-6" @click="nextLevel">
             <text>下一关 Go! 🚀</text>
          </view>
        </view>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { BasePage } from '@/components/BasePage'
import { wordPairs } from '../../../mock/game-data'

interface Card {
  id: number
  content: string
  pairId: number
  type: 'word' | 'translation'
  isFlipped: boolean
  isMatched: boolean
}

type GameState = 'ready' | 'playing' | 'finished'

const gameState = ref<GameState>('ready')
const currentLevel = ref(1)
const score = ref(0)
const cards = ref<Card[]>([])
const selectedCards = ref<number[]>([])
const timeElapsed = ref(0)
const showVictory = ref(false)
let timer: number | null = null

const remainingPairs = computed(() => {
  return cards.value.filter(card => !card.isMatched).length / 2
})

const gameProgress = computed(() => {
  if (cards.value.length === 0) return 0
  const matched = cards.value.filter(c => c.isMatched).length
  return (matched / cards.value.length) * 100
})

const getCardColor = (pairId: number) => {
  const colors = ['#A0E9FF', '#FFD93D', '#FF9FF3', '#9EFFA9', '#FFB8E1', '#C6B8FF']
  return colors[pairId % colors.length]
}

const initializeCards = () => {
  const pairsCount = Math.min(4 + currentLevel.value, 8) 
  const shuffledPairs = [...wordPairs].sort(() => Math.random() - 0.5)
  const selectedPairs = shuffledPairs.slice(0, pairsCount)
  
  const newCards: Card[] = []
  selectedPairs.forEach(pair => {
    newCards.push({
      id: pair.id * 2,
      content: pair.word,
      pairId: pair.id,
      type: 'word',
      isFlipped: false,
      isMatched: false
    })
    newCards.push({
      id: pair.id * 2 + 1,
      content: pair.translation,
      pairId: pair.id,
      type: 'translation',
      isFlipped: false,
      isMatched: false
    })
  })
  
  cards.value = shuffleArray(newCards)
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const startGame = () => {
  gameState.value = 'playing'
  score.value = 0
  timeElapsed.value = 0
  initializeCards()
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    timeElapsed.value++
  }, 1000) as unknown as number
}

const handleCardClick = (index: number) => {
  if (gameState.value !== 'playing') return
  if (cards.value[index].isFlipped || cards.value[index].isMatched) return
  if (selectedCards.value.length >= 2) return
  
  cards.value[index].isFlipped = true
  selectedCards.value.push(index)
  
  if (selectedCards.value.length === 2) {
    setTimeout(checkMatch, 600)
  }
}

const checkMatch = () => {
  const [first, second] = selectedCards.value
  const card1 = cards.value[first]
  const card2 = cards.value[second]
  
  if (card1.pairId === card2.pairId) {
    card1.isMatched = true
    card2.isMatched = true
    score.value += 10
    
    uni.showToast({
      title: '真棒！🌟',
      icon: 'none',
      duration: 1000
    })
    
    if (remainingPairs.value === 0) {
      setTimeout(() => {
        gameState.value = 'finished'
        showVictory.value = true
        if (timer) clearInterval(timer)
      }, 500)
    }
  } else {
    setTimeout(() => {
      card1.isFlipped = false
      card2.isFlipped = false
    }, 500)
  }
  
  selectedCards.value = []
}

const resetGame = () => {
  if (timer) clearInterval(timer)
  gameState.value = 'ready'
  currentLevel.value = 1
  score.value = 0
  timeElapsed.value = 0
  cards.value = []
}

const nextLevel = () => {
  showVictory.value = false
  currentLevel.value++
  startGame()
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const handleBack = () => {
  uni.navigateBack()
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.game-header-kids {
  padding: 28rpx 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #A0E9FF;
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
    background: #FFD93D;
    border: 4rpx solid #2D3436;
    padding: 8rpx 20rpx;
    border-radius: 30rpx;
    box-shadow: 4rpx 4rpx 0 #2D3436;
    .score-text {
      font-size: 26rpx;
      font-weight: 800;
      color: #2D3436;
    }
  }
}

.game-content-kids {
  padding-top: 100rpx;
  background: #FDFEFE;
  min-height: calc(100vh - 140rpx);
}

.progress-section-kids {
  .progress-track {
    height: 30rpx;
    background: #E2E8F0;
    border: 4rpx solid #2D3436;
    border-radius: 20rpx;
    position: relative;
    overflow: visible;
  }

  .progress-fill {
    height: 100%;
    background: #9EFFA9;
    border-radius: 16rpx;
    position: relative;
    transition: width 0.3s ease;
  }

  .progress-character {
    position: absolute;
    right: -20rpx;
    top: -40rpx;
    font-size: 44rpx;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    .info-tag {
      font-size: 24rpx;
      font-weight: 800;
      color: #2D3436;
      background: #eee;
      padding: 4rpx 20rpx;
      border-radius: 20rpx;
      border: 2rpx solid #2D3436;
    }
    .time-tag { background: #FFB8E1; }
  }
}

.cards-grid-kids {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
  margin-top: 40rpx;

  .card-container-kids {
    position: relative;
    aspect-ratio: 1;
    cursor: pointer;

    .card-inner-kids {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
    }

    .card-shadow-kids {
      position: absolute;
      top: 8rpx;
      left: 8rpx;
      width: 100%;
      height: 100%;
      background: #2D3436;
      border-radius: 24rpx;
      z-index: 1;
    }

    .card-front-kids,
    .card-back-kids {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border: 4rpx solid #2D3436;
      border-radius: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .card-front-kids {
      background: #fff;
      .question-mark {
        font-size: 48rpx;
        font-weight: 900;
        color: #CBD5E1;
      }
    }

    .card-back-kids {
      transform: rotateY(180deg);
      padding: 10rpx;
      .card-text {
        font-size: 24rpx;
        font-weight: 900;
        color: #2D3436;
        text-align: center;
        line-height: 1.2;
      }
    }

    &.card-flipped {
      .card-inner-kids {
        transform: rotateY(180deg) translate(-4rpx, -4rpx);
      }
    }

    &.card-selected .card-inner-kids {
       border-color: #6366f1;
       border-width: 6rpx;
    }

    &.card-matched {
      .card-inner-kids {
        transform: rotateY(180deg) scale(0.95);
        opacity: 0.8;
      }
      .card-shadow-kids { opacity: 0.2; }
    }
  }
}

.controls-kids {
  display: flex;
  justify-content: center;
  
  .btn-kids {
    padding: 24rpx 64rpx;
    border: 5rpx solid #2D3436;
    border-radius: 40rpx;
    box-shadow: 0 6rpx 0 #2D3436;
    position: relative;
    transition: all 0.1s ease;
    max-width: 480rpx;

    &:active {
      transform: translateY(4rpx);
      box-shadow: 0 2rpx 0 #2D3436;
    }

    .btn-text {
      font-size: 32rpx;
      font-weight: 900;
      color: #fff;
      text-shadow: 2rpx 2rpx 0 rgba(0,0,0,0.15);
    }
  }

  .btn-primary { background: #FF6B6B; }
  .btn-secondary { background: #74B9FF; }
}

.victory-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 40rpx;
}

.victory-modal {
  background: #fff;
  border: 6rpx solid #2D3436;
  border-radius: 40rpx;
  width: 100%;
  max-width: 580rpx;
  box-shadow: 12rpx 12rpx 0 rgba(0,0,0,0.2);

  .modal-header {
    background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
    border-bottom: 6rpx solid #2D3436;
    padding: 24rpx;
    text-align: center;
    font-size: 36rpx;
    font-weight: 900;
    color: #2D3436;
    border-radius: 34rpx 34rpx 0 0;
  }
}

.victory-kids {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;

  .victory-icon { font-size: 140rpx; margin-bottom: 20rpx; }
  .victory-title { font-size: 48rpx; font-weight: 900; color: #2D3436; }
  
  .victory-stats {
    display: flex;
    gap: 30rpx;
    .victory-stat-box {
      background: #F1F2F6;
      border: 4rpx solid #2D3436;
      padding: 20rpx;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .v-label { font-size: 22rpx; color: #747D8C; }
      .v-value { font-size: 32rpx; font-weight: 900; color: #2D3436; }
    }
  }

  .next-btn-kids {
    background: #9EFFA9;
    border: 6rpx solid #2D3436;
    padding: 24rpx 60rpx;
    border-radius: 40rpx;
    font-size: 34rpx;
    font-weight: 900;
    color: #2D3436;
    box-shadow: 6rpx 6rpx 0 #2D3436;
    &:active { transform: translate(4rpx, 4rpx); box-shadow: 2rpx 2rpx 0 #2D3436; }
  }
}

// 动画
@keyframes bounce-short {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10rpx); }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.animate-bounce-short { animation: bounce-short 0.6s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 2s infinite; }
.animate-bounce-in { animation: bounce-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}
</style>
