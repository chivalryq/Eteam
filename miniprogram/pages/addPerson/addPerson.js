// pages/addPerson/addPerson.
const app=getApp()

Page({
	
	MajorChange:function(e) {
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
		major:[
			"软件学院", "信通学院", "电子工程学院", "计算机学院", "自动化学院", "经济管理学院", "理学院", "人文学院", "媒体与设计艺术学院", "现代邮政学院", "网络空间安全学院", "光电信息学院","国际学院"
		],
		post:[
			"全能选手", "技术", "美工", "文案","策划"
		],
    post2: [
      "无","全能选手", "技术", "美工", "文案", "策划"
    ],
		techList: [
      { name: '0', value: '前端' },
      { name: '1', value: '后端/服务器' },
      { name: '2', value: '小程序开发' },
      { name: '3', value: '算法' },
      { name: '4', value: 'Android/ios开发' },
      { name: '5', value: '电子电路类' },
    ],
		artList: [
      { name: '0', value: 'UI设计' },
      { name: '1', value: '插画' },
      { name: '2', value: '三维建模' },
      { name: '3', value: '人物原画' },
      { name: '4', value: '场景设计' },
    ],
    softwareList: [
      { name: '0', value: 'Ps' },
      { name: '1', value: 'Ae' },
      { name: '2', value: 'SAI' },
      { name: '3', value: 'Pr' },
      { name: '4', value: 'Ai' },
    ],
		imgList:[],
		textareaAValue:'',
		detail:{}
	},
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  checkboxChange2: function (e) {
    console.log('checkbox2发生change事件，携带value值为：', e.detail.value)
  },
  checkboxChange3: function (e) {
    console.log('checkbox3发生change事件，携带value值为：', e.detail.value)
  },

  submit:function(){
    var that = this;
    wx.request({
      url: 'https://www.chival.xyz/somepage',
      method: 'post',
      data: {
        usernickname:name,
        major: majorIndex,
        post: postIndex,
        post2:post2Index,
        introduce:introduce,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        console.log("上传成功")
      },
      fail: function (err) {
        console.log('上传失败')
      }
    })
  },
  
	publish: function (img_url_ok){
		wx.cloud.init()
		wx.cloud.callFunction({
			name: 'publish_post',
			data: {
				//author_name: app.globalData.userInfo.nickName,
				detail: this.data.detail,
				image_url: img_url_ok,
				publish_time: "",
				update_time: ""//目前让服务器自己生成这两个时间
			},
			success: function (res) {
				// 强制刷新，这个传参很粗暴
			//	var pages = getCurrentPages();             //  获取页面栈
				//var prevPage = pages[pages.length - 2];    // 上一个页面，这个是用来修改其他页面的数据的
				//prevPage.setData({											 //但是我不是很懂这个干什么用的
				//	update: true
				//})
				
				
				wx.hideLoading()
				wx.showToast({
					title:"成功上传"
				})
				wx.navigateBack({
					delta: 1
				})
			},
			fail: console.error
		})

	},
  onLoad:function(){
    console.log(postIndex)
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
		var imgList=this.data.imgList
		var img_url_ok=[]
		var flag=true
		wx.cloud.init()
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
		} 
		if(flag){
			that.publish(img_url_ok) 
		}
		
		
	
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