export interface IMysqlConfig {
    dbname: string
    username: string
    password: string
    tablePrefix: string
    options:{
        host: string
        dialect:  string
        pool: {
            max: number
            min: number
            idle: number
        }
        dialectOptions: {           
            charset: string
        }
        define: {
            charset: string
            collate: string
        }
        timezone: string
    }
}

export interface IMongoConfig {
    url: string
    tablePrefix: string
    options:{
        server: { 
            reconnectTries: number
            reconnectInterval: number
        }
    }
}

export interface IDB {
    mysql: IMysqlConfig
    mongo: IMongoConfig
}