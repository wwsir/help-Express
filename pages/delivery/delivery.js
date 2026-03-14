// pages/delivery/delivery.js
Page({
  data: {
    recentRequests: [
      {
        id: 1,
        title: '申通快递 - 电子产品',
        location: '万达广场快递点',
        time: '今天15:00前',
        price: 12
      },
      {
        id: 2,
        title: '圆通快递 - 衣物包裹',
        location: '大学城快递柜',
        time: '明天10:00前',
        price: 8
      },
      {
        id: 3,
        title: '中通快递 - 文件资料',
        location: 'CBD商务区',
        time: '今天18:00前',
        price: 15
      }
    ],
    stats: {
      todayRequests: 28,
      activeHelpers: 156,
      avgPrice: '¥10',
      avgTime: '30分钟'
    }
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.refreshData()
  },

  onPullDownRefresh() {
    this.refreshData()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  // 跳转到收取快递页面
  goToReceive() {
    wx.navigateTo({
      url: '/pages/have-package/have-package'
    })
  },

  // 跳转到代取快递页面
  goToHelp() {
    wx.navigateTo({
      url: '/pages/help-deliver/help-deliver'
    })
  },

  // 查看所有需求
  viewAllRequests() {
    wx.navigateTo({
      url: '/pages/help-deliver/help-deliver'
    })
  },

  // 接单操作
  takeOrder(e) {
    const id = e.currentTarget.dataset.id
    const request = this.data.recentRequests.find(item => item.id === id)
    
    wx.showModal({
      title: '确认接单',
      content: `确定要接取"${request.title}"吗？\n\n取件地址：${request.location}\n完成时间：${request.time}\n服务费用：¥${request.price}`,
      success: (res) => {
        if (res.confirm) {
          this.handleTakeOrder(id)
        }
      }
    })
  },

  // 处理接单
  handleTakeOrder(id) {
    wx.showLoading({
      title: '接单中...'
    })

    // 模拟接单请求
    setTimeout(() => {
      wx.hideLoading()
      
      // 从列表中移除已接取的订单
      const recentRequests = this.data.recentRequests.filter(item => item.id !== id)
      this.setData({ recentRequests })
      
      wx.showToast({
        title: '接单成功',
        icon: 'success'
      })

      // 显示联系信息
      setTimeout(() => {
        wx.showModal({
          title: '接单成功',
          content: '请联系发布者确认取件详情\n\n联系人：李先生\n联系电话：138****8888\n\n请按时完成取件任务',
          showCancel: false
        })
      }, 1500)
    }, 1000)
  },

  // 加载数据
  loadData() {
    // 这里可以调用API加载真实数据
    this.updateStats()
  },

  // 刷新数据
  refreshData() {
    this.updateStats()
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1000
    })
  },

  // 更新统计数据
  updateStats() {
    const stats = {
      todayRequests: Math.floor(Math.random() * 20) + 20,
      activeHelpers: Math.floor(Math.random() * 50) + 100,
      avgPrice: '¥' + (Math.floor(Math.random() * 10) + 8),
      avgTime: (Math.floor(Math.random() * 20) + 20) + '分钟'
    }
    this.setData({ stats })
  }
})