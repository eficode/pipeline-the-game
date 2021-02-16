const translations = {
  auth: {
    errors: {
      'auth/invalid-email': 'Email not valid',
      'auth/user-disabled': 'User disabled',
      'auth/user-not-found': 'Email or password invalid',
      'auth/wrong-password': 'Email or password invalid',
      'auth/invalid-action-code': 'Verification link invalid or already used',
      'auth/email-already-in-use': 'Ops, it seems that this email is not allowed',
      invalidEmail: 'Invalid email',
      passwordRequirements:
        'The password must be 8 chars long and should contain at least a lowercase letter, an uppercase letter and a number',
      passwordMatch: 'The two password must match',
    },
    logout: 'Sign out',
  },
  createGame: {
    title: 'Choose a scenario',
    subtitle: 'Pick one of the {{cardsCount}} pre-made scenarios or create your own',
    writeYours: 'Make your own',
    createButtonText: 'Start Game',
  },
  dashboard: {
    title: 'Pipeline - The Game that Delivers',
    newGameLabel: 'Create game',
    message:
      'You can either join an existing game if someone shared a link with you or create a new game and invite others to play, in that case, you’ll be the facilitator. Keep in mind that only the facilitator can trigger the review mode at the end of the game.\n' +
      'Read more about the game here.',
    joinGame: ' Join game',
    joinButton: 'Join',
    contactUs: 'Contact us',
  },
  game: {
    id: 'ID: ',
    panel: {
      stackTooltip: 'Stacked View',
      verticalTooltip: 'Vertical view',
    },
    toolbar: {
      exitTooltip: 'Exit game',
      shareTooltip: 'Share game',
      rulesTooltip: 'Game rules',
      reviewTooltip: 'Trigger Review',
    },
    dial: {
      zoomInTooltip: 'Zoom in',
      zoomOutTooltip: 'Zoom out',
      fitTooltip: 'Fit to screen',
    },
    contactUs: 'Contact us',
    share: {
      title: 'Share the game',
      subtitle: 'Copy the link below and share it with your colleagues.',
      copied: 'Link copied!',
    },
    backToGame: 'Back to game',
    rules: 'Game Rules',
    triggerReview: {
      title: 'Trigger reivew',
      subtitle: 'If you continue, the players will be asked to review their pipeline.',
      buttonText: 'Trigger review',
      reviewTime: "It's review-time!",
      reviewUnlocked:
        'You have unlocked the review, which can be found beside the scenario on your screen. Use it to reflect on your pipeline with your team.',
      understood: 'Understood',
    },
    confirmExit: {
      title: 'Do you really want to exit this game?',
    },
    initializing: 'Initializing game board',
    notFound: 'The selected game was not found',
    offlineOverlay: {
      title: 'Ops, you are offline',
      subtitle: 'Refresh the page to re-sync',
    },
    estimationPlaceholder: 'Write time estimation',
    review: {
      title1: 'Calculate the Deployment Lead Time',
      content1:
        '• “A Developer Commits Code” -> “Deploy to Production.”\n\n Add up the total time (times are written on sticky notes on each card). Add any waiting time between steps.',
      title2: 'Compare with your Competitor Lead Time & Discuss',
      content2:
        '• If theirs is longer: Are you skipping important tests and risking quality problems?\n • If theirs is shorter: How do you think they achieve that?\n • Will you be able to out-compete them?',
    },
  },
  login: {
    title: 'Sign in to play',
    notYetAccount: "Haven't played yet?",
    goToSignup: 'Create account',
    form: {
      email: {
        label: 'Email',
        placeholder: 'james.smith@eficode.com',
      },
      password: {
        label: 'Password',
        placeholder: 'Test1234',
        forgot: 'Forgot?',
      },
      buttonText: 'Sign in',
    },
    privacy: {
      text: "By signing in I agree to Eficode's",
      link: 'Privacy Policy',
    },
  },
  forgotPassword: {
    title: "Let's reset your password",
    subTitle:
      'Enter your email and we will send you a link to reset your password if the address is connected to an account.',
    backTo: 'Back to',
    backToLink: 'Sign In',
    form: {
      email: {
        label: 'Email',
        placeholder: 'james.smith@eficode.com',
      },
      buttonText: 'Send email',
    },
    success: {
      title: 'Check your email',
      message: 'We sent a mail to {{email}}. Click the link in the mail to create a new password.',
      resend: 'Resend',
    },
  },
  resetPassword: {
    title: 'Create new password',
    goTo: 'Go to',
    goToLink: 'Login',
    form: {
      password: {
        label: 'New password',
        placeholder: 'Test1234',
      },
      repeatPassword: {
        label: 'Repeat new password',
        placeholder: 'Test1234',
      },
      buttonText: 'Reset password',
    },
    success: {
      title: 'Password reset successfully',
      buttonText: 'Go to login',
    },
  },
  signup: {
    title: 'Sign up to play',
    alreadyAccount: 'Already have an account?',
    goToSignIn: 'Sign in',
    verificationRequired: {
      title: 'Check your email',
      message: 'We sent a mail to {{email}}. Click the link in the mail to confirm your email address.',
      resend: 'Resend email',
      resendSuccess: 'Resend success',
    },
    form: {
      firstName: {
        label: 'First name',
        placeholder: 'James',
      },
      lastName: {
        label: 'Last name',
        placeholder: 'Smith',
      },
      email: {
        label: 'Email',
        placeholder: 'james.smith@eficode.com',
      },
      password: {
        label: 'Password',
        placeholder: 'Test1234',
        forgot: 'Forgot?',
      },
      repeatPassword: {
        label: 'Repeat password',
        placeholder: 'Test1234',
      },
      roleLabel: 'What is your role in your company?',
      maturityLabel: 'How mature are your DevOps practices?',
      buttonText: 'Sign up',
    },
    privacy: {
      text:
        'Eficode needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our',
      link: 'Privacy Policy',
    },
  },
  general: {
    goTo: 'Go to',
    cancel: 'Cancel',
    done: 'Done',
    exit: 'Exit',
    refresh: 'Refresh',
    errors: {
      required: 'This field is required',
    },
    emptyOptionLabel: 'None selected',
    chromeBanner: 'To get the best experience, we recommend that you view this service in',
    chrome: 'Google Chrome',
  },
  card: {
    type: {
      scenario: 'Scenario',
      'pipeline-step': 'Pipeline Step',
      'game-rule': 'Game Rule',
      review: 'Review',
    },
    tag: {
      'delivery-step': 'Delivery Step',
      'manual-step': 'Manual Step',
      'deploy-step': 'Deploy Step',
      'system-test': 'System Test',
      package: 'Package',
    },
  },
};

export default translations;
