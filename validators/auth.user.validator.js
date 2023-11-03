import yup from 'yup';

const userSignupValidator = yup.object().shape({
    firstName : yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name must contain only alphabets"),
    lastName : yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name must contain only alphabets"),
    email : yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email"),
    password : yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,"Password must contain at least one uppercase, one lowercase, one number and one special character"),
    phone : yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .min(8, "Phone number must be at least 8 digits"), 
    birthdate : yup
    .date()
    //.required("Birthdate is required")
    .max(new Date(Date.now() - 86400000)),
});

export default userSignupValidator;

     
