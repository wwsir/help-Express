// pages/receive-delivery/receive-delivery.js
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

  // 发布收取快递需求
  goToReceive() {
    wx.showModal({
      title: '发布代取需求',
      content: '请填写您的快递信息：\n\n• 快递公司：申通快递\n• 取件码：1234\n• 收件人：张先生\n• 联系电话：138****1234\n• 取件地址：万达广场快递点\n• 期望时间：今天下午\n• 服务费用：¥12\n\n发布成功后，会有热心用户帮您代取！',
      showCancel: false,
      success: () => {
        wx.showToast({
          title: '发布成功',
          icon: 'success'
        })
      }
    })
  },

  // 查看代取快递列表
  goToHelp() {
    wx.showActionSheet({
      itemList: ['查看全部需求', '我的接单记录', '收益统计'],
      success: (res) => {
        const actions = ['查看代取需求列表', '查看我的接单记录', '查看收益统计']
        wx.showToast({
          title: `${actions[res.tapIndex]}功能开发中`,
          icon: 'none'
        })
      }
    })
  },

  // 查看所有需求
  viewAllRequests() {
    wx.showModal({
      title: '全部代取需求',
      content: '这里将显示所有待接取的快递需求：\n\n• 申通快递 - 电子产品 (¥12)\n• 圆通快递 - 衣物包裹 (¥8)\n• 中通快递 - 文件资料 (¥15)\n• 韵达快递 - 生活用品 (¥10)\n• 顺丰快递 - 重要文件 (¥20)\n\n更多需求正在加载中...',
      showCancel: false
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