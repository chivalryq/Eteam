// pages/findGroup/findGroup.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    imgArrs: [],
    hideAddImg: '',
    tab:['雏燕','大创','电商','校外'],
    need:[[0],[1]],
    major: [
      { id: '0001', value: "软件学院" }, { id: '0010', value: "信通学院" }, { id: '0011', value: "电子工程学院" }, { id: '0100', value: "计算机学院" }, { id: '0101', value: "自动化学院" }, { id: '0110', value: "经济管理学院" }, { id: '0111', value: "理学院" }, { id: '1000', value: "人文学院" }, { id: '1001', value: "媒体与设计艺术学院" }, { id: '1010', value: "现代邮政学院" }, { id: '1011', value: "网络空间安全学院" }, { id: '1100', value: "光电信息学院" }, { id: '1101', value: "国际学院" }
    ],
    post: [
      { id: '0', value: "策划" }, { id: '1', value: "技术" }, { id: '2', value: "美工" }, { id: '3', value: "文案" }
    ],
    contest: [
      { id: '001', value: '大创' }, { id: '010', value: '小创' }, { id: '011', value: '雏雁计划' }, { id: '100', value: 'ACM/ICPC' }, { id: '101', value: '其他比赛' }
    ],
    teams: []
  },
  gogroupForShow: function (e) {
    var id = e.currentTarget.dataset.teamid;
    wx.navigateTo({
      url: '../groupForShow/groupForShow?id=' + id,
    })
  },
  goindex:function(){
    var pages = getCurrentPages();//获取页面栈
    if (pages.length > 1) {
    //上一个页面实例对象
    var prePage = pages[pages.length - 2];
    //调用上一个页面的onShow方法
    prePage.onLoad()
    } 
    wx.navigateBack({
      delta:1
    })
  },
  tabSelect(e) {
    var that=this
    console.log(e)
    that.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    that.request(e.currentTarget.dataset.id)
  },
  request: function (e) {
    var that = this
    wx.request({
      url: 'https://www.chival.xyz/random_teams',
      data: {
        'openid': app.globalData.openid,
        'id': that.data.id,
        'target':e
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          console.log("请求成功")
          console.log(res)
          for(var j=0;j<res.data.teams.length;j++){
            var temp_url = res.data.teams[j].img_url
          for (var i = 0; i < temp_url.length; i++) {
            temp_url[i] = "https://www.chival.xyz/pic/" + temp_url[i].img_url
          }
          }
          var tempNeed=[]
          for (var k = 0; k < res.data.teams.length; k++) {
            tempNeed.push(res.data.teams[k].need.split('-'))
          }
          for (var m = 0; m < res.data.teams.length; m++) {
            res.data.teams[m].need=tempNeed[m]
          }
          that.setData({
            teams: res.data.teams,
            need:tempNeed
          })
          console.log(that.data.teams)
          console.log(that.data.need)
          wx.hideLoading()
        } else {
          console.log('请求失败')
          wx.showToast({
            title: '网络异常',
            icon:'none',
            duration:'1000'
          })
          that.goindex()
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
    wx.showLoading({
      title: '请稍后',
    })
    this.request(0);

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