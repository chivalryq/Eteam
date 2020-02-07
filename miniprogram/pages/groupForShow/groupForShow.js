// miniprogram/pages/groupForShow/groupForShow.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    id: '',
    imagesList: [],
    name: '',
    major: [
      { id: '0001', value: "软件学院" }, { id: '0010', value: "信通学院" }, { id: '0011', value: "电子工程学院" }, { id: '0100', value: "计算机学院" }, { id: '0101', value: "自动化学院" }, { id: '0110', value: "经济管理学院" }, { id: '0111', value: "理学院" }, { id: '1000', value: "人文学院" }, { id: '1001', value: "媒体与设计艺术学院" }, { id: '1010', value: "现代邮政学院" }, { id: '1011', value: "网络空间安全学院" }, { id: '1100', value: "光电信息学院" }, { id: '1101', value: "国际学院" }
    ],
    post: [
      { id: '0', value: "策划" }, { id: '1', value: "技术" }, { id: '2', value: "美工" }, { id: '3', value: "文案" }
    ],
    contest: [
      { id: '001', value: '大创' }, { id: '010', value: '小创' }, { id: '011', value: '雏雁计划' }, { id: '100', value: 'ACM/ICPC' }, { id: '101', value: '其他比赛' }
    ],
    introduce: '',
    progress: '',
    projectName: '',
    nowMajor: '',
    nowContest: '',
    nowPost: [],
    nowPostInString:'',
    posts:[]

  },
  ContestChange: function (e) {
    console.log(e);
    this.setData({
      contestIndex: e.detail.value
    })
  },

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
  request: function (e) {
    var that = this
    wx.request({
      url: 'https://www.chival.xyz/get_team',
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
            name: res.data.team.manager_name,
            projectName: res.data.team.team_name,
            introduce: res.data.team.resume,
            progress: res.data.team.progress,
            nowMajor: res.data.team.major,
            nowContest: res.data.team.target,
            nowPost: res.data.team.need.split("-")
          })
          wx.hideLoading()
          console.log(that.data.nowPost)
          for (var i = 0; i < that.data.nowPost.length; i++) {
            
            that.data.posts.push(that.data.post[that.data.nowPost[i]].value)
          
          }
          console.log(that.data.posts)
          that.setData({
            nowPostInString: that.data.posts.join(",")
          })
        } else {
          console.log('请求失败')
        }
      }
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