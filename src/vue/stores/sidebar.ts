import { defineStore } from "pinia";
export const SideBarStore=defineStore('sidebar',{
    state:()=>(
        {
            showAddon:false
        }
    ),
    actions:{
        changet(){
            this.showAddon=!this.showAddon;
        }
    }
})