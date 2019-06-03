/**
 * [testController 测试文件]
 * @return {[type]} [description]
 */
import {routers} from '../../TFishbone/Router';

class testController{

	@routers.get('/')
	async tsTest (){
        return {
            data: '你好，世界'
        }
    }
    
	@routers.get('/test')
	async tsTest2 (){

	}
};

new testController();