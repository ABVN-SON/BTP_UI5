using { myDB as my } from '../db/schema';
using { sf_can as sf_can  } from './external/sf_can';
using {sf_emp as sf_emp} from './external/sf_emp';
using { sf_emp_ter as sf_emp_ter } from './external/sf_emp_ter';

@path: '/cat'
service MyService @(requires: 'authenticated-user') {
    entity Employees as projection on my.Employees;
    entity Departments as projection on my.Departments;
    entity Roles as projection on my.Roles;
    entity SF_Candidates as projection on sf_can.Candidate { key candidateId , candidateLocale  ,cellPhone }; 
    entity SF_Employment as projection on sf_emp.EmpEmployment {
         key   employmentId,
            startDate,
            endDate
            
        };
    entity SF_EmpTer as projection on sf_emp_ter.EmpEmploymentTermination {
           
           key lastDateWorked,
            createdBy , 
            createdDateTime

        };
    @open
    type object {};
    function CaculateSalary( id : Employees:ID  ) returns Integer ; 
    function getRole(input : object) returns object ;
    
}




 