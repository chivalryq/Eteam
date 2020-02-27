// pages/personDetail/personDetail.js
const app = getApp()
Page({
  MajorChange: function (e) {
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
    imgArrs: [],
    initial_pic: [],
    s_initial_pic: [],
    delete_pic: [],
    hideAddImg: '',
    imagesList:[],
    name: '',
    id:'',
    exresume: '',
    exmajor: '',
    expost1: '',
    expost2: '',
    extech: [],
    exart:[] ,
    exsoftware: [],
    excompetition:'',
    textareaAValue: '',
	},
  gopersoncenter: function () {
    wx.navigateTo({
      url: '../personcenter/personcenter'
    })
  },
  getArrEqual: function (arr1, arr2) {
    var a = arr1;
    var b = arr2;
    let newArr = [];
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if (a[j] === b[i]) {
          newArr.push(a[j]);
        }
      }
    }
    return newArr;
  },
  subset: function (arr1, arr2) {
    var len = arr1.length;
    var arr = [];
    while (len--) {
      if (arr2.indexOf(arr1[len]) < 0) {
        arr.push(arr1[len]);
      }
    }
    return arr;
  },

  submit: function (e) {
    var that = this;
    wx.showLoading({
      title: '请稍等',
    })
    console.log(e.detail.value)
    console.log(this.data.id)
    this.setData({
      detail: e.detail.value
    })
    if (e.detail.value.major != null) {
      this.data.exmajor = e.detail.value.major
    }
    if (e.detail.value.textareaAValue != null) {
      this.data.exresume = e.detail.value.textareaAValue
    }
    if (e.detail.value.competition != null) {
      this.data.excompetition = e.detail.value.competition
    }
    if (e.detail.value.post1 != null) {
      this.data.expost1 = e.detail.value.post1
    }
    if (e.detail.value.post2 != null) {
      this.data.expost2 = e.detail.value.post2
    }
    if (e.detail.value.techList != null) {
      this.data.extech = e.detail.value.techList
    }
    if (e.detail.value.artList != null) {
      this.data.exart = e.detail.value.artList
    }
    if (e.detail.value.softwareList != null) {
      this.data.exsoftware = e.detail.value.softwareList
    }
    wx.request({
      url: 'https://www.chival.xyz/update_person',
      method: 'post',
      data: {
        'id': this.data.id,
        'openid': app.globalData.openid,
        'name': this.data.name,
        'major': this.data.exmajor,
        'resume': e.detail.value.exresume,
        'expect_competition':
          this.data.excompetition,
        'post1': this.data.expost1,
        'post2': this.data.expost2,
        'tech': this.data.extech.join('-'),
        'art': this.data.exart.join('-'),
        'software': this.data.exsoftware.join('-'),
        'now_pic': JSON.stringify(that.data.imgArrs)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(that.data.imgArrs)
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
              that.gopersoncenter()
            }
          })
        }
        if (res.statusCode == 200) {
          console.log("上传成功")
          console.log(res)
          wx.hideLoading()
        } else {
          console.log('上传失败')
        }
      }
    })
    for (var i = 0; i < that.data.imagesList.length; i++) {
      wx.uploadFile({
        url: 'https://www.chival.xyz/somepage',
        filePath: that.data.imagesList[i],//这里是图片临时文件路径
        name: 'some_key',
        success() {

        },
        fail() {

        },
        complete() {

        }

      })
    }
  },
  previewImage(e) {
    console.log(e)
    let that = this
    wx.previewImage({
      urls: that.data.imgArrs,
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

  uploader: function () {
    var that = this;
    let imagesList = [];
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
        }
        if (that.data.imgArrs.length >= maxLength) {
          that.setData({
            hideAddImg: true
          })
        }
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  request: function (e) {
    var that = this
    wx.request({
      url: 'https://www.chival.xyz/get_self',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      data: {
        'openid': app.globalData.openid
      },
      success (res) {
        if (res.statusCode == 200) {
          console.log("请求成功")
          console.log(res);
          var temp_url = res.data.person.img_url
          for (var i = 0; i < temp_url.length; i++) {
            temp_url[i] = "https://www.chival.xyz/pic/" + temp_url[i].img_url
          }
          console.log(temp_url)
          var temp_url1 = res.data.person.img_url
          that.setData({
            name: res.data.person.name,
            id: res.data.person.id,
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
            initial_pic: temp_url,
            initial_pic1: temp_url1,
        })
          console.log(that.data.img_url)
          if (that.data.exresume == "undefined") {
            that.data.exresume = '无'
          }
          console.log(that.data.exresume);
      }
        else {
          console.log('请求失败')
        }
      }
    })
  },
 
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
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