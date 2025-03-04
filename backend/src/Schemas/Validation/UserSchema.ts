export const userSchema = {
    firstName: {
      isLength: {
        options: { min: 2, max: 30 },
        errorMessage: "First name must be between 2 and 30 characters",
      },
      isString: {
        errorMessage: "First name must be a string",
      },
    },
    lastName: {
      isLength: {
        options: { min: 2, max: 30 },
        errorMessage: "Last name must be between 2 and 30 characters",
      },
      isString: {
        errorMessage: "Last name must be a string",
      },
    },
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
        options: { min: 8 },
        errorMessage: "Password must be at least 8 characters",
      },
      matches: {
        options: /[-_$#]/,  // Consider adjusting this to a more general regex for symbols if needed
        errorMessage: "Password must contain at least one special symbol (-, _, $, or #)",
      },
      isString: {
        errorMessage: "Password must be a string",
      },
    },
  };
  