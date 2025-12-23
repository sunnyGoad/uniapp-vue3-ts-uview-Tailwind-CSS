export interface Activity {
  id: number
  title: string
  date: string
  image: string
  tags: string[]
}

export const mockActivityResponse = {
  code: 200,
  message: '成功',
  data: [
    {
      id: 1,
      title: '和孩子一起探索这个世界...',
      date: '8月7日-8月11日',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      tags: ['出行人', '评学生', '评活动', '相册']
    },
    {
      id: 2,
      title: '和孩子一起探索这个世界',
      date: '8月7日-8月11日',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      tags: ['出行人', '评学生', '评活动', '相册']
    },
    {
      id: 3,
      title: '和孩子一起探索这个世界个世界...',
      date: '8月7日-8月11日',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      tags: ['出行人', '评学生', '评活动', '相册']
    },
    {
      id: 4,
      title: '和孩子一起探索这个世界个世界...',
      date: '8月7日-8月11日',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
      tags: ['出行人', '评学生', '评活动', '相册']
    }
  ]
}
export const mockActivityList = mockActivityResponse.data
