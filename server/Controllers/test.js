/**
 * [testController 测试文件]
 * @return {[type]} [description]
 */
class testController {

	async wxAction(ctx, next){
		console.log(ctx);
		let data = ctx.request.query;
		console.log(data);
		ctx.body = 'holle,word';
	}
};

module.exports = testController;

