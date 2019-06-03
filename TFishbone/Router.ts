import router from 'koa-router';

const Router = new router();
const methods = ['get', 'post', 'patch', 'del', 'options', 'put']
interface Decorator {
    (target: any, propertyKey: string,descriptor: PropertyDescriptor): any
}
interface IRouters extends _routers {

    post(url: string): Decorator

    /**
     * http get method
     * @param url 
     */
    get(url: string):Decorator;
    patch(url: string): Decorator;
    del(url: string): Decorator;
    options(url: string): Decorator;
    put(url: string): Decorator;

}

class _routers implements Partial<IRouters> {
    
    getRoute(): any {
        return Router
    }
}


methods.forEach((httpMethod: string) => {
    Reflect.defineProperty(_routers.prototype, httpMethod, {
        get: function () {
            return (url: string) => {
                return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
                    return (<any>Router)[httpMethod](url, async (ctx: any, next: Function)=>{

                        let data = {
                            params: {},
                            user: ctx.state.user,
                            ctx: ctx
                        };
                        //合并请求参数
                        (<any>Object).assign(data.params, ctx.request.query, ctx.request.body, ctx.request.fields);
                        return ctx.body = {
                            code: 0,
                            data: await descriptor.value(data),
                        }
                    });
                }
            }
        }
    })
})

export const routers = <any>new _routers