import { Amplify } from 'aws-amplify';
import amplifyConfig from '../amplifyConfig.json';

// configure Amplify for Cognito authentication"
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: amplifyConfig.amplify.userPoolId,
      userPoolClientId: amplifyConfig.amplify.userPoolClientId,
    },
  },
});

export async function test(element: HTMLButtonElement) {
  element.addEventListener('click', () => {
    console.log('test');
  });
}
