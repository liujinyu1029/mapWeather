var amapFile = require('../../libs/amap-wx.js'); //如：..­/..­/libs/amap-wx.js
Page({
  data: {
    markers: [{
      // iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
    }, {
      // iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function () {
    var that = this;
    var distance_50 = 50000
    var distanceAddUp = 0
    
    var myAmapFun = new amapFile.AMapWX({
      key: '04f82e56c0fd2d2c504749f0ea1480c0'
    });
    myAmapFun.getDrivingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function (data) {
        var points = [];
        (data.paths || []).forEach(v => {
          (v.steps || []).forEach(vv => {
            vv.polyline.split(';').forEach(vvv=>{
              points.push({
                longitude: parseFloat(vvv.split(',')[0]),
                latitude: parseFloat(vvv.split(',')[1])
              })
            })
          })
        })
        // 以固定距离取点
        points.forEach(v=>{
          distanceAddUp
        })

        console.log(points,11)
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        var markers = []
        points.forEach((v,i)=>{
          if(i%20==0){
            markers.push(v)
          }
        })
        that.setData({
          markers
        })
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        
      },
      fail: function (info) {

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