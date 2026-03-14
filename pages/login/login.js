// pages/login/login.js
const app = getApp()

Page({
  data: {},

  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      // 用户同意授权
      const userInfo = e.detail.userInfo
      app.login(userInfo)
      
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } else {
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    }
  },

  guestLogin() {
    const guestInfo = {
      nickName: '游客用户',
      avatarUrl: '',
      gender: 0,
      country: '',
      province: '',
      city: ''
    }
    
    app.login(guestInfo)
    
    wx.showToast({
      title: '游客登录成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})