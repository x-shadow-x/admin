import AdminControl from '@/pages/admin-control';
import Modules from '@/modules/module-config';

export default [{
        path: '/',
        redirect: '/admin'
    }, {
        path: '/admin',
        component: AdminControl,
        children: [
            {
                path: '/admin',
                redirect: '/article'
            },
            ...Modules.routes
        ],
    }
]