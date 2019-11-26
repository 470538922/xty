//主要为全部菜单结构和权限的配置，visible=true不在菜单显示，defaultDock=true会跳过lookUp权限默认在菜单显示
//permissionCode为权限映射码，若permissionCode未对应到用户权限则不显示也无跳转访问权限
//route和routeReg为匹配路由，二者必须有一个，若都有则为“或”逻辑
export default [{
    menu: '仓库管理',
    permissionCode: 'warehouse',
    icon: '&#xe60a;',
    defaultDock: false,
    subMenu: [{
        menu: '仓库列表',
        route: '/warehouse',
        key: 'warehouse',
        permissionCode: 'order_lookup',
    },
    {
        menu: '库位管理',
        route: '/location',
        key: 'location',
        permissionCode: 'order_lookup',
    },
    {
        menu: '分类管理',
        route: '/classify',
        key: 'classify',
        permissionCode: 'order_lookup',
    }, {
        menu: '采购入库单',
        route: '/procurementStock',
        key: 'procurementStock',
        permissionCode: 'order_lookup',
    },
    {
        menu: '生产入库单',
        route: '/productionStock',
        key: 'productionStock',
        permissionCode: 'order_lookup',
    },
    {
        menu: '退料入库单',
        route: '/backStock',
        key: 'backStock',
        permissionCode: 'order_lookup',
    },
    {
        menu: '退料入库新增',
        route: '/backStock/addBackStock',
        key: 'addBackStock',
        visible: true,
        permissionCode: 'order_lookup',
    },
    {
        menu: '退料入库修改',
        route: '/backStock/editBackStock',
        key: 'editBackStock',
        visible: true,
        permissionCode: 'order_lookup',
    },
    {
        menu: '其它入库单',
        route: '/otherStock',
        key: 'otherStock',
        permissionCode: 'order_lookup',
    },
    ]
},
{
    menu: '出库管理',
    permissionCode: 'putOutStorage',
    icon: '&#xe60a;',
    defaultDock: false,
    subMenu: [{
        menu: '领料出库',
        route: '/picking',
        key: 'picking',
        permissionCode: 'order_lookup',
    },
    {
        menu: '销售出库单',
        route: '/market',
        key: 'market',
        permissionCode: 'order_lookup',
    },
    {
        menu: '采购退货单',
        route: '/PurchaseReturn',
        key: 'PurchaseReturn',
        permissionCode: 'order_lookup',
    }, {
        menu: '其他出库单',
        route: '/others',
        key: 'others',
        permissionCode: 'order_lookup',
    },
    ]
},]