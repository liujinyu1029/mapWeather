var amapFile = require('../../libs/amap-wx.js'); //如：..­/..­/libs/amap-wx.js
// 高德key
const mapKey = '04f82e56c0fd2d2c504749f0ea1480c0';
// 获取全局应用程序实例对象
const app = getApp()

Page({
  data: {
    markers: [],
    distance: '',
    polyline: []
  },
  onLoad: function (opation) {
    this.getApiData()
    var that = this;
    let distance_50 = 2000 // 以固定距离取点
    let distanceAddUp = 0
    let {
      origin,
      destination
    } = opation || {}
    
    var myAmapFun = new amapFile.AMapWX({
      key: mapKey
    });
    myAmapFun.getDrivingRoute({
      origin,
      destination,
      success: function (data) {
        var points = [];
        var markers = [];
        ((data.paths || [{}])[0].steps || []).forEach(step => {
          // 以固定距离取点
          (step.tmcs || []).forEach(tmc =>{
            distanceAddUp += +tmc.distance || 0
            if (distanceAddUp > distance_50) {
              let point = tmc.polyline.split(';')[0]
              markers.push({
                longitude: parseFloat(point.split(',')[0]),
                latitude: parseFloat(point.split(',')[1])
              })
              distanceAddUp = 0
            }
          })
          // 获取路线点集合
          step.polyline.split(';').forEach(point => {
            points.push({
              longitude: parseFloat(point.split(',')[0]),
              latitude: parseFloat(point.split(',')[1])
            })
          })
        })
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }],
          markers
        });  
      },
      fail: function (info) {
      }
    })
  },
  getApiData(){
    wx.request({
      url: 'https://way.weatherdt.com/tianyi/webgis_rain_new?lat=35.9&lon=116.5&serialNo=1000512&appkey=28368882e7af97daf9b91f0dd279a5d5',
      data:{},
      success(res){
        console.log(111,res)
      },
      fail(error){
        console.log(222, error)
      }
    })
  },
  goDetail: function () {
    wx.navigateTo({
      // url: '../navigation_car_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      // url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      // url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      // url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      // url: '../navigation_walk/navigation'
    })
  }
})