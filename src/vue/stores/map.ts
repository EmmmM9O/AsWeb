import {defineStore} from 'pinia';
interface Map{
    id:number,
    name:string,
    upload:string,
    decs:string,
    MapPath:string,
    another:string
}
export const mapStore =  defineStore("map",{
    state:()=>(
        {
            page:1 as number,
            maps:[] as Array<Map>,
            pageSize:12 as number,
            show:false,
            mapNow:null as null | Map
        }
    ),
    actions:{
        changeMap(v:Array<Map>){
            this.maps=v;
        },
        changePage(v:number){
            this.page=v;
        },
        turn(){
            this.show=!this.show;
        },
        cho(map:Map){
            this.mapNow=map;
        }
    }
})