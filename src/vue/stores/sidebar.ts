import { defineStore } from "pinia";
export const SideBarStore=defineStore('sidebar',{
    state:()=>(
        {
            showAddon:false
        }
    ),
    actions:{
        changet(){
            if(this.showAddon==null) this.showAddon=false;
            this.showAddon=!this.showAddon;
        }
    }
})