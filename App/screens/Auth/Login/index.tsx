import React, { useEffect } from 'react';
import {
  BackHandler,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from '@mtourj/react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';;
import Button from '../../../uikit/Button';
import Text from '../../../uikit/Text';
import TextInput from '../../../uikit/TextInput';
import { navigate, pop, replace } from '../../../helper/navigation';
import {
  getSessionData,
  setSessionData,
  getNewUserRegisted,
} from '../../../storage/auth';
import AuthContext from '../../../context/Auth';
import Colors from '../../../theme/colors';
import { ICON_HIDE_PASSWORD, ICON_SHOW_PASSWORD } from '../../../assets/icon';
import { FOOD_WASTE_MASKOT } from '../../../assets/images';

const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { setIsAuthenticated, setAccountData, isAuthenticated } =
    React.useContext(AuthContext);
  const [errorMessageAfterSubmit, setErrorMessageAfterSubmit] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  
  useEffect(() => {
    const isCheckData = async () => { 
      if (isAuthenticated) {
        replace('MainNavigator', { screen: 'MainScreen' });
      } else {
        const getDataUser = await getSessionData();
        if (!!getDataUser?.length) {
          setIsAuthenticated(true);
          setAccountData(getDataUser);
          replace('MainNavigator', { screen: 'MainScreen' });
        }
      }
    }

    isCheckData();
  }, [])

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Format email harus sesuai")
      .required("Email harus diisi"),
    password: yup
      .string()
      .required("Kata sandi harus diisi"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const formValues = watch();
  const isAllFieldFilled = Object.values(formValues).every((val) => val);

  const onPressRegister = () => {
    navigate('RegistrationScreen');
  };

  const doResetErrorSubmit = () => {
    if (errorMessageAfterSubmit) setErrorMessageAfterSubmit(' ');
  };

  const onSubmitLogin = async ({ email, password }: { email: string; password: string }) => {
    doResetErrorSubmit();
    Keyboard.dismiss();
    const getNewAccount: Array<{
      email: string;
      name: string;
      password: string;
      passwordConfirmation: string;
    }> = await getNewUserRegisted();
    const isCheckData = getNewAccount.some(value => value?.email === email && value?.password === password);
    if (isCheckData) {
      const getData = getNewAccount.filter(value => value?.email === email && value?.password === password);
      await setSessionData(getData);
      setIsAuthenticated(true);
      setAccountData(getData);
      replace('MainNavigator', { screen: 'MainScreen' });
    } else {
      setErrorMessageAfterSubmit("User name dan password tidak di temukan");
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={150}
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        style={styles.logoContainer}
        source={FOOD_WASTE_MASKOT}
        testID="login-imageview"
        accessibilityLabel="login-imageview"
      />
      <View style={styles.inputContainer}>
        <Text
          testID="error-message-login"
          accessibilityLabel="error-message-login"
          style={styles.errorLabelForm}
        >
          {errorMessageAfterSubmit}
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inverted
              autoCompleteType="email"
              label={"Email"}
              isError={!!errors?.email?.message}
              errorText={errors?.email?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              text={value}
              contentInset={{
                label: 10,
                input: 10,
              }}
              testID="text-input-email-login"
              testIDHelper="text-input-email-login-error"
              accessibilityLabel="login-email-field"
              accessibilityLabelHelper="login-email-field-textview"
              keyboardType="email-address"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inverted
              containerStyle={styles.textInputContainer}
              secureTextEntry={!showPassword}
              isError={!!errors?.password?.message}
              errorText={errors?.password?.message}
              autoCompleteType="password"
              label={"Kata Sandi"}
              onChangeText={onChange}
              onBlur={onBlur}
              text={value}
              contentInset={{
                label: 10,
                input: 10,
              }}
              rightIcon={{
                name: showPassword ? ICON_SHOW_PASSWORD : ICON_HIDE_PASSWORD,
                size: 14,
                color: Colors.WHITE,
                onPress: () => {
                  setShowPassword(!showPassword);
                },
                testID: 'button-show-password',
              }}
              testID="text-input-password-login"
              testIDHelper="text-input-password-login-error"
              accessibilityLabel="login-password-field"
              accessibilityLabelHelper="login-password-field-textview"
            />
          )}
        />

        <Button
          loading={isLoading}
          disabled={!isAllFieldFilled}
          style={styles.buttonContainer}
          title={"Masuk"}
          onPress={handleSubmit(onSubmitLogin)}
          testID="button-login"
          accessibilityLabel="login-button"
          mode='contained-inverted'
        />
        <Button
          style={styles.buttonContainer}
          title={"Daftar Sekarang"}
          onPress={onPressRegister}
          testID="button-registration"
          accessibilityLabel="login-link-register"
          mode='outlined-bw'
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN_47,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 15,
    width: 350,
    height: 350,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
  textInputContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  errorLabelForm: {
    color: Colors.RED,
    textAlign: 'right',
    marginBottom: 0,
  },
  labelForgotPassword: {
    color: Colors.WHITE,
    textAlign: 'right',
    marginBottom: 0,
  },
});

export default LoginScreen;
