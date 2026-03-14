// pages/index/index.js
const app = getApp()

Page({
  data: {
    isLoggedIn: false,
    userInfo: null
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

  // 跳转到我帮取快递页面
  goToHelpDeliver() {
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/help-deliver/help-deliver'
    })
  },

  // 跳转到我有快递页面
  goToHavePackage() {
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/have-package/have-package'
    })
  },

  // 处理登录
  handleLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  // 处理登出
  handleLogout() {
    wx.showModal({
      title: '确认登出',
      content: '确定要登出当前账号吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout()
          this.checkLoginStatus()
          wx.showToast({
            title: '已登出',
            icon: 'success'
          })
        }
      }
    })
  }
})