import { defineStore } from 'pinia'

export const UserStore = defineStore("user", {
    state:()=>(
        {
            'name':'未注册',
            'state':0,
            'token':''
        }
    ),
    actions:{
        changeToken(v:string){
            this.token=v;
        },
        changeName(v:string){
            this.name=v;
        },
        changeState(v:number){
            this.state=v;
        }
    },
    persist:{
        enabled:true,
        strategies:[
            {   
            key:'token',//存储的key值
            storage:localStorage,//存储的位置
            paths:['token','name','state'] //默认持久化state的全部，paths指定持久化的对象
        }
        ]
    }
});
export default UserStore;