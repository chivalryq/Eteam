// pages/findGroup/findGroup.js
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    groupData: [{
      pageindex: 0,
      name: 'xxx',
      major: '电子工程学院',
      competition: '大创',
      require: '美工',
      introduce: '重金求子',
    },

    {
      pageindex: 1,
      name: 'xxx',
      major: '电子工程学院',
      competition: '大创',
      require: '美工',
      introduce: '重金求子',
    }
    ]

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
        name: name,
        major: majorIndex,
        require: requirre,
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
    var that = this
    const db = wx.cloud.database()
    db.collection('person').field({
      image_url: true
    }).orderBy('update_time', 'dasc').limit(20).get({
      success(res) {
        console.log(res.data)
        that.setData({
          person: res.data
        })
      }
    })
  },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
  onReady: function () {
    console.log("ready" + this.data.person)
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