using { AdminService as Admin  } from './AdminService';
using { MyService as cat  } from './cat-service';

annotate cat with @( 
    restrict:[{
      grant : ['READ'],
      to : 'viewer'
    },
    {
       grant : ['READ','WRITE'],
       to : 'admin'
    }],
    requires: [
     'viewer',
     'admin'
    ]
 ) ;

annotate cat.Employees with @(
  restrict:[{
    grant : ['READ'],
    to : 'viewer'
  } ]
) ;


   
