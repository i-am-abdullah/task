import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGoogleSignIn } from '../../hooks/useAuth2.0';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  
  const { userInfo, error, loading, signIn, signOut } = useGoogleSignIn();

  const handleSignInWithGoogle = async () => {
    try {
      await signIn(); 
      if (userInfo) {
        navigation.navigate('Dashboard');  
      }
    } catch (e) {
      console.log("Error during Google Sign-In:", e);
    }
  };

  const handleSignInWithEmail = () => {
    navigation.navigate('Signin');
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
     <Image source={require("../../assets/pic.jpg")} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Task Project</Text>
        <Text style={styles.subtitle}>Lorem ipsum is a dummy text</Text>

        <TouchableOpacity onPress={handleSignInWithEmail} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Sign In with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignInWithGoogle} style={styles.secondaryButton} disabled={loading}>
          <Text style={styles.secondaryButtonText}>Sign In with Google</Text>
        </TouchableOpacity>

        {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}

        <Text style={styles.signupText}>
          Don’t have an account?{" "}
          <Text style={styles.signupLink} onPress={handleSignUp}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: "100%",
    height: "64%",
    resizeMode: "cover",
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#518462',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#518462',
  },
  secondaryButtonText: {
    color: '#518462',
    fontSize: 16,
    fontWeight: '500',
  },
  signupText: {
    fontSize: 14,
    marginTop: 20,
    color: '#888',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
