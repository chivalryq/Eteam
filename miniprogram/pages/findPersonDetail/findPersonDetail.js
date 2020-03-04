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
    personid: '',
    id: '',
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
    imgArrs: [],
    name: '',
    exresume: '',
    exmajor: '',
    expost1: '',
    expost2: '',
    extech: [],
    exart: [],
    exsoftware: [],
    excompetition: '',
    textareaAValue: '',
    post:[],
    postString:''
  },

  request: function (e) {
    var that = this
    console.log(that.data.id)
    wx.request({
      url: 'https://www.chival.xyz/get_person',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      data: {
        'id': that.data.id
      },
      success(res) {
        if (res.statusCode == 200) {
          console.log("请求成功")
          console.log(res);
          var temp_url = res.data.person.img_url
          for (var i = 0; i < temp_url.length; i++) {
            temp_url[i] = "https://www.chival.xyz/pic/" + temp_url[i].img_url
          }
          that.setData({
            name: res.data.person.name,
            exmajor: res.data.person.major,
            exresume: res.data.person.resume,
            excompetition:
              res.data.person.expect_competition,
            expost1: res.data.person.post1,
            expost2: res.data.person.post2,
            extech:
              (res.data.person.tech).split("-"),
            exart:
              (res.data.person.art).split("-"),
            exsoftware: (res.data.person.software).split("-"),
            imgArrs: temp_url,
          })
          console.log(that.data)
          if (that.data.exresume == null) {
            that.data.exresume = '无'
          }
          if (that.data.expost1 == 0 || that.data.expost1 == 1 || that.data.expost2 == 1 || that.data.expost2==2)
          for (var i = 0; i < that.data.extech.length; i++) {
            that.data.post.push(that.data.tech[that.data.extech[i]].value)
          }
          if (that.data.expost1 == 2 || that.data.expost2==3){
          for (var i = 0; i < that.data.exart.length; i++) {
            that.data.post.push(that.data.art[that.data.exart[i]].value)
          }
          for (var i = 0; i < that.data.exsoftware.length; i++) {
            that.data.post.push(that.data.software[that.data.exsoftware[i]].value)
          }}
          wx.hideLoading()
          console.log(that.data.post)
          that.setData({
            postString: that.data.post.join("，")
          })
          
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
    this.setData({
      id: options.id
    })
    console.log(this.data.id)
    wx.showLoading({
      title: '请稍后',
    })
    this.request();

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