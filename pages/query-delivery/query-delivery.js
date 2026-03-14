// pages/query-delivery/query-delivery.js
Page({
  data: {
    companyList: [
      { name: '自动识别', code: 'auto' },
      { name: '顺丰速运', code: 'sf' },
      { name: '中通快递', code: 'zt' },
      { name: '圆通速递', code: 'yt' },
      { name: '申通快递', code: 'st' },
      { name: '韵达快递', code: 'yd' },
      { name: '百世快递', code: 'bs' },
      { name: '京东物流', code: 'jd' },
      { name: '邮政EMS', code: 'ems' }
    ],
    companyIndex: 0,
    trackingNumber: '',
    isQuerying: false,
    queryResult: null,
    queryHistory: [],
    showNoResult: false
  },

  onLoad() {
    this.loadQueryHistory()
  },

  // 快递公司选择
  onCompanyChange(e) {
    this.setData({
      companyIndex: e.detail.value
    })
  },

  // 快递单号输入
  onTrackingNumberInput(e) {
    this.setData({
      trackingNumber: e.detail.value.trim(),
      queryResult: null,
      showNoResult: false
    })
  },

  // 查询快递
  queryExpress() {
    const { trackingNumber, companyIndex, companyList } = this.data
    
    if (!trackingNumber) {
      wx.showToast({
        title: '请输入快递单号',
        icon: 'none'
      })
      return
    }

    this.setData({ 
      isQuerying: true,
      queryResult: null,
      showNoResult: false
    })

    // 模拟API查询
    setTimeout(() => {
      this.mockQueryAPI(trackingNumber, companyList[companyIndex])
    }, 1500)
  },

  // 模拟查询API
  mockQueryAPI(trackingNumber, company) {
    // 模拟成功和失败的情况
    const isSuccess = Math.random() > 0.3 // 70%成功率

    if (isSuccess) {
      const result = {
        status: this.getRandomStatus(),
        company: company.name,
        trackingNumber: trackingNumber,
        updateTime: this.formatTime(new Date()),
        timeline: this.generateMockTimeline()
      }

      this.setData({
        isQuerying: false,
        queryResult: result,
        showNoResult: false
      })

      // 保存到查询历史
      this.saveToHistory(trackingNumber, company.name)

      wx.showToast({
        title: '查询成功',
        icon: 'success'
      })
    } else {
      this.setData({
        isQuerying: false,
        queryResult: null,
        showNoResult: true
      })

      wx.showToast({
        title: '查询失败',
        icon: 'none'
      })
    }
  },

  // 生成随机状态
  getRandomStatus() {
    const statuses = ['运输中', '派送中', '已签收', '待取件', '已发货']
    return statuses[Math.floor(Math.random() * statuses.length)]
  },

  // 生成模拟时间轴
  generateMockTimeline() {
    const timeline = [
      {
        time: '2024-03-14 09:30:15',
        desc: '快件已到达【北京朝阳区分拣中心】',
        location: '北京朝阳区'
      },
      {
        time: '2024-03-14 07:15:32',
        desc: '快件离开【北京转运中心】已发往【北京朝阳区分拣中心】',
        location: '北京转运中心'
      },
      {
        time: '2024-03-13 23:45:18',
        desc: '快件到达【北京转运中心】',
        location: '北京转运中心'
      },
      {
        time: '2024-03-13 18:20:41',
        desc: '快件离开【上海松江区】已发往【北京转运中心】',
        location: '上海松江区'
      },
      {
        time: '2024-03-13 15:08:26',
        desc: '快件已在【上海松江区】揽收完成',
        location: '上海松江区'
      }
    ]
    
    // 随机返回3-5条记录
    const count = Math.floor(Math.random() * 3) + 3
    return timeline.slice(0, count)
  },

  // 保存查询历史
  saveToHistory(trackingNumber, company) {
    const history = this.data.queryHistory
    const newItem = {
      id: Date.now(),
      trackingNumber: trackingNumber,
      company: company,
      queryTime: this.formatTime(new Date())
    }

    // 避免重复，移除相同单号
    const filteredHistory = history.filter(item => item.trackingNumber !== trackingNumber)
    
    // 添加到开头，最多保留10条
    const updatedHistory = [newItem, ...filteredHistory].slice(0, 10)

    this.setData({ queryHistory: updatedHistory })
    
    // 保存到本地存储
    wx.setStorageSync('queryHistory', updatedHistory)
  },

  // 加载查询历史
  loadQueryHistory() {
    try {
      const history = wx.getStorageSync('queryHistory') || []
      this.setData({ queryHistory: history })
    } catch (e) {
      console.log('加载查询历史失败', e)
    }
  },

  // 快速查询
  quickQuery(e) {
    const item = e.currentTarget.dataset.item
    const companyIndex = this.data.companyList.findIndex(company => company.name === item.company)
    
    this.setData({
      trackingNumber: item.trackingNumber,
      companyIndex: companyIndex >= 0 ? companyIndex : 0
    })

    // 自动查询
    setTimeout(() => {
      this.queryExpress()
    }, 100)
  },

  // 清空查询历史
  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清空查询历史吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ queryHistory: [] })
          wx.removeStorageSync('queryHistory')
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    
    return `${year}-${month}-${day} ${hour}:${minute}`
  }
})