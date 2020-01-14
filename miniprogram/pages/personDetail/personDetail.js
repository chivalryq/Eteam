// pages/personDetail/personDetail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: ""//用户昵称
    },
    major: [
      "软件学院", "信通学院", "电子工程学院", "计算机学院", "自动化学院", "经济管理学院", "理学院", "人文学院", "媒体与设计艺术学院", "现代邮政学院", "网络空间安全学院", "光电信息学院", "国际学院"
    ],
    post: [
      "全能选手", "技术", "美工", "文案", "策划"
    ],
    post2: [
      "无", "全能选手", "技术", "美工", "文案", "策划"
    ],
    techList: [
      { name: '0', value: '前端' },
      { name: '1', value: '后端/服务器' },
      { name: '2', value: '小程序开发' },
      { name: '3', value: '算法' },
      { name: '4', value: 'Android/ios开发' },
      { name: '5', value: '电子电路类' },
    ],
    artList: [
      { name: '0', value: 'UI设计' },
      { name: '1', value: '插画' },
      { name: '2', value: '三维建模' },
      { name: '3', value: '人物原画' },
      { name: '4', value: '场景设计' },
    ],
    softwareList: [
      { name: '0', value: 'Ps' },
      { name: '1', value: 'Ae' },
      { name: '2', value: 'SAI' },
      { name: '3', value: 'Pr' },
      { name: '4', value: 'Ai' },
    ],
		personid:"",
    name: 'xxx',
    majorIndex: 1,
    postIndex: 1,
    post2Index: 4,
    introduce: 'hello',
    tech: '算法',
    art: 'Ps'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			personid: options.personid,
		})
	//	wx.cloud.init()
		const db=wx.cloud.database()
		var that=this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res); var avatarUrl = 'userInfo.avatarUrl'; var nickName = 'userInfo.nickName'; that.setData({ [avatarUrl]: res.userInfo.avatarUrl, [nickName]: res.userInfo.nickName, })
      }
    })
	//	console.log(this.data.personid)
	
		db.collection("person").where({
				_id:this.data.personid
			}).get({
				success(res){
					that.setData({
						persondetail:res.data[0],
						detailLoaded: true
					})
				}
      }),
        wx.request({
          url: 'https://www.chival.xyz/somepage',
          method: 'get',
          data: {
            usernickname: name,
            major: majorIndex,
            post: postIndex,
            post2: post2Index,
            introduce: introduce,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {

          },
          fail: function (err) {

          }
        })
	//	console.log('this.data.persondetail' + this.data.persondetail)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})