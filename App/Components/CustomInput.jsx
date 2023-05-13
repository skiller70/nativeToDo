import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {
  Text,
  View,
  StyleSheet,

  // ScrollView,
  // KeyboardAvoidingView,
  // Keyboard,
  // FlatList,
} from 'react-native';
export const CustomInput = props => {
  // HOOKS
  const {placeholder, field,errors} = props;

  const colors = useTheme();

  // HOOKS
console.log(errors)
  return (
    <View>
      <TextInput
        error={errors}
        placeholder={placeholder}
        mode="outlined"
        outlineColor={colors.text}
        activeOutlineColor={colors.text}
        style={{...styles.inputText}}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
      />
      {errors?<Text style={{fontSize: 17, color: 'red', marginTop: 5}}>
          {errors.message}
        </Text>:null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    marginTop: 15,
    paddingLeft: 15,
  },
});
