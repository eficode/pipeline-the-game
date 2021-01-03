const translations = {
  home: {
    title: 'Pipeline - The Game that Delivers!',
    subtitle: 'Random stuff',
  },
  page2: {
    test1: 'Pipeline - The Game that Delivers!',
    test2: 'Random stuff',
  },
  auth: {
    errors: {
      'auth/invalid-action-code': 'Verification link invalid or already used',
    },
  },
  signup: {
    title: 'Signup to play',
    verificationRequired: {
      message: "You need to verify your email to start playing! If you don't find it, try in your spam",
      resend: 'Resend email',
      resendSuccess: 'Resend success',
    },
    form: {
      emailLabel: 'Email',
      passwordLabel: 'Password',
      repeatPasswordLabel: 'Repeat password',
      roleLabel: 'Role',
      maturityLabel: 'DevOps maturity',
      buttonText: 'Signup',
    },
    errors: {
      invalidEmail: 'Invalid email',
      passwordRequirements:
        'The password must be 8 chars long and should contain at least a lowercase letter, an uppercase letter and a spectial character',
      passwordMatch: 'The two password must match',
      'auth/email-already-in-use': 'Ops, it seams that this email is not allowed',
    },
  },
  dashboard: {
    title: 'Pipeline',
    subtitle: 'The Game that Delivers',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  general: {
    errors: {
      required: 'This field is required',
    },
    emptyOptionLabel: 'Select an option',
  },
};

export default translations;
