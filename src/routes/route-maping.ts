export const routes = [
  {
    path: '/',
    componentPath: '/system-manager/user-manager'
  },
  {
    path: '/login',
    componentPath: '/login'
  },
  {
    path: '/workspace',
    componentPath: '/workspace'
  },
  // 系统管理
  {
    path: '/system_manager/user_manager',
    componentPath: '/system-manager/user-manager'
  },
  {
    path: '/system_manager/role_manager',
    componentPath: '/system-manager/role-manager'
  },
  {
    path: '/system_manager/source_manager',
    componentPath: '/system-manager/source-manager'
  },
  // 系统监控
  {
    path: '/system_monitor/timing_task',
    componentPath: '/system-monitor/timing-task'
  },
  // 基础信息管理
  {
    path: '/basic_info_manager/grade_manager',
    componentPath: '/basic-info-manager/grade-manager'
  },
  {
    path: '/basic_info_manager/class_manager',
    componentPath: '/basic-info-manager/class-manager'
  },
  {
    path: '/basic_info_manager/term_manager',
    componentPath: '/basic-info-manager/term-manager'
  },
  {
    path: '/basic_info_manager/students_info',
    componentPath: '/basic-info-manager/students-info'
  },
  {
    path: '/basic_info_manager/court_info',
    componentPath: '/basic-info-manager/court-info'
  },
  {
    path: '/basic_info_manager/team_info',
    componentPath: '/basic-info-manager/team-info'
  },
  {
    path: '/basic_info_manager/school_district_address',
    componentPath: '/basic-info-manager/school-district-address'
  },
  // 数据管理
  {
    path: '/data_statistics/score_board',
    componentPath: '/data-statistics/score-board'
  },
  {
    path: '/data_statistics/shoot_board',
    componentPath: '/data-statistics/shoot-board'
  },
  // 比赛管理
  {
    path: '/race_manager/race_info',
    componentPath: '/race-manager/race-info'
  },
  // 机构管理
  {
    path: '/organization_manager/organization_info',
    componentPath: '/organization-manager/organization-info'
  },
  // 入学管理
  {
    path: '/entrance_manager/address_manager',
    componentPath: '/entrance-manager/address-manager'
  },
  {
    path: '/entrance_manager/entrance_review',
    componentPath: '/entrance-manager/entrance-review'
  },
  {
    path: '/entrance_manager/review_detail/:id/:type',
    componentPath: '/entrance-manager/review-detail'
  }
]

export const siderData = [
  {
    outPath: '/workspace',
    outName: '工作台',
    icon: 'home'
  },
  {
    outPath: '/organization_manager',
    outName: '机构管理',
    icon: 'bank',
    items: [
      {
        path: '/organization_info',
        name: '机构信息',
        icon: 'table'
      }
    ]
  },
  {
    outPath: '/system_manager',
    outName: '系统管理',
    icon: 'appstore',
    items: [
      {
        path: '/user_manager',
        name: '用户管理',
        icon: 'table'
      },
      {
        path: '/role_manager',
        name: '角色管理',
        icon: 'table'
      },
      {
        path: '/source_manager',
        name: '资源管理',
        icon: 'table'
      }
    ]
  },
  {
    outPath: '/system_monitor',
    outName: '系统监控',
    icon: 'eye',
    items: [
      {
        path: '/timing_task',
        name: '定时任务',
        icon: 'table'
      }
    ]
  },
  {
    outPath: '/basic_info_manager',
    outName: '基础信息管理',
    icon: 'database',
    items: [
      {
        path: '/grade_manager',
        name: '年级管理',
        icon: 'table'
      },
      {
        path: '/class_manager',
        name: '班级管理',
        icon: 'table'
      },
      {
        path: '/term_manager',
        name: '学年管理',
        icon: 'table'
      },
      {
        path: '/students_info',
        name: '学生信息',
        icon: 'table'
      },
      {
        path: '/team_info',
        name: '球队信息',
        icon: 'table'
      },
      {
        path: '/court_info',
        name: '场地信息',
        icon: 'table'
      },
      {
        path: '/school_district_address',
        name: '学区地址',
        icon: 'table'
      }
    ]
  },
  {
    outPath: '/race_manager',
    outName: '赛事管理',
    icon: 'project',
    items: [
      {
        path: '/race_info',
        name: '赛事信息',
        icon: 'table'
      }
    ]
  },
  {
    outPath: '/data_statistics',
    outName: '数据统计',
    icon: 'table',
    items: [
      {
        path: '/score_board',
        name: '积分榜',
        icon: 'table'
      },
      {
        path: '/shoot_board',
        name: '射手榜',
        icon: 'table'
      }
    ]
  },
  {
    outPath: '/entrance_manager',
    outName: '入学管理',
    icon: 'table',
    items: [
      {
        path: '/address_manager',
        name: '地址管理',
        icon: 'table'
      },
      {
        path: '/entrance_review',
        name: '入学审核',
        icon: 'table'
      },
      {
        path: '/review_detail',
        name: '审核详情',
        icon: 'table'
      }
    ]
  }
]
