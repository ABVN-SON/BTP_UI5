using { myDB as my } from '../db/schema';


@path: '/Admin'
service AdminService @(requires: 'authenticated-user') {
   @odata.draft.enabled
    entity Employees as projection on my.Employees;
    entity Departments as projection on my.Departments;
    entity Roles as projection on my.Roles;
    function CaculateSalary( id : Employees:ID   ) returns Integer
}
