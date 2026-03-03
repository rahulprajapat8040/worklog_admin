// utils/validation.ts

const Validation = {
  required: (fieldName: string) => ({
    required: `${fieldName} is required`,
  }),

  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Enter a valid email address",
    },
  },

  phone: {
    pattern: {
      value: /^[0-9]{7,15}$/,
      message: "Enter a valid phone number (7–15 digits)",
    },
  },

  password: {
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      message:
        "Password must be at least 8 chars, include uppercase, lowercase, number, and special character",
    },
  },

  otp: {
    pattern: {
      value: /^[0-9]{6}$/,
      message: "Enter a valid OTP (6 digits)",
    },
  },

  name: {
    pattern: {
      value: /^[A-Za-z\s]{2,50}$/,
      message: "Name must be 2–50 characters, letters only",
    },
  },

  numeric: {
    pattern: {
      value: /^[0-9]+$/,
      message: "Only numeric values allowed",
    },
  },
};

export default Validation;
