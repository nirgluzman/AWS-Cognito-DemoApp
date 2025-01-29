import { Amplify } from 'aws-amplify';
import amplifyConfig from '../amplifyConfig.json';

import {
  signIn, // sign-in a user
  fetchAuthSession, // retrieve the current authentication session details
} from 'aws-amplify/auth';

// configure Amplify for Cognito authentication
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: amplifyConfig.amplify.userPoolId,
      userPoolClientId: amplifyConfig.amplify.userPoolClientId,
    },
  },
});

async function logIn(username: string, password: string) {
  const signInResult = await signIn({ username, password });
  console.log(signInResult);
  if (!signInResult.isSignedIn) {
    throw new Error('User is not signed in');
  }

  const session = await fetchAuthSession({ forceRefresh: true });
  console.log(session);
  if (!session) {
    throw new Error('No session found');
  }

  const idToken = session.tokens?.idToken?.toString();
  const accessToken = session.tokens?.accessToken?.toString();

  return { idToken, accessToken };
}

export async function test(element: HTMLButtonElement) {
  element.addEventListener('click', () => {
    console.log('test');
  });
}
