import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [messageP, setMessageP] = useState('');
  const [ivpTwo, validFirstname] = useState('true');
  const [ivph, validphn] = useState(true);
  const subStitueRegex = /^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/;
  const reg = /^[0]?[6789]\d{9}$/;

  // new trial 2
  const validateRegex = event => {
    // username = event.target.value;
    if (subStitueRegex.test(name)) {
      setIsValid(true);
      validFirstname(true);
      //   setMessage('Your name looks good!');
    } else {
      setIsValid(false);
      validFirstname(false);
      setMessage('OOOps the name should alphabet!');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('Info');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (
      name.length == 0 ||
      number.length == 0 ||
      number.length != 10 ||
      reg.test(number) == false
    ) {
      Alert.alert(
        'Warning!',
        'Please check whether you filled it up Name, 10 digits are valid for number, Number should start with valid digits like (6,7,8,9)',
      );
    } else {
      try {
        var user = {
          Name: name,
          Number: number,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        navigation.navigate('Info');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('./../assets/asyncstorage.png')}
      />
      <Text style={styles.text}>Appointmet Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => setName(value)}
        onChange={validateRegex}
      />
      {ivpTwo ? null : <Text style={[styles.error]}>{message}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Enter your number"
        onChangeText={value => setNumber(value)}
      />
      {ivph ? null : <Text style={[styles.error]}>{messageP}</Text>}
      <CustomButton title="Save" color="#1eb900" onPressFunction={setData} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 130,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  error: {
    color: 'firebrick',
    fontSize: 20,
  },
});
