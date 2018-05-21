
class Middleware{

	async error(ctx, next){

		try {

			await next();
		} catch (e) {
			
			console.log(e)
			let status = e.status || 500;
			let message = e.message || '服务器错误';
			ctx.body = {
				status,
				message
			};
		}
	}
}
module.exports = new Middleware();