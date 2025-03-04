export const loginSchema = {
    email: {
      isLength: {
        options: { min: 5, max: 40 },
        errorMessage: "Email must be between 5 and 40 characters",
      },
      isString: {
        errorMessage: "Email must be a string",
      },
      isEmail: {
        errorMessage: "You need to provide a valid email address.",
      },
    },
    password: {
      isLength: {
        options: { min: 5, max: 40 },
        errorMessage: "Password must be between 5 and 40 characters",
      },
      isString: {
        errorMessage: "Password must be a string",
      },
    },
  };