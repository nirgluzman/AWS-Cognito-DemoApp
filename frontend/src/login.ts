import { Amplify } from 'aws-amplify';
import amplifyConfig from '../amplifyConfig.json';

import {
  signIn, // sign-in a user
  fetchAuthSession, // retrieve the current authentication session details
} from 'aws-amplify/auth';

// packages to obtain Cognito credentials
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

// configure Amplify for Cognito authentication
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: amplifyConfig.amplify.userPoolId,
      userPoolClientId: amplifyConfig.amplify.userPoolClientId,
      identityPoolId: amplifyConfig.amplify.identityPoolId,
    },
  },
});

// use the idToken returned to get AWS credentials from Cognito Federated Identity Pools
async function getCognitoCredentials(idToken: string) {
  // construct a Cognito Identity Pool endpoint URL that is used for authentication with Cognito.
  const cognitoIdentityPool = `cognito-idp.${amplifyConfig.aws.region}.amazonaws.com/${amplifyConfig.amplify.userPoolId}`;

  // create a new Cognito Identity client that will be used to interact with AWS services using temporary credentials.
  const cognitoIdentity = new CognitoIdentityClient({
    credentials: fromCognitoIdentityPool({
      identityPoolId: amplifyConfig.amplify.identityPoolId,
      clientConfig: { region: amplifyConfig.aws.region },
      logins: {
        [cognitoIdentityPool]: idToken,
      },
    }),
  });

  // retrieve AWS credentials from the Cognito Identity configuration.
  const credentials = await cognitoIdentity.config.credentials();
  return credentials;
}

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
