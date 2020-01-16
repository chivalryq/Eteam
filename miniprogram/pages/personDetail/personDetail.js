// pages/personDetail/personDetail.js
const app = getApp()
Page({
  MajorChange: function (e) {
    console.log(e);
    this.setData({
      majorIndex: e.detail.value
    })
  },
  PostChange: function (e) {
    console.log(e);
    this.setData({
      postIndex: e.detail.value
    })
  },
  Post2Change: function (e) {
    console.log(e);
    this.setData({
      post2Index: e.detail.value
    })
  },
  CompetitionChange: function (e) {
    console.log(e);
    this.setData({
      competitionIndex: e.detail.value
    })
  },
  TechChange: function (e) {
    console.log(e);
    this.setData({
      techIndex: e.detail.value
    })
  },
  ArtChange: function (e) {
    console.log(e);
    this.setData({
      artIndex: e.detail.value
    })
  },
  SoftwareChange: function (e) {
    console.log(e);
    this.setData({
      softwareIndex: e.detail.value
    })
  },
	/**
	 * 页面的初始数据
	 */
	data: {
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: ""//用户昵称
    },
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
    imgList: [],
    name:'',
    resume:'',
   /* major,
    post1,
    post2,
    tech,
    art,*/
    textareaAValue:'',
	},

  submit: function (e) {
    var that = this;
    wx.showLoading({
      title: '请稍等',
    })
    console.log(e.detail.value)
    this.setData({
      detail: e.detail.value
    })
    wx.request({
      url: 'https://www.chival.xyz/create_person',
      method: 'post',
      data: {
        'openid': app.globalData.openid,
        'name': e.detail.value.name,
        'major': e.detail.value.major,
        'resume': e.detail.value.textareaAValue,
        'expect_competition':
          e.detail.value.competition,
        'post1': e.detail.value.post1,
        'post2': e.detail.value.post2,
        'tech': e.detail.value.tech.join('-'),
        'art': e.detail.value.art.join('-'),
        'software': e.detail.value.software.join('-'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("上传成功")
        console.log(res)
      }
    })
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    
    this.setData({
      personid: options.personid,
    })
    //	wx.cloud.init()
    const db = wx.cloud.database()
    var that = this
    wx.request({
      url: 'https://www.chival.xyz/create_person',
      header: {"Content-Type": "applciation/json"},
      method: "GET",
      success: function (res) {
        console.log(res);
        that.setData({
          openid: res.openid,
          name: res.name,
          major: res.major,
          textareaAValue: res.resume,
          competition:
            res.expect_competition,
          post1:res.post1,
          post2: res.post2,
          art: res.art,
          tech: res.tech,
          software: res.software,
        })
      }
    })
    //	console.log(this.data.personid)
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