import { interfaceExtends } from "@babel/types";
import { defineStore } from "pinia";
type cfunc=()=>(Promise<void>);
interface State {
getS?:cfunc,
getL?:cfunc,
now:cfunc
}
async function none(){};
export const ModalStore=defineStore('Modal',{
    state:():State=>(
        {
            now:none
        }
    ),
    actions:{
        cgetS(v:cfunc){this.getS=v;},
        cgetL(v:cfunc){this.getL=v;},
        cgetN(v:cfunc){this.now=v;}
        
    }
});
