const translations = {
  auth: {
    errors: {
      'auth/invalid-action-code': 'Verification link invalid or already used',
    },
    logout: 'Sign out',
  },
  createGame: {
    title: 'Choose a scenario',
    subtitle: 'Premade ({{cardsCount}})',
    writeYours: 'Make your own',
    createButtonText: 'Start Game',
  },
  dashboard: {
    title: 'Pipeline - The Game that Delivers',
    newGameLabel: 'Create game',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    joinGame: ' Join game',
    joinButton: 'Join',
    contactUs: 'Contact us',
  },
  game: {
    contactUs: 'Contact us',
    share: {
      title: 'Share the game',
      subtitle: 'Copy the link below and share it with your colleagues.',
    },
    backToGame: 'Back to game',
    rules: 'Game Rules',
    triggerReview: {
      title: 'Trigger reivew',
      subtitle: 'If you continue, the players will be asked to review their pipeline.',
      buttonText: 'Trigger reivew',
      reviewTime: "It's review-time!",
      reviewUnlocked:
        'You have unlocked the review, which can be found beside the scenario on your screen. Use it to reflect on your pipeline with your team.',
      understood: 'Understood',
    },
    confirmExit: {
      title: 'Do you really want to exit this game?',
    },
    initializing: 'Initializing game board',
  },
  login: {
    title: 'Sign in to play',
    notYetAccount: "Haven't played yet?",
    goToSignup: 'Create account',
    form: {
      emailLabel: 'Email',
      passwordLabel: 'Password',
      buttonText: 'Sign in',
    },
    errors: {
      'auth/invalid-email': 'Email not valid',
      'auth/user-disabled': 'User disabled',
      'auth/user-not-found': 'Email or password invalid',
      'auth/wrong-password': 'Email or password invalid',
    },
  },
  signup: {
    title: 'Signup to play',
    alreadyAccount: 'Already have an account?',
    goToSignIn: 'Sign in',
    verificationRequired: {
      message: "You need to verify your email to start playing! If you don't find it, try in your spam",
      resend: 'Resend email',
      resendSuccess: 'Resend success',
    },
    form: {
      firstNameLabel: 'First name',
      lastNameLabel: 'Last name',
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
        'The password must be 8 chars long and should contain at least a lowercase letter, an uppercase letter and a number',
      passwordMatch: 'The two password must match',
      'auth/email-already-in-use': 'Ops, it seams that this email is not allowed',
    },
  },
  general: {
    cancel: 'Cancel',
    done: 'Done',
    exit: 'Exit',
    errors: {
      required: 'This field is required',
    },
    emptyOptionLabel: 'Select an option',
  },
};

export default translations;
