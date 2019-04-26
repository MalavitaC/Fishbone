import router from 'koa-router';

const _router = new router();
const methods = ['get', 'post', 'patch', 'del', 'options', 'put']
interface Decorator {
    (target: any, propertyKey: string,descriptor: PropertyDescriptor): any
}
export interface provider extends _provider {

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

class _provider {
    
    getRoute(): any {
        return _router
    }
}


methods.forEach((httpMethod: string) => {
    Object.defineProperty(_provider.prototype, httpMethod, {
        get: function () {
            return (url: string) => {
                return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
					console.log(target)
					console.log(propertyKey)
                    console.log(descriptor)
                    return (<any>_router)[httpMethod](url, async (ctx: any, next: Function)=>{

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

export const provider : provider = <any>new _provider