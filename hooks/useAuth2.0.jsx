import { useState, useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const useGoogleSignIn = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:"355931551853-ieqmb60u7b0vchorin6bv3tdtpmv29fa.apps.googleusercontent.com"
    });
  }, []);

  const signIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
    } catch (err) {
      let errorMessage = 'An unknown error occurred.';
      if (err.code === statusCodes.IN_PROGRESS) {
        errorMessage = 'Sign-in operation already in progress.';
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Play Services are not available or outdated.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    userInfo,
    error,
    loading,
    signIn,
  };
};
