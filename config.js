module.exports = {
	db:{
		mysql:{
			dbname:'ugenCloud',
			username:'root',
			password:"111111",//111111
			tablePrefix:"zj",
			options:{
				host:"127.0.0.1",
				pool: {
					max: 5,
					min: 0,
					idle: 10000
				},
				dialectOptions: { 
					charset: 'utf8mb4'
				},
				define: {
					charset: 'utf8mb4',
					collate: 'utf8mb4_unicode_ci'
				},
				timezone:"+08:00"
			}
		},
		// mongo:{
		// 	url:"mongodb://127.0.0.1/ugenCloud",
		// 	tablePrefix:"API",
		// 	options:{
		// 		server: { 
		// 			reconnectTries: Number.MAX_VALUE ,
		// 			reconnectInterval:10000
		// 		}
		// 	}
		// }
	},
	port:3001,
}