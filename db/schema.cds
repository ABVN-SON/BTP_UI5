using { cuid, managed, Currency } from '@sap/cds/common';
namespace myDB;
 
entity Employees : cuid, managed {
    firstName : String;
    lastName: String;
    email: String;
    hireDate: Date;
    dateOfBirth: Date;
    salary: Decimal;
    Currency: Currency;
    age : Integer; 
    position: String;
    department: Association to Departments;
    role : Association to Roles ; 
 }
 
entity Departments : cuid, managed {
    name: String;
    location : String;
}

entity Roles : cuid ,  managed {
    name : String(50) ;
    baseSalary : Int16

}
