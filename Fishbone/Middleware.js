
class Middleware{

	async error(ctx, next){

		try {

			await next();
		} catch (e) {
			
			console.log(e)
			let code = e.status || 500;
			let message = e.message || '服务器错误';
			ctx.body = {
				code,
				message
			};
		}
	}

}
module.exports = new Middleware();