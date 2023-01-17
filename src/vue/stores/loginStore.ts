import { defineStore } from 'pinia'

export const loginStore = defineStore("login", {
    state:()=>(
        {
            LoginState:0 as number,
            token:null as string | null,
            code:null as string | null,
            UserName:'未注册' as string
        }
    ),
    actions:{
        ChangeLoginState(v:number){
            this.LoginState=v;
        },
        ChangeToken(v:string|null){
            this.token=v;
        },
        ChangeCode(v:string|null){
            this.code=v;
        },
        ChangeName(v:string){
            this.UserName=v;
        }
    },
    persist:{
        enabled:true,
        strategies:[
            {   
                key:'token',//存储的key值
                storage:localStorage,//存储的位置
                paths:['code','LoginState','token','UserName'] //默认持久化state的全部，paths指定持久化的对象
            }
        ]
    },
});