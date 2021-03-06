// pages/addPerson/addPerson.
const app=getApp()

Page({
	
	MajorChange:function(e) {
		console.log(e);
		this.setData({
			majorIndex: e.detail.value
		})
	},
	Post1Change: function (e) {
		console.log(e);
		this.setData({
			post1Index: e.detail.value
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
  previewImage(e) {
    console.log(e)
    let that = this
    wx.previewImage({
      urls: that.data.imagesList,
      current: e.target.dataset.item,
    })
  },
  removeImg: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (that.data.imgArrs.length <= 9) {
      that.setData({
        hideAddImg: false
      })
    }
    that.data.imgArrs.splice(index, 1);
    that.setData({
      imgArrs: that.data.imgArrs,
    })
  },
  textareaAInput: function (e) {

    this.setData({
      textareaAValue: e.detail.value
    })

  },
  techInput: function (e) {

    this.setData({
      techValue: e.detail.value
    })

  },
	getUserInfo:function(e){
		console.log(e.detail.userInfo.avatarUrl)
		this.setData({
			haveAvatar:true,
			avatarUrl: e.detail.userInfo.avatarUrl,
			nickName:e.detail.userInfo.nickName
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
		haveAvatar:false,
    name: '',
    resume:'',
		major:[
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
    competition:[
      { name: '0', value: '大创' },
      { name: '1', value: '小创' },
      { name: '2', value: '雏雁计划' },
      { name: '3', value: 'ACM/ICPC' },
      { name: '4', value: '其他比赛' }
    ],
    post1:[
      { name: '0', value: '全能选手' },
      { name: '1', value: '技术' },
      { name: '2', value: '美工' },
      { name: '3', value: '文案' },
      { name: '4', value: '策划' }
		],
    post2: [
      { name: '0', value: '全能选手' },
      { name: '1', value: '技术' },
      { name: '2', value: '美工' },
      { name: '3', value: '文案' },
      { name: '4', value: '策划' }
    ],
    tech:'',
    imgArrs: [],
    hideAddImg: '',
    id:'',
    textareaAValue:'',
    resume:'',
		detail:{},
    addtech:[],
    addart: [],
    addsoftware: []
	},

  goindex: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  submit:function(e){
    var that = this;
    wx.showLoading({
    title: '请稍等',
    })
    console.log(e.detail.value)
    this.setData({
      detail: e.detail.value
    })
    if (e.detail.value.resume != null) {
      this.data.resume = e.detail.value.resume
    }
    if (e.detail.value.tech != null) {
      this.data.tech = e.detail.value.tech
    }
    wx.request({
      url: 'https://www.chival.xyz/create_person',
      method: 'post',
      data: {
        'openid': app.globalData.openid,
        'name': e.detail.value.name,
        'major': e.detail.value.major,
        'resume': this.data.resume,
        'expect_competition':
          e.detail.value.competition,
        'post1': e.detail.value.post1,
        'post2': e.detail.value.post2,
        'tech': this.data.tech,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
        success(res)
        {
          that.setData({
            id: res.data.id
          })
          console.log(that.data.imgArrs)
          if (that.data.imgArrs.length == 0) {
            that.goindex()
          }
          for (var i = 0; i < that.data.imgArrs.length; i++) {
            wx.uploadFile({
              url: 'https://www.chival.xyz/person/upload',
              filePath: that.data.imgArrs[i],
              name: 'photo',
              header: { "Content-Type": "multipart/form-data" },
              formData: {
                'person_id': that.data.id
              },
              success: function (res) {
                console.log(res)
                that.goindex()
              }
            })
          }
          wx.hideLoading()
          console.log(res)
          if (res.statusCode == 200) {
            console.log("上传成功")
          } else {
            console.log('上传失败')
          }
        }
    })
  },
  
  request: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.chival.xyz/get_people',
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
          that.setData({
            name: res.data.person.name
          })
          console.log(that.data.name)
        }
        else {
          console.log('请求失败')
        }
        if(that.data.name==''){
          wx.redirectTo({
url:'../personDetail/personDetail'
          })}
      }
    })
  },
  uploader: function () {
    var that = this;
    //let imgArrs = [];
    let maxSize = 1024 * 1024;
    let maxLength = 9;
    let flag = true;
    wx.chooseImage({
      count: 9, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        for (let i = 0; i < res.tempFiles.length; i++) {
          if (res.tempFiles[i].size > maxSize) {
            flag = false;
            console.log(111)
            wx.showModal({
              content: '图片太大，不允许上传',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });

          }
        }
        if (res.tempFiles.length > maxLength) {
          console.log('222');
          wx.showModal({
            content: '最多能上传' + maxLength + '张图片',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              }
            }
          })
        }
        if (flag == true && res.tempFiles.length <= maxLength) {
          that.setData({
            imgArrs: that.data.imgArrs.concat(res.tempFilePaths)
          })
          if (that.data.imgArrs.length >= maxLength) {
            that.setData({
              hideAddImg: true
            })
          }
          console.log(that.data.imgArrs)
        }
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	
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
