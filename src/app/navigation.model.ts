export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'sample',
                        'title': 'Home',
                        'type' : 'item',
                        'icon' : 'home',
                        'url'  : '/sample'
                    },
                    {
                        'id': 'master',
                        'title': 'Master',
                        'type': 'collapse',
                        'icon': 'dashboard',
                        'children': [
                            {
                                'id': 'companies',
                                'title': 'Company',
                                'type': 'item',
                                'url': '/master/company'
                            },
                            {
                                'id': 'division',
                                'title': 'Division',
                                'type': 'item',
                                'url': '/master/division'
                            },
                            {
                                'id': 'jobposition',
                                'title': 'Job Position',
                                'type': 'item',
                                'url': '/master/jobposition'
                            },
                            {
                                'id': 'joblevel',
                                'title': 'Job Level',
                                'type': 'item',
                                'url': '/master/joblevel'
                            },
                            {
                                'id': 'prorate',
                                'title': 'Pro Rate',
                                'type': 'item',
                                'url': '/master/prorate'
                            },
                            {
                                'id': 'payrollcomponent',
                                'title': 'Component',
                                'type': 'item',
                                'url': '/master/component'
                            },
                            {
                                'id': 'timeoffpolicy',
                                'title': 'Time Off Policy',
                                'type': 'item',
                                'url': '/master/timeoffpolicy'
                            },
                            {
                                'id': 'timeoffscheme',
                                'title': 'Time Off Scheme',
                                'type': 'item',
                                'url': '/master/timeoffscheme'
                            },
                            {
                                'id': 'overtime',
                                'title': 'Overtime',
                                'type': 'item',
                                'url': '/master/overtime'
                            },
                            {
                                'id': 'taxsetup',
                                'title': 'Tax Setup',
                                'type': 'item',
                                'url': '/master/taxsetup'
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
