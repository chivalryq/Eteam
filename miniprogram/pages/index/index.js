//index.js
const app = getApp()

Page({
  data: {
    openid: 'initial_openid',
    url: "https://www.chival.xyz",
		update: false,//页面是否应该刷新
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
		gridCol:2,
    team:[{},{}],
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
				name: '找队伍',
        nav:"findGroup"
			}, 
      {
			icon: 'friendfamous',
			color: 'orange',
			badge: 0,
			name: '个人中心',
			nav:"personcenter"
		}, 
    {
			icon: 'friend',
			color: 'green',
			badge: 0,
			name: '发布队伍',
			nav:"Groups"
		}],
		isCard:false,
    name:''
  },

  request: function (e) {
    var that = this
    wx.request({
      url: 'https://www.chival.xyz/random_teams',
      data: {
        'openid': app.globalData.openid,
        'id': that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          console.log("请求成功")
          console.log(res)
          that.setData({
            teams: res.data.teams
          })
          console.log(that.data.teams)
        } else {
          console.log('请求失败')
        }
      }
    })
  },
  
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
  navpersoncenter:function(){
    wx.navigateTo({
      url: '../personcenter/personcenter',
    })
  },
  /*不用了
  navaddPerson:function(){
  wx.navigateTo({
	url: '../addPerson/addPerson',
  })
} ,
*/
	navGroups: function () {
		wx.navigateTo({
			url: '../groups/groups',
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
  login: function (openid, callback = null) {//openid用以检测是否已经登录过，callback回调函数
    var that = this;
    if (openid == "initial_openid") {
      wx.login({
        success: function (res) {
          console.log(res.code)
          //发送请求
          wx.request({
            url: that.data.url + '/getopenid', //接口地址
            data: { 'code': res.code },
            header: {
              'content-type': 'application/x-www-form-urlencoded' //默认值
            },
            method: "POST",
            success: function (res) {
              console.log(res.data)
              if (res.data.success == 1) {
              app.globalData.openid = res.data.openid;
              that.setData({
                openid: res.data.openid
              });
              console.log(that.data.openid);
              wx.hideLoading();//关闭提示
              if (callback != null) {
                callback();//执行回调函数
              }
              }
              else{
                console.log(res.data.msg)
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
  onLoad: function() {
    this.login(this.data.openid),
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
