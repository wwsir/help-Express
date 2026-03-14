// pages/have-package/have-package.js
Page({
  data: {
    formData: {
      title: '',
      location: '',
      size: '',
      deadline: '',
      price: '',
      description: ''
    },
    sizeRange: ['小件', '中件', '大件', '特大件'],
    sizeIndex: 0,
    myRequests: [
      {
        id: 1,
        title: '申通快递 - 衣物包裹',
        location: '万达广场快递点',
        deadline: '今天16:00前',
        price: 10,
        status: 'pending',
        statusText: '待接单'
      },
      {
        id: 2,
        title: '圆通快递 - 书籍资料',
        location: '大学城快递柜',
        deadline: '明天14:00前',
        price: 8,
        status: 'accepted',
        statusText: '已接单'
      }
    ]
  },

  onLoad() {
    this.loadMyRequests()
  },

  onTitleInput(e) {
    this.setData({
      'formData.title': e.detail.value
    })
  },

  onLocationInput(e) {
    this.setData({
      'formData.location': e.detail.value
    })
  },

  onSizeChange(e) {
    this.setData({
      sizeIndex: e.detail.value,
      'formData.size': this.data.sizeRange[e.detail.value]
    })
  },

  onDeadlineChange(e) {
    this.setData({
      'formData.deadline': e.detail.value
    })
  },

  onPriceInput(e) {
    this.setData({
      'formData.price': e.detail.value
    })
  },

  onDescriptionInput(e) {
    this.setData({
      'formData.description': e.detail.value
    })
  },

  publishRequest() {
    const { formData } = this.data
    
    // 验证表单
    if (!formData.title) {
      wx.showToast({
        title: '请填写快递信息',
        icon: 'none'
      })
      return
    }

    if (!formData.location) {
      wx.showToast({
        title: '请填写取件地址',
        icon: 'none'
      })
      return
    }

    if (!formData.deadline) {
      wx.showToast({
        title: '请选择取件时间',
        icon: 'none'
      })
      return
    }

    if (!formData.price || formData.price <= 0) {
      wx.showToast({
        title: '请输入正确的服务费用',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '发布中...'
    })

    // 模拟发布请求
    setTimeout(() => {
      wx.hideLoading()
      
      // 添加到我的需求列表
      const newRequest = {
        id: Date.now(),
        title: formData.title,
        location: formData.location,
        deadline: formData.deadline,
        price: parseFloat(formData.price),
        status: 'pending',
        statusText: '待接单',
        description: formData.description
      }
      
      const myRequests = [...this.data.myRequests, newRequest]
      this.setData({
        myRequests,
        formData: {
          title: '',
          location: '',
          size: '',
          deadline: '',
          price: '',
          description: ''
        },
        sizeIndex: 0
      })
      
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })
    }, 1500)
  },

  cancelRequest(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认取消',
      content: '确定要取消这个代取需求吗？',
      success: (res) => {
        if (res.confirm) {
          const myRequests = this.data.myRequests.filter(item => item.id !== id)
          this.setData({ myRequests })
          
          wx.showToast({
            title: '已取消',
            icon: 'success'
          })
        }
      }
    })
  },

  contactHelper(e) {
    const id = e.currentTarget.dataset.id
    const request = this.data.myRequests.find(item => item.id === id)
    
    wx.showModal({
      title: '联系信息',
      content: `代取人员：张三\n联系电话：139****9999\n\n请主动联系确认取件详情`,
      showCancel: false
    })
  },

  loadMyRequests() {
    // 这里可以调用API加载真实数据
    // 目前使用模拟数据
  }
})