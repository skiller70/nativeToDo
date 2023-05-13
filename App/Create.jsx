import {useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,

  // ScrollView,
  // KeyboardAvoidingView,
  Keyboard,
  // FlatList,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Controller } from 'react-hook-form';

export const Create = ({navigation}) => {
  //HOOKS
  const {colors} = useTheme();

  //HOOKS

  //LIFE CYCLE
  useEffect(() => {});
  //LIFE CYCLE

  //STATE
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //STATE

  //METHODS
  const signIn = async () => {
    try {
      Keyboard.dismiss();
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      const userId = user.uid;
      console.log(userId);
    } catch (error) {
      console.log(error.message);
    }
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
      {/* **********************1st div********************* */}
        {/* <Text style={{fontSize:20,color:"red",textAlign:"center"}}>
          adasdasd
        </Text> */}
      <View>
        {/* **********************2nd div********************* */}
        <View>
          <TextInput
            onChangeText={text => setEmail(text)}
            mode="outlined"
            outlineColor={colors.text}
            activeOutlineColor={colors.text}
            style={{...styles.inputText}}
            placeholderTextColor={colors.text}
            placeholder="Email Id"></TextInput>

            {/* <Controller control={cont} /> */}
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
            placeholder="ConfirmPassword"
            secureTextEntry={isSecure}></TextInput>
          <TextInput
            onChangeText={text => setConfirmPassword(text)}
            mode="outlined"
            label="Password"
            activeOutlineColor={colors.text}
            outlineColor={colors.text}
            style={{...styles.inputText}}
            placeholderTextColor={colors.text}
            placeholder="Confirm Password"
            secureTextEntry={true}></TextInput>
        </View>
        <View style={{marginTop: 30}}>
          <Button
            onPress={signIn}
            mode="contained"
            style={{
              backgroundColor: colors.text,
              paddingVertical: 6,
              borderRadius: 4,
            }}
            textColor={colors.background}>
            Sign In
          </Button>

          <View style={{display: 'flex', flexDirection: 'row',marginTop:20,justifyContent:"flex-end"}}>
            <Text style={{fontSize: 17,color: colors.text}}>Already have account?</Text>
            <Text
            onPress={()=>navigation.navigate("Login")}
            style={{fontSize: 20, color: colors.text, marginLeft: 10}}>
              Login
            </Text>
          </View>
        </View>
        {/* **********************2nd div********************* */}
      </View>
      {/* **********************1st div********************* */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    marginTop: 15,
    paddingLeft: 15,
  },
});
