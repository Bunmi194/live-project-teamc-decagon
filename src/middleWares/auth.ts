import { check, validationResult } from "express-validator";

export const signUpAuth = {
  body: [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("gender", "Gender is required").not().isEmpty(),
    check("dateOfBirth", "Date of birth is required").not().isEmpty(),
    check("password", "Password is required and must be more than 5 characters")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
  ],
};

export const changePasswordAuth = {
  body: [
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("password", "Password is required and must be more than 5 characters")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check(
      "newPassword",
      "New password is required and must be more than 5 characters"
    )
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      })
      .custom((value, { req }) => {
        if (value === req.body.password) {
          throw new Error("New password cannot be the same as old password");
        }
        return true;
      }),
    ,
    check("confirmPassword", "Confirm password is required").not().isEmpty(),
  ],
};

export const loginAuth = {  
  body: [ 
    check("email", "Email is required").not().isEmpty().isEmail(),
    check("password", "Password is required and must be more than 5 characters")
      .not() 
      .isEmpty()
      .isLength({ min: 6 }),
  ], 
};
