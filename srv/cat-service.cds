using { myDB as my } from '../db/schema';
using { sf_can as sf_can  } from './external/sf_can';
using {sf_emp as sf_emp} from './external/sf_emp';
using { sf_emp_ter as sf_emp_ter } from './external/sf_emp_ter';

@path: '/cat'
service MyService {
   @odata.draft.enabled
    entity Employees as projection on my.Employees;
    entity Departments as projection on my.Departments;
    entity SF_Candidates as projection on sf_can.Candidate { candidateId , candidateLocale  ,cellPhone }; 
    entity SF_Employment as projection on sf_emp.EmpEmployment {
            employmentId,
            startDate,
            endDate
            
        };
    entity SF_EmpTer as projection on sf_emp_ter.EmpEmploymentTermination {
           
            lastDateWorked,
            createdBy , 
            createdDateTime

        };
}

// @path: '/AdminSRV'
// service AdminService {
//       entity Employees as projection on my.Employees ; 
//       entity Departments as projection on my.Departments;  
        
// }


 