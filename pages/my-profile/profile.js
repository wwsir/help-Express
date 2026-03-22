// pages/my-profile/profile.js
const app = getApp()

Page({
  data: {
    isLoggedIn: false,
    userInfo: {},
    stats: {
      helpCount: 0,
      publishCount: 0,
      totalEarning: 0,
      rating: 5.0,
      myReceiveOrders: 0,
      myHelpOrders: 0
    }
  },

  onLoad() {
    this.checkLoginStatus()
  },

  onShow() {
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
      userInfo: app.globalData.userInfo
    })
  },

  goToLogin() {
    wx.showModal({
      title: '用户登录',
      content: '请选择登录方式：\n\n• 微信授权登录\n• 手机号码登录\n• 游客模式体验\n\n登录后可享受更多个性化服务！',
      confirmText: '微信登录',
      cancelText: '游客模式',
      success: (res) => {
        if (res.confirm) {
          // 模拟微信登录
          wx.showLoading({ title: '登录中...' })
          setTimeout(() => {
            wx.hideLoading()
            // 模拟登录成功
            getApp().globalData.isLoggedIn = true
            getApp().globalData.userInfo = {
              nickName: '微信用户',
              avatarUrl: '/images/default-avatar.png'
            }
            this.checkLoginStatus()
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
          }, 1500)
        } else {
          // 游客模式
          wx.showToast({
            title: '进入游客模式',
            icon: 'none'
          })
        }
      }
    })
  },

  goToMyOrders() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  goToSettings() {
    wx.showActionSheet({
      itemList: ['消息通知', '隐私设置', '账号安全', '清除缓存'],
      success: (res) => {
        const actions = ['消息通知', '隐私设置', '账号安全', '清除缓存']
        wx.showToast({
          title: `${actions[res.tapIndex]}功能开发中`,
          icon: 'none'
        })
      }
    })
  },

  goToHelp() {
    wx.showModal({
      title: '帮助中心',
      content: '1. 如何发布代取需求？\n2. 如何接单帮取快递？\n3. 服务费用标准\n4. 安全保障措施\n\n如需更多帮助，请联系：微信群主',
      showCancel: false
    })
  },

  goToAbout() {
    wx.showModal({
      title: '关于快递互助',
      content: '快递帮取是一个互助服务平台，致力于为用户提供便捷的快递代取服务。\n\n版本：v1.0.0\n开发者：快递互助团队',
      showCancel: false
    })
  },

  // 维护代取员
  goToMaintainCouriers() {
    wx.showModal({
      title: '维护代取员',
      content: '代取员管理功能：\n\n• 查看代取员列表\n• 添加新代取员\n• 编辑代取员信息\n• 设置代取员状态\n• 查看代取员评价\n• 管理服务区域\n\n功能正在开发中...',
      showCancel: false
    })
  },

  // 我的收取快递
  goToMyReceiveOrders() {
    wx.showModal({
      title: '我的收取快递',
      content: '这里将显示您发布的代取快递需求：\n\n• 待接单：2个\n• 进行中：1个\n• 已完成：15个\n• 已取消：1个\n\n功能正在开发中...',
      showCancel: false
    })
  },

  // 我的代取快递
  goToMyHelpOrders() {
    wx.showModal({
      title: '我的代取快递',
      content: '这里将显示您接取的帮助订单：\n\n• 进行中：3个\n• 已完成：28个\n• 获得好评：26个\n• 服务评分：4.9分\n\n功能正在开发中...',
      showCancel: false
    })
  },

  handleLogout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout()
          this.checkLoginStatus()
          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  }
})