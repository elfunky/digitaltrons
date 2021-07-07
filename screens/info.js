import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import CustomButton from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';

export default function Info({navigation, route}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filePath, setFilePath] = useState({});

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setFilePath(source);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
          setNumber(user.Number);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        var user = {
          Name: name,
          Number: number,
        };
        await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        Alert.alert('Success!', 'Your data has been updated.');
        // navigation.navigate('ScreenA');
        navigation.navigate('Screen_A', {screen: 'Info'});
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.titleText}>Select your proflie image..!</Text>

      <View style={styles.container}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        />
        <Button
          style={styles.buttonStyle}
          title="Choose File"
          onPress={chooseFile}
        />
        <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
      </View>

      <Text style={[styles.text]}>Welcome {name} !</Text>
      <Text style={[styles.text, styles.CustomFont]}>
        Your number is {number}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Edit your name"
        value={name}
        onChangeText={value => setName(value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Edit your number "
        value={number}
        onChangeText={value => setNumber(value)}
      />
      <CustomButton
        title="Update"
        color="#ff7f00"
        onPressFunction={updateData}
      />
      <CustomButton
        title="Remove"
        color="#f40100"
        onPressFunction={removeData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 27,
    margin: 2,
    color: '#ee82ee',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  success: {
    color: 'green',
  },

  error: {
    color: 'red',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'blue',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    // margin: 5,
    marginTop: -20,
  },
});

