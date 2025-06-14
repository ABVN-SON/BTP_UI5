function hasnonumber(str) {
    return !/\d/.test(str);
}

function compareDate(obj) { 
return new Date( obj?.dateOfBirth )  >= new Date( obj?.hireDate ) ; 
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function updateSalaryIfOver3Years(obj) {
    if (!obj?.hireDate || !obj?.salary) return obj;
  
    const hireDate = new Date(obj.hireDate);
    const currentDate = new Date();
  
    const yearsWorked = (currentDate - hireDate) / (1000 * 60 * 60 * 24 * 365);
  
    if (yearsWorked > 3) {
        obj.salary *= 3;
    }
    return obj ; 
  }
module.exports = { hasnonumber , compareDate,isValidEmail , updateSalaryIfOver3Years};
  