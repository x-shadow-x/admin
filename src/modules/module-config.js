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
        this._menuTree = [];
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
            lists: []
        };
        this._menus[parentId].lists.push(menu);
    }

    create() {
        const menus = {...this._menus}
        const rootLists = menus['root'].lists;
        for(let i = 0, len = rootLists.length; i < len; i++) {
            const item = rootLists[i];
            this._menuTree.push({
                id: item.id,
                title: item.title,
                to: item.to,
                icon: item.icon,
                children: []
            });
        }

        delete menus['root']
        for(let i = 0, len = this._menuTree.length; i < len; i++) {
            this.butild(this._menuTree[i], menus);
        }
    }

    butild(parantNode, menus) {
        const menuItem = menus[parantNode.id];
        if(menuItem && menuItem.lists && menuItem.lists.length > 0) {
            for(let i = 0, len = menuItem.lists.length; i < len; i++) {
                const item = menuItem.lists[i];
                parantNode.children.push({
                    id: item.id,
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
export default moduleManager.mosules;