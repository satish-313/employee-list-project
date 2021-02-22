const errors = {};

const registrationValidation = (
  user,
  email,
  phone,
  password,
  confirmPassword
) => {
  if (user.length < 5) {
    errors.name = "user must be 5 digit long";
  }

  if (email.trim().length < 4) {
    errors.email = "must fill the email field";
  } else {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be valid email address";
    }
  }

  if (phone.length !== 10) {
    errors.phone = "must fill the valid phone number";
  }

  if (password.trim().length < 5) {
    errors.password = "password must 5 length";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password must be match";
  }

  if (confirmPassword.trim().length < 5) {
    errors.confirmPassword = "confirm password must be 5 digit long";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const loginValidation = (emailOrPhone, password) => {
  if (password.trim().length < 5) {
    errors.password = "password must 5 length";
  }

  if (emailOrPhone.includes("@")) {
    if (emailOrPhone.trim().length < 4) {
      errors.EmailOrPhone = "must fill the email field";
    } else {
      const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailOrPhone.match(regEx)) {
        errors.EmailOrPhone = "Email must be valid email address";
      }
    }
  } else {
    if (emailOrPhone.length !== 10) {
      errors.EmailOrPhone = "must d fill the valid phone number";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const employeValidation = (name,age,salary,phoneNumber) => {
  if (name.length < 5) {
    errors.name = "user must be 5 digit long";
  }

  if (phoneNumber.length !== 10) {
    errors.phoneNumber = "must fill the valid phone number";
  }

  if (salary < 0) {
    errors.salary = "salary must be greater than zero";
  }

  if (age < 18) {
    errors.age = "age must be greater than 18";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };

}

export { registrationValidation,loginValidation,employeValidation };
