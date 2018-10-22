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
        this._menuSet = {};
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

    getMenu(id) {
        return this._menuSet[id];
    }

    create() {
        const menus = {...this._menus};
        const rootLists = menus['root'].lists;
        for(let i = 0, len = rootLists.length; i < len; i++) {
            const item = rootLists[i];
            const resultItem = {
                id: item.id,
                parentId: item.parentId,
                openNames: '',
                animate: item.animate,
                title: item.title,
                to: item.to,
                icon: item.icon,
                children: []
            };
            this._menuSet[item.id] = resultItem;
            this._menuTree.push(resultItem);
        }

        delete menus['root'];
        for(let i = 0, len = this._menuTree.length; i < len; i++) {
            this.butild(this._menuTree[i], menus);
        }
        console.log(this._menuSet);
    }

    butild(parantNode, menus) {
        const menuItem = menus[parantNode.id];
        if(menuItem && menuItem.lists) {
            const lists = menuItem.lists;
            for(let i = 0, len = lists.length; i < len; i++) {
                const item = lists[i];
                const resultItem = {
                    id: item.id,
                    parentId: item.parentId,
                    openNames: parantNode.openNames ? `${parantNode.openNames}-${parantNode.id}` : `${parantNode.id}`,
                    animate: item.animate,
                    title: item.title,
                    to: item.to,
                    icon: item.icon,
                    children: []
                };
                this._menuSet[item.id] = resultItem;
                parantNode.children.push(resultItem);
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