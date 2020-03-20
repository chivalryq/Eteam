// pages/findPerson/findPerson.js
const app = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		pageindex:0,
    imgArrs: [],
    hideAddImg: '',
    tabChose:'0',
    tab: ['技术', '美工', '策划', '文案'],
    major: [
      { name: '0', value: '软件学院' },
      { name: '1', value: '信通学院' },
      { name: '2', value: '电子工程学院' },
      { name: '3', value: '计算机学院' },
      { name: '4', value: '自动化学院' },
      { name: '5', value: '经济管理学院' },
      { name: '6', value: '理学院' },
      { name: '7', value: '人文学院' },
      { name: '8', value: '媒体与设计艺术学院' },
      { name: '9', value: '现代邮政学院' },
      { name: '10', value: '网络空间安全学院' },
      { name: '11', value: '光电信息学院' },
      { name: '12', value: '国际学院' }
    ],
    competition: [
      { name: '0', value: '大创' },
      { name: '1', value: '小创' },
      { name: '2', value: '雏雁计划' },
      { name: '3', value: 'ACM/ICPC' },
      { name: '4', value: '其他比赛' }
    ],
    post1: [
      { name: '0', value: '全能选手' },
      { name: '1', value: '技术' },
      { name: '2', value: '美工' },
      { name: '3', value: '文案' },
      { name: '4', value: '策划' }
    ],
    post2: [
      { name: '0', value: '无' },
      { name: '1', value: '全能选手' },
      { name: '2', value: '技术' },
      { name: '3', value: '美工' },
      { name: '4', value: '文案' },
      { name: '5', value: '策划' }
    ],
    tech: [
      { name: '0', value: '前端' },
      { name: '1', value: '后端/服务器' },
      { name: '2', value: '小程序开发' },
      { name: '3', value: '算法' },
      { name: '4', value: 'Android/ios开发' },
      { name: '5', value: '电子电路类' },
    ],
    art: [
      { name: '0', value: 'UI设计' },
      { name: '1', value: '插画' },
      { name: '2', value: '三维建模' },
      { name: '3', value: '人物原画' },
      { name: '4', value: '场景设计' },
    ],
    software: [
      { name: '0', value: 'Ps' },
      { name: '1', value: 'Ae' },
      { name: '2', value: 'SAI' },
      { name: '3', value: 'Pr' },
      { name: '4', value: 'Ai' },
    ],
    person:[{},{},{}]
	},

  onItemClick: function (e) {
    console.log(e.currentTarget.dataset.personid)
    wx.navigateTo({
      url: '../findPersonDetail/findPersonDetail?id=' + e.currentTarget.dataset.personid,
    })
  },
  
  request: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.chival.xyz/random_people',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'openid': app.globalData.openid
      },
      method: "GET",
      success(res) {
        if (res.statusCode == 200) {
          console.log("请求成功")
          console.log(res)
          for (var j = 0; j < res.data.people.length; j++) {
            var temp_url = res.data.people[j].img_url
            for (var i = 0; i < temp_url.length; i++) {
              temp_url[i] = "https://www.chival.xyz/pic/" + temp_url[i].img_url
            }
          }
          that.setData({
            person: res.data.people
          })
          console.log(that.data.person)
        }
        else {
          console.log('请求失败')
        }
      }
    })
  },
  // 图片预览
  previewImage(e) {
    console.log(e)
    let that = this
    wx.previewImage({
      urls: that.data.imgArrs,
      current: e.target.dataset.item,
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    this.request()
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