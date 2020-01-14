// pages/findPerson/findPerson.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pageindex:0,
    name:'xxx',
    major:'电子工程学院',
    post:'技术',
    post2:'美工',
    introduce:'hello',
    tech:'算法',
    art:'Ps'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    var that = this;
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
    }),
		wx.cloud.init()
		var that=this
		const db = wx.cloud.database()
		db.collection('person').field({
			image_url: true
		}).orderBy('update_time', 'dasc').limit(20).get({
			success(res) {
				console.log(res.data)
				that.setData({
					person:res.data
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		console.log("ready"+this.data.person)
	},
	onItemClick: function (e) {
		console.log(e.currentTarget.dataset.personid)
		wx.navigateTo({
			url: '../personDetail/personDetail?personid=' + e.currentTarget.dataset.personid,
		})
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