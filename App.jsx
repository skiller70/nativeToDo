import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {firebase} from '@react-native-firebase/database';
import store from './redux/store';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Login} from './App/Login';
import {Create} from './App/Create';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'black',
    text: 'white',
  },
};
//NAVIGATION STACK
const Stack = createStackNavigator();
//NAVIGATION STACK

//FIREBASE REALTIME DATABASE CONFIGURATION

export const reference = firebase
  .app()
  .database(
    'https://hunny-hub-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );

//FIREBASE REALTIME DATABASE CONFIGURATION

// MAIN COMPONENT
const App = () => {
  //HOOKS

  //HOOKS
  //LIFE CYCLE
  useEffect(() => {});
  //LIFE CYCLE

  return (
    <View style={{flex: 1}}>
      <StoreProvider store={store}>
        <PaperProvider>
          <NavigationComp />
        </PaperProvider>
      </StoreProvider>
    </View>
  );
};

// MAIN COMPONENT

// NAVIGATION COMPONENT
const NavigationComp = () => {
  //HOOKS
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const isUserId = useSelector((state)=>state.toDoReducer.userLogIn)
  //HOOKS

  //LIFE CYCLE
  useEffect(() => {
    getUserId()
  });
  //LIFE CYCLE
  //METHODS
  const getUserId = async () => {
    try {
      // const userId = await AsyncStorage.getItem('userId');
      // dispatch({type: 'setUserLogin', payload: userId});
      // await AsyncStorage.removeItem("userId")
    } catch (error) {}
  };
  //METHODS

  return (
    <View style={{flex: 1}}>
      <NavigationContainer theme={scheme === 'dark' ? MyTheme : DefaultTheme}>
        <Stack.Navigator>
          {isUserId ? (
            <Stack.Screen name="Home" component={HunnyHub} options={{headerRight:()=>{<View><Button mode='contained'>Sign out</Button></View>}}} />
          ) : (
           <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign" component={Create} />
           
       </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
// NAVIGATION COMPONENT

const HunnyHub = () => {
  //HOOKS
  const {colors} = useTheme();
  const dispatch = useDispatch();
  //HOOKS

  // USE EFFECT
  useEffect(() => {
    fetchToDoList();
  }, [fetchToDoList]);
  // USE EFFECT

  // **********************************************

  //USE STATE

  const toDoTextInput = useSelector(state => {
    return state.toDoReducer.toDoTextInput;
  });
  const {popUp} = useSelector(state => {
    return state.toDoReducer;
  });
  const {isEdit} = useSelector(state => state.toDoReducer);
  const editInputText = useSelector(state => state.toDoReducer.editInputText);

  const {toDoList} = useSelector(state => state.toDoReducer);
  console.log();
  //USE STATE

  // **********************************************

  // METHODS

  // FETCH DATA
  const fetchToDoList = async () => {
    reference.ref('toDoList').on('value', snapShot => {
      dispatch({type: 'fetchAllToDo', payload: snapShot.val()});
    });
  };
  // FETCH DATA

  // METHODS

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      {/* MODAL POPUP */}

      <Portal>
        <Modal
          visible={popUp}
          onDismiss={() => {
            dispatch({type: 'closePopUp', payload: false});
          }}
          contentContainerStyle={Styles.modalContainer}>
          <Text style={Styles.modalText}>Please Add Something</Text>
          <Button
            style={{
              ...Styles.modalButton,
              backgroundColor: colors.background,
              color: colors.text,
            }}
            onPress={() => {
              dispatch({type: 'closePopUp', payload: false});
            }}>
            OK
          </Button>
        </Modal>
      </Portal>

      {/* MODAL POPUP */}

      {/* EDIT POPUP */}
      <Portal>
        <Modal
          visible={isEdit}
          onDismiss={() => {
            dispatch({type: 'cancelEdit'});
          }}
          contentContainerStyle={{
            backgroundColor: 'white',
            marginHorizontal: 15,
            borderRadius: 8,
            paddingVertical: 60,
          }}>
          <View>
            <TextInput
              value={editInputText}
              onChangeText={value => {
                dispatch({type: 'changeEditInput', payload: value});
              }}
              style={{
                borderWidth: 1,
                marginHorizontal: 15,
                paddingLeft: 15,
                fontSize: 25,
                color: 'black',
              }}></TextInput>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingTop: 30,
            }}>
            <Button
              onPress={() => {
                dispatch({type: 'CONFIRM_EDIT'});
              }}
              mode="contained"
              style={{backgroundColor: colors.background, padding: 4}}
              textColor={colors.text}>
              Confirm
            </Button>
            <Button
              onPress={() => {
                dispatch({type: 'cancelEdit'});
              }}
              mode="contained"
              style={{backgroundColor: colors.background, padding: 4}}
              textColor={colors.text}>
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* EDIT POPUP */}

      {/* FIRST CONTAINER */}
      <View>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 14,
            fontSize: 30,
            fontFamily: 'Poppins-SemiBoldItalic',
            color: colors.text,
          }}>
          TO DO APP
        </Text>
        <TextInput
          placeholderTextColor={colors.text}
          style={{...Styles.textInput, color: colors.text}}
          placeholder="To Do"
          value={toDoTextInput}
          onChangeText={text => {
            dispatch({type: 'changeTextInput', payload: text});
          }}></TextInput>
        <Button
          style={{
            ...Styles.addButton,
            backgroundColor: colors.text,
            color: colors.text,
          }}
          mode="contained"
          onPress={() => {
            dispatch({
              type: 'ADD_TODO',
              payload: {
                id:
                  toDoList == null
                    ? 1
                    : toDoList.length == 0
                    ? 1
                    : toDoList.length,
                text: toDoTextInput,
              },
            });
            Keyboard.dismiss();
          }}>
          ADD
        </Button>
      </View>
      {/* FIRST CONTAINER */}

      {/* SECOND CONTAINER */}
      <Text
        style={{
          paddingLeft: 20,
          marginTop: 15,
          fontSize: 25,
          fontFamily: 'Poppins-MediumItalic',
          color: 'black',
        }}>
        To Do List
      </Text>
      {/* SECOND CONTAINER */}

      {/* THIRD CONTAINER */}
      <View style={{flex: 1}}>
        <KeyboardAvoidingView>
          <FlatList
            keyboardShouldPersistTap="always"
            data={toDoList}
            renderItem={item => {
              if (item.item !== null) {
                return <AllList id={item.index} text={item.item.text} />;
              }
            }}></FlatList>
        </KeyboardAvoidingView>
      </View>
      {/* THIRD CONTAINER */}
    </View>
  );
};

// ********************************************TODO LIST COMPONENT****************************

const AllList = props => {
  const {colors} = useTheme();
  const {text, id} = props;
  const allData = useSelector(state => state.toDoReducer);
  const dispatch = useDispatch();

  return (
    <View style={{borderWidth: 1, shadowColor: 'black', marginTop: 15}}>
      <View style={{display: 'flex', marginTop: 20, borderColor: 'black'}}>
        {/* 1 DIV */}
        <View
          style={{
            flexDirection: 'row',
            paddingRight: 20,
            justifyContent: 'flex-end',
          }}>
          <View style={{marginHorizontal: 5}}>
            <FeatherIcon
              name="edit"
              size={25}
              color="blue"
              onPress={() => {
                dispatch({type: 'editToDo', payload: {id, text}});
              }}
            />
          </View>

          <View style={{marginHorizontal: 5}}>
            <FeatherIcon
              name="delete"
              size={30}
              color="red"
              onPress={() => {
                dispatch({type: 'DELETE_TODO', payload: id});
              }}
            />
          </View>
        </View>
        {/* 1 DIV */}
        <View>
          <Text style={{...Styles.listText, color: colors.text}}>{text}</Text>
        </View>
        {/* 2 DIV */}

        {/* 2 DIV */}
      </View>
    </View>
  );
};
// ***************************************************EDIT COMPONENT*********************************

// *************************************************CSS*************************************

// CUSTOM CSS STYLE

const Styles = StyleSheet.create({
  //  MODAL CONTAINER
  modalContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
  },

  //  MODAL CONTAINER

  //  MODAL TEXT
  modalText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FC2947',
    paddingVertical: 20,
  },
  //  MODAL TEXT

  //  MODAL BUTTON
  modalButton: {
    marginHorizontal: 70,
    borderRadius: 8,
    // backgroundColor: '#212A3E',
    marginVertical: 10,
    paddingVertical: 5,
  },
  //  MODAL BUTTON

  // CONTAINER TAG
  mainContainer: {
    flex: 1,
    backgroundColor: '#F1F6F9',
  },
  // CONTAINER TAG
  // INPUT TAG
  textInput: {
    height: 50,
    borderWidth: 2,
    marginHorizontal: 15,
    paddingLeft: 15,
    marginTop: 10,
    fontSize: 20,
    borderColor: '#394867',
  },
  // INPUT TAG
  //  ADD BUTTON
  addButton: {
    // backgroundColor: '#212A3E',
    marginHorizontal: 60,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 15,
  },
  //  ADD BUTTON

  // LIST EDIT BUTTON
  listButton: {},
  // LIST EDIT BUTTON
  listText: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    paddingLeft: 15,
    paddingBottom: 15,
  },
});
// CUSTOM CSS STYLE

export default App;
