// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const db = cloud.database()//这里我竟然没加!！
	try {
		return await db.collection('group').add({
			// data 字段表示需新增的 JSON 数据
			data: {
				// 发布时小程序传入
				author_id: wxContext.OPENID,
				appid: wxContext.APPID,
				unionid: wxContext.UNIONID,
				author_name: event.author_name,
				detail: event.detail,
				//image_url: event.image_url,
				// 服务器时间和本地时间会造成什么影响，需要评估
				publish_time: new Date(),
				// update_time: event.update_time,// 最近一次更新时间，发布或者评论触发更新,目前用服务器端时间
				update_time: new Date(),
				// 默认值，一些目前还没开发，所以没设置
				// comment_count: 0,//评论数，直接读数据库，避免两个数据表示同一含义
				//watch_count: 3,//浏览数
				// star_count: 0,//TODO：收藏人数
			}
		})
	} catch (e) {
		console.error(e)
	}

}