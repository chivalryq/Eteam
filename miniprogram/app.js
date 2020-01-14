//app.js
App({
  login: function (openid, callback = null) {//openid用以检测是否已经登录过，callback回调函数
    var that = this;
    if (openid == "initial_openid") {
      wx.login({
        success: function (res) {
          console.log(res.code)
          //发送请求
          wx.request({
            url: app.globalData.url + '/user/getopenid', //接口地址
            data: { 'code': res.code },
            header: {
              'content-type': 'application/x-www-form-urlencoded' //默认值
            },
            method: "POST",
            success: function (res) {
              console.log(res.data)
              app.globalData.openid = res.data.openid;
              that.setData({
                openid: res.data.openid
              });
              console.log(app.globalDataopenid);
              wx.hideLoading();//关闭提示
              if (callback != null) {
                callback();//执行回调函数
              }
            },
            fail: function (res) {
              wx.showModal({
                title: '很抱歉',
                content: '网络似乎出现了问题0.0',
                showCancel: false
              });
              wx.hideLoading();//关闭提示
            }
          });
        }
      });
    }
    else {
      if (callback != null) {
        callback();//如果已经登录，直接执行执行回调函数
      }
    }

  },
	onLoad: function () {
	//	console.log(app.globalData.CustomBar)
   login()
	},
	onLaunch: function () {

		wx.getSystemInfo({
			success: e => {
				//这里我不想用了，只想用配色，故下方重置statusbar，custombar
			//	console.log("success")
				console.log(e)
				this.globalData.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				this.globalData.Custom = custom;
			
				this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				this.globalData.CustomBar = custom.bottom + custom.top-10;
			},
			fail:e=>{
				console.log("failed");
			}
		})
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
		
		}
   
  },
	globalData:{
    openid:'inital_openid',
    url:"https://www.qworkplace.cn:5050",
	}
})

