 // miniprogram/pages/groupDetail/groupDetail.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    id:'',
    imgArrs: [],
    initial_pic:[],
    s_initial_pic:[],
    delete_pic:[],
    hideAddImg:'',
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
    projectName:'',
    nowMajor:'',
    nowContest:'',
    nowPost:[]

  },
  getArrEqual: function(arr1, arr2) {
    var a=arr1;
    var b=arr2;
    let newArr = [];
    for(let i = 0; i<b.length; i++) {
  for (let j = 0; j < a.length; j++) {
    if (a[j] === b[i]) {
      newArr.push(a[j]);
    }
  }
}
return newArr;
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
  subset: function(arr1, arr2) {
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
    var that = this
    wx.showLoading({
      title: '请稍等',
    })
    console.log(e.detail.value)

    this.setData({
      detail: e.detail.value
    })
    if(e.detail.value.major==null){
      e.detail.value.major=this.data.nowMajor
    }
    if(e.detail.value.target==null){
      e.detail.value.target=this.data.nowContest
    }
    wx.request({
      url: 'https://www.chival.xyz/update_team',
      data: {
        'id':that.data.id,
        'openid': app.globalData.openid,
        'manager_name': e.detail.value.name,
        'major': e.detail.value.major,
        'target': e.detail.value.target,
        'need': (e.detail.value.needPost).join('-'),
        'progress': e.detail.value.progress,
        'resume': e.detail.value.introduce,
        'team_name': e.detail.value.projectName,
        'now_pic': JSON.stringify(that.data.imgArrs)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'


      },
      method: 'POST',
      success(res) {
        console.log(that.data.imgArrs)
        for (var i = 0; i < that.data.imgArrs.length; i++) {
          wx.uploadFile({
            url: 'https://www.chival.xyz/team/upload',
            filePath: that.data.imgArrs[i],
            name: 'photo',
            header: { "Content-Type": "multipart/form-data" },
            formData: {
              'team_id': that.data.id
            },
            success: function (res) {
              console.log(res)
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
    that.goindex()

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

  textareaAInput: function (e) {

    this.setData({
      textareaAValue: e.detail.value
    })

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
        if(that.data.imgArrs.length>=maxLength){
          that.setData({
            hideAddImg:true
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
      url: 'https://www.chival.xyz/get_team',
      data: {
        'openid':app.globalData.openid,
        'id':that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success(res) {
        if (res.statusCode == 200) {
          console.log("请求成功")
          console.log(res)
          var temp_url=res.data.team.img_url
          for (var i = 0; i < temp_url.length; i++) {
            temp_url[i]="https://www.chival.xyz/pic/"+temp_url[i].img_url
          }
          var temp_url1 = res.data.team.img_url
          that.setData({
            name:res.data.team.manager_name,
            projectName:res.data.team.team_name,
            introduce:res.data.team.resume,
            progress:res.data.team.progress,
            nowMajor:res.data.team.major,
            nowContest:res.data.team.target,
            nowPost: res.data.team.need.split("-"),
            imgArrs:temp_url,
            initial_pic:temp_url,
            initial_pic1:temp_url1,
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
      id:options.id
    })
    console.log(this.data.id)
      this.request();
    console.log(this.data.nowPost)
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