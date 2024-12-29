import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TextInput } from 'react-native';
import { z } from 'zod';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showSignInText, setShowSignInText] = useState(true);
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('Legal');
  };

  const emailSchema = z.string().email({ message: 'Invalid email address' });
  const passwordSchema = z.string().min(8, { message: 'Password must be at least 8 characters long' });

  useEffect(() => {
    const isValidEmail = emailSchema.safeParse(email).success;
    const isValidPassword = passwordSchema.safeParse(password).success;
    const isConfirmPasswordValid = password === confirmPassword;

    setButtonDisabled(!(isValidEmail && isValidPassword && isConfirmPasswordValid));
  }, [email, password, confirmPassword]);

  const validateEmail = () => {
    if (email && !emailSchema.safeParse(email).success) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const lengthCheck = password.length >= 8;
    const upperCaseCheck = /[A-Z]/.test(password);
    const specialOrNumberCheck = /[0-9!@#$%^&*]/.test(password);

    if (!lengthCheck) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!upperCaseCheck) {
      setPasswordError('Password must have at least one uppercase letter');
    } else if (!specialOrNumberCheck) {
      setPasswordError('Password must have at least one number or special character');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowSignInText(false);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowSignInText(true);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Please fill in the details to sign up</Text>
        </View>

        <TextInput
          style={[styles.input, emailError && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={validateEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={[styles.input, passwordError && styles.inputError]}
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword();
          }}
          onBlur={validatePassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TextInput
          style={[styles.input, confirmPasswordError && styles.inputError]}
          placeholder="Confirm Password"
          secureTextEntry={secureTextEntry}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={validateConfirmPassword}
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, buttonDisabled ? styles.disabledButton : styles.enabledButton]}
          onPress={handleSignUp}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {showSignInText && (
          <View style={styles.footerContainer}>
            <Text style={styles.signupText}>
              Already have an account?{' '}
              <Text style={styles.signupLink} onPress={() => navigation.navigate('Signin')}>
                Sign In
              </Text>
            </Text>
          </View>
        )}

        <Toast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 83,
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#518462',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  enabledButton: {
    backgroundColor: '#518462',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: -11,
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    marginTop: 20,
  },
  signupLink: {
    color: '#007AFF',
  },
});

export default SignUpScreen;
