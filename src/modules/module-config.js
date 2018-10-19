import content from './content-manager/config';
import countAnalyse from './count-analyse/config';
import article from './content-manager/article-manager/config';
import comment from './content-manager/comment-manager/config';
import guideComment from './content-manager/comment-manager/guide-comment-manager/config';
import userComment from './content-manager/comment-manager/user-comment-manager/config';

class ModuleManager {
    constructor() {
        this._menus = {};
        this._routes = [];
        this._menuTree = {};
    }

    get mosules() {
        return {
            menuTree: this._menuTree,
            routes: this._routes
        }
    }

    addMosule(module) {
        if(module && module.menu) {
            this.addMenu(module.menu);
        }
        if(module && module.route) {
            this._routes.push(module.route);
        }

        return this;
    }

    addMenu(menu) {
        const parentId = menu.parentId || 'root';
        this._menus[parentId] = this._menus[parentId] || {
            groupId: parentId,
            lists: {}
        };
        this._menus[parentId].lists[menu.id] = menu;
    }

    getMenu(ids) {
        return (ids.length >= 2 && this._menus[ids[0]] && this._menus[ids[0]].lists[ids[1]]) || {};
    }

    create() {
        const menus = {...this._menus};
        const rootLists = menus['root'].lists;
        for(let key in rootLists) {
            const item = rootLists[key];
            this._menuTree[item.id] = {
                id: item.id,
                parentId: item.parentId,
                title: item.title,
                to: item.to,
                icon: item.icon,
                children: []
            };
        }

        delete menus['root']
        for(let key in this._menuTree) {
            this.butild(this._menuTree[key], menus);
        }
    }

    butild(parantNode, menus) {
        const menuItem = menus[parantNode.id];
        if(menuItem && menuItem.lists) {
            for(let key in menuItem.lists) {
                const item = menuItem.lists[key];
                parantNode.children.push({
                    id: item.id,
                    parentId: item.parentId,
                    title: item.title,
                    to: item.to,
                    icon: item.icon,
                    children: []
                });
                this.butild(parantNode.children[parantNode.children.length - 1], menus);
            }
        }
    }
}

const moduleManager = new ModuleManager();
moduleManager
    .addMosule(countAnalyse)
    .addMosule(content)
    .addMosule(article)
    .addMosule(comment)
    .addMosule(guideComment)
    .addMosule(userComment)
    .create();
export default moduleManager;