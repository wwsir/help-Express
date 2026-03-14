// app.js
App({
  globalData: {
    userInfo: null,
    isLoggedIn: false
  },
  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查登录状态
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('token')
    if (token) {
      this.globalData.isLoggedIn = true
    }
  },

  login(userInfo) {
    this.globalData.userInfo = userInfo
    this.globalData.isLoggedIn = true
    // 这里可以调用后端API保存用户信息
    wx.setStorageSync('token', 'mock_token_' + Date.now())
    wx.setStorageSync('userInfo', userInfo)
  },

  logout() {
    this.globalData.userInfo = null
    this.globalData.isLoggedIn = false
    wx.removeStorageSync('token')
    wx.removeStorageSync('userInfo')
  }
})