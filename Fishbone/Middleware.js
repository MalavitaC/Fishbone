
class Middleware {

	async error(ctx, next) {

		try {

			await next();
		} catch (e) {

			let code,
				message;
			if (e.status === 401) {
				code = e.status;
				message = `鉴权报错：${e.originalError ? e.originalError.message : e.message}`;
			} else {
				code = e.status || 500;
				message = e.message || '服务器错误';
			}
			ctx.body = {
				code,
				message
			};
		}
	}

}
module.exports = new Middleware();