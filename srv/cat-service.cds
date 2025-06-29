using { myDB as my } from '../db/schema';

@path: '/cat'
service MyService @(requires: 'authenticated-user') {
    entity Employees as projection on my.Employees;
    entity Departments as projection on my.Departments;
    entity Roles as projection on my.Roles;
    @open
    type object {};
    function CaculateSalary( id : Employees:ID  ) returns Integer ; 
    function getRole(input : object) returns object ;
    
}




 