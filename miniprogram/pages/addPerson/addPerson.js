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
  textareaAInput: function (e) {

    this.setData({
      textareaAValue: e.detail.value
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
		imgList:[],
    textareaAValue:'',
    resume:'',
		detail:{},
    addtech:[],
    addart: [],
    addsoftware: []
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
    if (e.detail.value.techList!= null) {
      this.data.addtech = e.detail.value.techList
    }
    if (e.detail.value.artList != null) {
      this.data.addart = e.detail.value.artList
    }
    if (e.detail.value.softwareList != null) {
      this.data.addsoftware = e.detail.value.softwareList
    }
    if (e.detail.value.resume != null) {
      this.data.resume = e.detail.value.resume
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
        'tech': (this.data.addtech).join('-'),
        'art': (this.data.addart).join('-'),
        'software': (this.data.addsoftware).join('-'),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success :function(res) {
          console.log("上传成功")
          console.log(res)
        console.log(app.globalData.openid)
      }
    })
  },
 
	textareaAInput:function(e){

			this.setData({
				textareaAValue: e.detail.value
			})
		
	},
	ChooseImage:function() {
		wx.chooseImage({
			count: 4, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: (res) => {
				if (this.data.imgList.length != 0) {
					this.setData({
						imgList: this.data.imgList.concat(res.tempFilePaths)
					})
				} else {
					this.setData({
						imgList: res.tempFilePaths
					})
				}
			}
		});
	},
  textareaAInput: function (e) {

    this.setData({
      textareaAValue: e.detail.value
    })},
	ViewImage(e) {
		wx.previewImage({
			urls: this.data.imgList,
			current: e.currentTarget.dataset.url
		});
	},
	DelImg(e) {
		wx.showModal({
			title: '召唤师',
			content: '确定要删除这段回忆吗？',
			cancelText: '再看看',
			confirmText: '再见',
			success: res => {
				if (res.confirm) {
					this.data.imgList.splice(e.currentTarget.dataset.index, 1);
					this.setData({
						imgList: this.data.imgList
					})
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
