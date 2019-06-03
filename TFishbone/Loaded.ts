import fs from 'fs';
import {routers} from './Router';

function loadFile(path: string){

    fs.readdirSync(path).map((name) => {
        require(path + '/' + name).default;
    });
}

export function loadRouter(){
    loadFile('../Tsrc/Controllers')
    return routers.getRoute().routes();
}
