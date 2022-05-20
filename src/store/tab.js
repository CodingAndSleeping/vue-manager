import Cookie from 'js-cookie';
export default {
    state: {
        isCollapse: false,
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "home"
            }
        ],
        currentMenu:null,
        menu:[]
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val){
            if(val.name !== "home"){
                state.currentMenu = val;
                const result = state.tabList.findIndex(item=>item.name === val.name);
                if(result === -1){
                    state.tabList.push(val)
                }
            }else{
                state.currentMenu = null;
            }
        },
        closeTag(state, val){
            const result = state.tabList.findIndex(item=>item.name===val.name);
            state.tabList.splice(result, 1)
        },
        setMenu(state, val){
            state.menu = val;
            Cookie.set("Menu", JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = [];
            Cookie.remove("Menu")
        },
        addMenu(state, val){
            if(!Cookie.get("Menu")){
                return
            }
            const menu = JSON.parse(Cookie.get("Menu"))
            state.menu = menu;
            const menuArray = []
            menu.forEach(item=>{
                if(item.children){
                    item.children = item.children.map(item=>{
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    });
                    menuArray.push(...item.children);
                }else{
                    item.component = () => import(`@/views/${item.url}`);
                    menuArray.push(item);
                }
            });
            menuArray.forEach(item=>{
                val.addRoute("main", item)
            })
        }
    },
    actions: {

    }
}