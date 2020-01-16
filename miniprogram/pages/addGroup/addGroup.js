// pages/addGroup/addGroup.js
const app = getApp()
Page({
 
	/**
	 * 页面的初始数据
	 */
	data: {
    imagesList:[],
    name:'',
		major: [
      { id: '0001', value: "软件学院" }, { id: '0010', value: "信通学院" }, { id: '0011', value: "电子工程学院" }, { id: '0100', value: "计算机学院" }, { id: '0101', value: "自动化学院" }, { id: '0110', value: "经济管理学院" }, { id: '0111', value: "理学院" }, { id: '1000', value: "人文学院" }, { id: '1001', value: "媒体与设计艺术学院" }, { id: '1010', value: "现代邮政学院" }, { id: '1011', value: "网络空间安全学院" }, { id: '1100', value: "光电信息学院" }, { id: '1101', value:"国际学院"}
		],
		post: [
      { id: '0', value: "策划" }, { id: '1', value: "技术" }, { id: '2', value: "美工" }, { id: '3', value:"文案"}
		],
		contest:[
      { id: '001', value: '大创' }, { id: '010', value: '小创' }, { id: '011', value: '雏雁计划' }, { id: '100', value: 'ACM/ICPC' }, { id: '101', value:'其他比赛'}
		],
    introduce:'',
    progress:'',
    techList: [{ id: '001', value: "前端" }, { id: '010', value: "后端/服务器" }, { id: '011', value: "小程序开发" }, { id: '100', value: '算法' }, { id: '101', value: 'Android/ios开发' }, { id: '110', value: '电子电路类'}],
    artList: [{ id: '001', value: 'UI设计' }, { id: '010', value: '插画' }, { id: '011', value: '三维建模' }, { id: '100', value: '人物原画' }, { id: '101', value:'场景设计'}],
    softwareList: [{ id: '001', value: 'Ps' }, { id: '010', value: 'Ae' }, { id: '011', value: 'SAI' }, { id: '100', value: 'Pr' }, { id: '101', value:'Ai'}],

	},
	submit:function(e){
		var that = this 
		wx.showLoading({
			title: '请稍等',
		})
		console.log(e.detail.value)
    
		this.setData({
			detail:e.detail.value
		})
    wx.request({
      url: 'https://www.chival.xyz/create_team',
      data:{
        'openid':app.globalData.openid,
        'manager_name':e.detail.value.name,
        'major':e.detail.value.major,
        'target':e.detail.value.target,
        'need':(e.detail.value.needPost).join('-'),
        'progress':e.detail.value.progress,
        'resume':e.detail.value.introduce,
        'team_name':e.detail.value.projectName
        //'img_url': 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'


      },
      method:'POST',
      success(res)
      {
        if(res.statusCode==200){
          console.log("上传成功")
        }else{
          console.log('上传失败')
        }
      }
    })
    //循环传多张图片
    for(var i=0;i<that.data.imagesList.length;i++){
    wx.uploadFile({
      url: 'https://www.chival.xyz/somepage',
      filePath: that.data.imagesList[i],//这里是图片临时文件路径
      name: 'some_key',
      success(){

      },
      fail(){

      },
      complete(){

      }
    
    })
    }
		//var imgList=this.data.imgList
		//var img_url_ok=[]
		//var flag=true
		/*wx.cloud.init()
		for (let i = 0; i < imgList.length; i++) {
				var str = imgList[i];
				var obj = str.lastIndexOf("/");
				var fileName = str.substr(obj + 1)
				console.log(fileName)
				wx.cloud.uploadFile({
					cloudPath: 'post_images/' + fileName,//必须指定文件名，否则返回的文件id不对
					filePath: imgList[i], // 小程序临时文件路径
					success: res => {
						// get resource ID: 
						console.log(res)
						//把上传成功的图片的地址放入数组中
						img_url_ok.push(res.fileID)
						//如果全部传完，则可以将图片路径保存到数据库
						if (img_url_ok.length == imgList.length) {
							console.log("成功上传所有图片")
							console.log(img_url_ok)
							that.publish(img_url_ok) 
							flag=false
						}
					},
					fail: err => {
						// handle error
						console.log('fail: ' + err.errMsg)
					}
				})
		} */
	
	
	},
	textareaAInput: function (e) {

		this.setData({
			textareaAValue: e.detail.value
		})

	},
	ContestChange:function(e){
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
            imagesList: res.tempFilePaths
          })
        }
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  
  //previewImage: function (e) {
    //var current = e.target.dataset.src

    //wx.previewImage({

      //current: current,
      //urls: this.data.imageList
    //})
  //},

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