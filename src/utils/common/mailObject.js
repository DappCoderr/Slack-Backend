import { APP_LINK, MAIL_ID } from '../../config/server_config.js';

export const workspaceJoinMail = (workspace, userName) => {
  return {
    from: MAIL_ID,
    subject: 'You’ve been added to a workspace 🎉',
    text: `
    Hi ${userName},

    Congratulations! You have been added to the workspace ${workspace.name} by the owner.

    Keep safe message and hang out with others.
    `
  };
};

export const verifyEmailMail = (verificationToken) => {
  return {
    from: MAIL_ID,
    subject: 'Welcome to the app. Please verify your email',
    text: `
      Welcome to the app. Please verify your email by clicking on the link below:
     ${APP_LINK}/verify/${verificationToken}
    `
  };
};
