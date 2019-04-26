import {IDB} from './DB'
export interface IConfig {
    db?: IDB
    port?: number
    secret?: string
    noAuth?: Array<string>
}

export interface IBase {
    _model: Array<any>
    _models: object
    _mysqlModel: Array<any>
    _dao: object
    _controller: object
}

export interface IStart {
    strat(): any
}