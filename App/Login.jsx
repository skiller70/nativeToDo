import {useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {
  Text,
  View,
  StyleSheet,

  // ScrollView,
  // KeyboardAvoidingView,
  // Keyboard,
  // FlatList,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {CustomInput} from './Components/CustomInput';
export const Login = ({navigation}) => {
  // HOOKS
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  // HOOKS
  // LIFE CYCLE
  useEffect(() => {});

  // LIFE CYCLE
  //STATE
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //STATE
  //METHODS
  const userLogin = async data => {
    console.log(data);
    // try {
    //   const userCredential = await auth().signInWithEmailAndPassword(
    //     email,
    //     password,
    //   );
    //   const user = userCredential.user;
    //   const userId = user.uid;
    //   dispatch({type: 'setUserLogin', payload: userId});
    //   await AsyncStorage.setItem('userId', userId);
    //   navigation.navigate('Home');
    // } catch (error) {}
  };
  //METHODS

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 35,
        justifyContent: 'center',
        backgroundColor: colors.background,
      }}>
      <View>
        <View>
          {/* EMAIL ID */}
          {/* <TextInput
          onChangeText={(text)=>setEmail(text)}
            mode="outlined"
            outlineColor={colors.text}
            activeOutlineColor={colors.text}
            style={{...styles.inputText}}
            placeholderTextColor={colors.text}
            placeholder="Email id"></TextInput> */}
          {/* <Controller
            name="Email"
            control={control}
            rules={{required: 'Email is required'}}
            render={({field: {onBlur, onChange, value}}) => (
              <>
                {console.log(value)}
                <View>
                  <TextInput
                    error={errors.Email}
                    placeholder="Email id"
                    mode="outlined"
                    outlineColor={colors.text}
                    activeOutlineColor={colors.text}
                    style={{...styles.inputText}}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </>
            )}
          />
          {errors.Email ? (
            <Text style={{fontSize: 17, color: 'red', marginTop: 5}}>
              {errors.Email.message}
            </Text>
          ) : null} */}

          <Controller
            control={control}
            rules={{
              required: 'please enter email',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            }}
            name="Email"
            render={({field}) => (
              <>
                <CustomInput
                  placeholder="Email Id"
                  errors={errors.Email}
                  field={field}
                />
              </>
            )}
          />
          {/* EMAIL ID */}
          {/* PASSWORD */}
          <TextInput
            onChangeText={text => setPassword(text)}
            mode="outlined"
            label="Password"
            activeOutlineColor={colors.text}
            right={
              <TextInput.Icon
                icon="eye"
                size={28}
                onPress={() => setIsSecure(!isSecure)}
              />
            }
            outlineColor={colors.text}
            style={{...styles.inputText}}
            placeholderTextColor={colors.text}
            placeholder="Password"
            secureTextEntry={isSecure}></TextInput>
          {/* PASSWORD */}
        </View>
        <View style={{marginTop: 30}}>
          {/* BUTTON */}
          <Button
            onPress={handleSubmit(userLogin)}
            mode="contained"
            style={{
              backgroundColor: colors.text,
              paddingVertical: 6,
              borderRadius: 4,
            }}
            textColor={colors.background}>
            Login
          </Button>
          {/* BUTTON */}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'flex-end',
          }}>
          <Text style={{fontSize: 17, color: colors.text}}>
            Don't have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate('Sign')}
            style={{fontSize: 20, color: colors.text, marginLeft: 10}}>
            Sign up
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    marginTop: 15,
    paddingLeft: 15,
  },
});
