/**
 * [testController 测试文件]
 * @return {[type]} [description]
 */
import { provider } from '../../TFishbone/Provider';


class testController{

	@provider.get('/')
	async tsTest (){
        console.log('你好，世界')
        return {
            data: '你好，世界'
        }
    }
    
	@provider.get('/test')
	async tsTest2 (){

	}
};

new testController();