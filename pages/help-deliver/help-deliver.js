// pages/help-deliver/help-deliver.js
Page({
  data: {
    distanceRange: ['1公里内', '3公里内', '5公里内', '不限'],
    distanceIndex: 0,
    priceRange: ['不限', '5元以上', '10元以上', '20元以上'],
    priceIndex: 0,
    packageList: [
      {
        id: 1,
        title: '中通快递 - 生活用品',
        location: '阳光小区快递柜',
        size: '中件',
        deadline: '今天18:00前',
        description: '需要帮忙取一个中等大小的包裹，不重',
        price: 8
      },
      {
        id: 2,
        title: '顺丰快递 - 文件资料',
        location: 'CBD商务大厦',
        size: '小件',
        deadline: '明天12:00前',
        description: '重要文件，需要当面签收',
        price: 15
      },
      {
        id: 3,
        title: '韵达快递 - 电子产品',
        location: '科技园区',
        size: '大件',
        deadline: '后天16:00前',
        description: '电脑配件，有点重，需要小心搬运',
        price: 25
      }
    ]
  },

  onLoad() {
    this.loadPackageList()
  },

  onDistanceChange(e) {
    this.setData({
      distanceIndex: e.detail.value
    })
    this.filterPackages()
  },

  onPriceChange(e) {
    this.setData({
      priceIndex: e.detail.value
    })
    this.filterPackages()
  },

  filterPackages() {
    // 这里可以根据筛选条件过滤数据
    // 暂时显示所有数据
    wx.showToast({
      title: '筛选条件已更新',
      icon: 'success'
    })
  },

  selectPackage(e) {
    const id = e.currentTarget.dataset.id
    const selectedPackage = this.data.packageList.find(item => item.id === id)
    
    wx.showModal({
      title: '接单确认',
      content: `确定要接取"${selectedPackage.title}"吗？服务费：¥${selectedPackage.price}元`,
      success: (res) => {
        if (res.confirm) {
          this.acceptOrder(selectedPackage)
        }
      }
    })
  },

  acceptOrder(packageInfo) {
    wx.showToast({
      title: '接单成功',
      icon: 'success'
    })
    
    // 模拟接单成功后的操作
    setTimeout(() => {
      wx.showModal({
        title: '联系信息',
        content: `请联系寄件人：138****8888\n取件地址：${packageInfo.location}`,
        showCancel: false
      })
    }, 1500)
  },

  refreshList() {
    wx.showLoading({
      title: '刷新中...'
    })
    
    // 模拟刷新数据
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '刷新完成',
        icon: 'success'
      })
    }, 1000)
  },

  loadPackageList() {
    // 这里可以调用API加载真实数据
    // 目前使用模拟数据
  }
})