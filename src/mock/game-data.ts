/**
 * 游戏数据配置
 */

// 单词消消乐 - 单词对数据
export interface WordPair {
  id: number
  word: string
  translation: string
  category: 'basic' | 'intermediate' | 'advanced'
}

export const wordPairs: WordPair[] = [
  // 基础级别
  { id: 1, word: 'Apple', translation: '苹果', category: 'basic' },
  { id: 2, word: 'Book', translation: '书', category: 'basic' },
  { id: 3, word: 'Cat', translation: '猫', category: 'basic' },
  { id: 4, word: 'Dog', translation: '狗', category: 'basic' },
  { id: 5, word: 'Egg', translation: '鸡蛋', category: 'basic' },
  { id: 6, word: 'Fish', translation: '鱼', category: 'basic' },
  { id: 7, word: 'Girl', translation: '女孩', category: 'basic' },
  { id: 8, word: 'House', translation: '房子', category: 'basic' },
  
  // 中级
  { id: 9, word: 'Teacher', translation: '老师', category: 'intermediate' },
  { id: 10, word: 'Student', translation: '学生', category: 'intermediate' },
  { id: 11, word: 'School', translation: '学校', category: 'intermediate' },
  { id: 12, word: 'Library', translation: '图书馆', category: 'intermediate' },
  { id: 13, word: 'Computer', translation: '电脑', category: 'intermediate' },
  { id: 14, word: 'Science', translation: '科学', category: 'intermediate' },
  { id: 15, word: 'History', translation: '历史', category: 'intermediate' },
  { id: 16, word: 'Mathematics', translation: '数学', category: 'intermediate' },
]

// 答题闯关 - 题目数据
export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '下列哪个是编程语言？',
    options: ['Photoshop', 'Python', 'PowerPoint', 'Premiere'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: '计算机'
  },
  {
    id: 2,
    question: '中国的首都是？',
    options: ['上海', '广州', '北京', '深圳'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: '地理'
  },
  {
    id: 3,
    question: 'HTML的全称是？',
    options: ['Hyperlinks and Text Markup Language', 'HyperText Markup Language', 'Home Tool Markup Language', 'Hypermedia Transfer Markup Language'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: '计算机'
  },
  {
    id: 4,
    question: '地球绕太阳公转一周大约需要多长时间？',
    options: ['365天', '366天', '360天', '370天'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: '科学'
  },
  {
    id: 5,
    question: '以下哪个不是Vue3的新特性？',
    options: ['Composition API', 'Teleport', 'Fragments', 'Class Components'],
    correctAnswer: 3,
    difficulty: 'hard',
    category: '前端开发'
  },
  {
    id: 6,
    question: '"知之为知之，不知为不知，是知也"出自哪里？',
    options: ['《论语》', '《孟子》', '《大学》', '《中庸》'],
    correctAnswer: 0,
    difficulty: 'medium',
    category: '国学'
  },
  {
    id: 7,
    question: 'TypeScript是由哪家公司开发的？',
    options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: '计算机'
  },
  {
    id: 8,
    question: '以下哪个不是HTTP请求方法？',
    options: ['GET', 'POST', 'SEND', 'DELETE'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: '计算机'
  },
]

// 游戏类型
export interface GameType {
  id: string
  name: string
  description: string
  icon: string
  color: string
  route: string
}

export const gameTypes: GameType[] = [
  {
    id: 'word-match',
    name: '单词消消乐',
    description: '翻开卡片，找到匹配的中英文单词对',
    icon: '🎯',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    route: '/pages/game/word-match/word-match'
  },
  {
    id: 'quiz',
    name: '趣味闯关',
    description: '回答问题，挑战你的知识储备',
    icon: '🧠',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    route: '/pages/game/quiz/quiz'
  }
]
