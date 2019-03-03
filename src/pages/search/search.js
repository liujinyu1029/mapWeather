var amapFile = require('../../libs/amap-wx.js');
// 高德key
const mapKey = '04f82e56c0fd2d2c504749f0ea1480c0';
// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 出发还是目标 origin | destination
    inputType: 'origin',
    tips: {},
    originLocation: '',
    destinationLocation: '',
    originInputValue: '',
    destinationInputValue: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(' ---------- onLoad ----------')
    console.dir(app.data)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log(' ---------- onPullDownRefresh ----------')
  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var type = e.target.dataset.type;
    var myAmapFun = new amapFile.AMapWX({ key: mapKey });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function (data) {
        if (data && data.tips) {
          var dataIncludeLocation = data.tips.filter((v) => typeof v.location === 'string');
          console.log(dataIncludeLocation)
          that.setData({
            tips: dataIncludeLocation,
            inputType: type
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var location = e.target.dataset.location;
    if (this.data.inputType === 'origin') {
      this.setData({
        originInputValue: keywords,
        originLocation: location
      })
    } else {
      this.setData({
        destinationInputValue: keywords,
        destinationLocation: location
      })
    }
  },
  // 处理跳转地图页面
  bindSkipMap: function () {
    const { originLocation, destinationLocation } = this.data;
    if (!originLocation) {
      wx.showToast({
        title: '请选择出发地',
        duration: 2000,
        icon: 'none'
      })
      return;
    }
    if (!destinationLocation) {
      wx.showToast({
        title: '请选择目的地',
        duration: 2000,
        icon: 'none'
      })
      return;
    }
    var url = '../map/map?origin=' + originLocation + '&destination=' + destinationLocation;
    wx.redirectTo({
      url: url
    })
  }
})
