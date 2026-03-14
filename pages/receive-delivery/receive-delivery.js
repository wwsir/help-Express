// pages/receive-delivery/receive-delivery.js
Page({
  data: {
    // 页面状态控制
    currentPage: 'main', // main: 主页面, publish: 收取快递页面
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
    },
    // 发布表单控制
    showPublishForm: false,
    publishForm: {
      receiverName: '',
      receiverPhone: '',
      trackingNumber: '',
      pickupCode: ''
    },
    isFormValid: false
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

  // 点击收取快递，进入收取快递页面
  goToReceiveExpress() {
    this.setData({
      currentPage: 'publish'
    })
  },

  // 返回主页面
  backToMain() {
    this.setData({
      currentPage: 'main'
    })
  },

  // 选择文字发布，直接弹出表单
  selectTextPublish() {
    this.setData({
      showPublishForm: true
    })
  },

  // 选择图片发布（暂未实现）
  selectImagePublish() {
    wx.showToast({
      title: '图片发布功能开发中',
      icon: 'none'
    })
  },

  // 关闭发布表单
  closePublishForm() {
    this.setData({
      showPublishForm: false,
      publishForm: {
        receiverName: '',
        receiverPhone: '',
        trackingNumber: '',
        pickupCode: ''
      },
      isFormValid: false
    })
  },

  // 表单输入处理
  onReceiverNameInput(e) {
    this.setData({
      'publishForm.receiverName': e.detail.value
    })
    this.validateForm()
  },

  onReceiverPhoneInput(e) {
    this.setData({
      'publishForm.receiverPhone': e.detail.value
    })
    this.validateForm()
  },

  onTrackingNumberInput(e) {
    this.setData({
      'publishForm.trackingNumber': e.detail.value
    })
    this.validateForm()
  },

  onPickupCodeInput(e) {
    this.setData({
      'publishForm.pickupCode': e.detail.value
    })
    this.validateForm()
  },

  // 验证表单
  validateForm() {
    const { receiverName, receiverPhone, trackingNumber, pickupCode } = this.data.publishForm
    const isValid = receiverName.trim() && 
                   receiverPhone.trim() && 
                   trackingNumber.trim() && 
                   pickupCode.trim() &&
                   /^1[3-9]\d{9}$/.test(receiverPhone.trim()) // 简单手机号验证
    
    this.setData({
      isFormValid: isValid
    })
  },

  // 提交发布表单
  submitPublishForm() {
    const { receiverName, receiverPhone, trackingNumber, pickupCode } = this.data.publishForm
    
    wx.showLoading({
      title: '发布中...'
    })

    // 模拟发布请求
    setTimeout(() => {
      wx.hideLoading()
      
      // 重置表单
      this.closePublishForm()
      
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })

      // 显示发布成功详情
      setTimeout(() => {
        wx.showModal({
          title: '发布成功',
          content: `收件信息已发布：\n\n收件人：${receiverName}\n手机号：${receiverPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}\n快递单号：${trackingNumber}\n取件码：${pickupCode}\n\n等待好心人帮您代取！`,
          showCancel: false
        })
      }, 1500)
    }, 1500)
  },

  // 查看代取快递列表
  goToHelpExpress() {
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