import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        show:boolean,
        icon:any
    }
}