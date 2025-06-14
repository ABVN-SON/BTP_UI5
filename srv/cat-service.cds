using { myDB as my } from '../db/schema';

service MyService @(path:'/cat'){
    @odata.draft.enabled
    entity Employees as projection on my.Employees;
    entity Departments as projection on my.Departments;
}
 