// pages/receive-delivery/receive-delivery.js
Page({
  data: {
    // 页面状态控制
    currentPage: 'main', // main: 主页面, publish: 收取快递页面, pickupList: 代取快递列表页面
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
    // 代取快递列表数据
    pickupPackages: [
      {
        id: 1,
        receiverName: '张三',
        phone: '138****8888',
        trackingNumber: 'YTO1234567890',
        pickupCode: '1234',
        company: '圆通快递',
        location: '万达广场快递点',
        status: '待取件',
        selected: false,
        publishTime: '2024-03-14 10:30',
        price: 8
      },
      {
        id: 2,
        receiverName: '李四',
        phone: '139****9999',
        trackingNumber: 'STO9876543210',
        pickupCode: '5678',
        company: '申通快递',
        location: '大学城快递柜',
        status: '待取件',
        selected: false,
        publishTime: '2024-03-14 11:15',
        price: 10
      },
      {
        id: 3,
        receiverName: '王五',
        phone: '136****6666',
        trackingNumber: 'ZTO5432109876',
        pickupCode: '9012',
        company: '中通快递',
        location: 'CBD商务区快递站',
        status: '待取件',
        selected: false,
        publishTime: '2024-03-14 09:45',
        price: 12
      },
      {
        id: 4,
        receiverName: '赵六',
        phone: '137****7777',
        trackingNumber: 'SF1357924680',
        pickupCode: '3456',
        company: '顺丰快递',
        location: '万达广场快递点',
        status: '待取件',
        selected: false,
        publishTime: '2024-03-14 08:20',
        price: 15
      },
      {
        id: 5,
        receiverName: '孙七',
        phone: '135****5555',
        trackingNumber: 'YD2468013579',
        pickupCode: '7890',
        company: '韵达快递',
        location: '村委会服务点',
        status: '待取件',
        selected: false,
        publishTime: '2024-03-14 12:00',
        price: 6
      }
    ],
    selectedCount: 0,
    showConfirmPickup: false,
    waitingPackagesCount: 0,
    allWaitingSelected: false,
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
    isFormValid: false,
    // 发布成功详情模态框
    showSuccessModal: false,
    successDetails: {
      receiverName: '',
      receiverPhone: '',
      trackingNumber: '',
      pickupCode: ''
    },
    // 快递详情模态框
    showDetailModal: false,
    detailModalType: '', // 'request' 或 'package'
    selectedDetail: {}
  },

  onLoad() {
    this.loadData()
    this.updatePickupStats()
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

  // 关闭发布成功模态框
  closeSuccessModal() {
    this.setData({
      showSuccessModal: false,
      successDetails: {
        receiverName: '',
        receiverPhone: '',
        trackingNumber: '',
        pickupCode: ''
      }
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
        this.setData({
          showSuccessModal: true,
          successDetails: {
            receiverName: receiverName,
            receiverPhone: receiverPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            trackingNumber: trackingNumber,
            pickupCode: pickupCode
          }
        })
      }, 1500)
    }, 1500)
  },

  // 查看代取快递列表
  goToHelpExpress() {
    this.setData({
      currentPage: 'pickupList',
      selectedCount: 0
    })
    // 重置所有选择状态
    this.resetSelection()
    this.updatePickupStats()
  },

  // 更新代取统计信息
  updatePickupStats() {
    const waitingPackages = this.data.pickupPackages.filter(item => item.status === '待取件')
    const waitingPackagesCount = waitingPackages.length
    const allWaitingSelected = waitingPackages.length > 0 && waitingPackages.every(item => item.selected)
    
    this.setData({
      waitingPackagesCount,
      allWaitingSelected
    })
  },

  // 返回到代取快递列表页面
  backToPickupList() {
    this.setData({
      currentPage: 'pickupList'
    })
  },

  // 重置选择状态
  resetSelection() {
    const pickupPackages = this.data.pickupPackages.map(item => ({
      ...item,
      selected: false
    }))
    this.setData({
      pickupPackages,
      selectedCount: 0
    })
  },

  // 切换快递选择状态
  togglePackageSelection(e) {
    const id = e.currentTarget.dataset.id
    const pickupPackages = this.data.pickupPackages.map(item => {
      if (item.id === id && item.status === '待取件') {
        return { ...item, selected: !item.selected }
      }
      return item
    })
    
    const selectedCount = pickupPackages.filter(item => item.selected).length
    this.setData({
      pickupPackages,
      selectedCount
    })
    this.updatePickupStats()
  },

  // 全选/取消全选待取件快递
  toggleSelectAll() {
    const waitingPackages = this.data.pickupPackages.filter(item => item.status === '待取件')
    const allWaitingSelected = waitingPackages.every(item => item.selected)
    
    const pickupPackages = this.data.pickupPackages.map(item => {
      if (item.status === '待取件') {
        return { ...item, selected: !allWaitingSelected }
      }
      return item
    })
    
    const selectedCount = allWaitingSelected ? 0 : waitingPackages.length
    this.setData({
      pickupPackages,
      selectedCount
    })
    this.updatePickupStats()
  },

  // 确认取件
  confirmPickup() {
    if (this.data.selectedCount === 0) {
      wx.showToast({
        title: '请选择要取的快递',
        icon: 'none'
      })
      return
    }

    const selectedPackages = this.data.pickupPackages.filter(item => item.selected)
    const totalPrice = selectedPackages.reduce((sum, item) => sum + item.price, 0)
    
    wx.showModal({
      title: '确认取件',
      content: `确定要取这${selectedPackages.length}件快递吗？\n\n总收益：¥${totalPrice}\n\n确认后快递状态将变为"已取件"`,
      success: (res) => {
        if (res.confirm) {
          this.handleConfirmPickup(selectedPackages)
        }
      }
    })
  },

  // 处理确认取件
  handleConfirmPickup(selectedPackages) {
    wx.showLoading({
      title: '处理中...'
    })

    setTimeout(() => {
      // 更新选中快递的状态为"已取件"
      const pickupPackages = this.data.pickupPackages.map(item => {
        const selectedItem = selectedPackages.find(selected => selected.id === item.id)
        if (selectedItem) {
          return { 
            ...item, 
            status: '已取件', 
            selected: false,
            pickupTime: new Date().toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }).replace(/\//g, '-')
          }
        }
        return item
      })

      const totalPrice = selectedPackages.reduce((sum, item) => sum + item.price, 0)
      
      this.setData({
        pickupPackages,
        selectedCount: 0
      })

      wx.hideLoading()
      
      wx.showToast({
        title: '取件成功',
        icon: 'success'
      })

      // 显示取件成功详情
      setTimeout(() => {
        const packageList = selectedPackages.map(item => 
          `• ${item.company} - ${item.receiverName} (¥${item.price})`
        ).join('\n')
        
        wx.showModal({
          title: '取件成功',
          content: `已成功取件 ${selectedPackages.length} 件：\n\n${packageList}\n\n总收益：¥${totalPrice}\n收益将在24小时内到账`,
          showCancel: false
        })
      }, 1500)
    }, 1500)
  },

  // 筛选快递状态
  filterPackages(e) {
    const status = e.currentTarget.dataset.status
    // 这里可以添加筛选逻辑，暂时用toast提示
    wx.showToast({
      title: `筛选${status}快递`,
      icon: 'none'
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
  },

  // 显示代取需求详情
  showRequestDetails(e) {
    const id = e.currentTarget.dataset.id
    const request = this.data.recentRequests.find(item => item.id === id)
    
    if (request) {
      this.setData({
        showDetailModal: true,
        detailModalType: 'request',
        selectedDetail: request
      })
    }
  },

  // 显示快递包裹详情
  showPackageDetails(e) {
    const id = e.currentTarget.dataset.id
    const packageItem = this.data.pickupPackages.find(item => item.id === id)
    
    if (packageItem) {
      this.setData({
        showDetailModal: true,
        detailModalType: 'package',
        selectedDetail: packageItem
      })
    }
  },

  // 关闭详情模态框
  closeDetailModal() {
    this.setData({
      showDetailModal: false,
      detailModalType: '',
      selectedDetail: {}
    })
  },

  // 从详情页面接单
  takeOrderFromDetail(e) {
    const id = e.currentTarget.dataset.id
    this.closeDetailModal()
    // 调用原有的接单函数
    this.takeOrder({ currentTarget: { dataset: { id: id } } })
  },

  // 从详情页面选择单个快递
  selectSinglePackage(e) {
    const id = e.currentTarget.dataset.id
    
    // 关闭详情模态框
    this.closeDetailModal()
    
    // 选择这个快递
    const pickupPackages = this.data.pickupPackages.map(item => {
      if (item.id === id && item.status === '待取件') {
        return { ...item, selected: true }
      } else {
        return { ...item, selected: false }
      }
    })
    
    const selectedCount = pickupPackages.filter(item => item.selected).length
    this.setData({
      pickupPackages,
      selectedCount
    })
    this.updatePickupStats()
    
    wx.showToast({
      title: '已选择此快递',
      icon: 'success'
    })
  }
})
