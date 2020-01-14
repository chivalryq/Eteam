//index.js
const app = getApp()

Page({
  data: {
		update: false,//页面是否应该刷新
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
		gridCol:2,
		iconList: [{
			icon: 'cardboardfill',
			color: 'red',
			badge: 120,
			name: '找队友',
			nav:"findPerson"
		},
			{
				icon: 'discoverfill',
				color: 'purple',
				badge: 0,
				name: '找队伍'
			}, {
			icon: 'friendfamous',
			color: 'orange',
			badge: 0,
			name: '毛遂自荐',
			nav:"addPerson"
		}, {
			icon: 'friend',
			color: 'green',
			badge: 0,
			name: '发布队伍',
			nav:"addGroup"
		}],
		isCard:false
  },
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
navaddPerson:function(){
wx.navigateTo({
	url: '../addPerson/addPerson',
})
},
	navaddGroup: function () {
		wx.navigateTo({
			url: '../addGroup/addGroup',
		})
	},
	navfindPerson:function(){
		wx.navigateTo({
			url: '../findPerson/findPerson',
		})
	},
  navfindGroup: function () {
    wx.navigateTo({
      url: '../findGroup/findGroup',
    })
  },
  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
onShow:function(){
	if(this.data.update){
			this.onLoad()
	}
}
})
