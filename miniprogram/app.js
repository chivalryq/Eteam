//app.js
App({
  
	onLoad: function () {
	//	console.log(app.globalData.CustomBar)

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
    openid:''
	}
})

