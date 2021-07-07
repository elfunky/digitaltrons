import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
} from 'react-native';

// import {Card} from 'react-native-material-cards';
import {Card} from 'react-native-paper';

import moment from 'moment';

export default function ScreenA({navigation}) {
  const [timeSlots, setTimeSlots] = React.useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const Item = ({item, onPress, backgroundColor, textColor, index}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.indexText, textColor]}>
        {' '}
        {item.key}
        {timeSlots[index + 1] ? ' - ' + timeSlots[index + 1] : ''}
      </Text>
    </TouchableOpacity>
  );

  const createTimeSlots = (fromTime, toTime) => {
    let starTime = moment(fromTime, 'hh:mm A');
    let endTime = moment(toTime, 'hh:mm A');
    if (endTime.isBefore(starTime)) {
      endTime.add(1, 'day');
    }
    let arr = [];
    while (starTime <= endTime) {
      arr.push(new moment(starTime, endTime).format('hh:mm A'));
      starTime.add(30, 'minutes');
    }
    return arr;
  };
  React.useEffect(() => {
    setTimeSlots(createTimeSlots('09:00 AM', '05:00 PM'));
    // let slots = createTimeSlots('09:00','17:00');
    // console.log(slots);
  }, []);

  // for navigation
  const onPressHandler = () => {
    navigation.navigate('Login');
  };

  //timslots data
  const DATA = timeSlots.map(main => {
    return {
      key: main,
    };
  });

  return (
    <View>
      <Text style={[styles.bigBlue]}>BooK YouR AppointmenT</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={{paddingBottom: 95}}
          data={DATA}
          extraData={selectedId}
          keyExtractor={item => item.key}
          renderItem={({item, index}) => {
            const backgroundColor =
              item.key === selectedId ? 'red' : 'paleturquoise';
            const color = item.key === selectedId ? 'white' : 'black';
            return (
              <View>
                <Item
                  item={item}
                  index={index}
                  onPress={() => {
                    setSelectedId(item.key);
                    onPressHandler();
                  }}
                  backgroundColor={{backgroundColor}}
                  textColor={{color}}
                />
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  bigBlue: {
    color: 'orangered',
    fontWeight: 'bold',
    fontSize: 30,
  },

  item: {
    padding: 25,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 20,

    elevation: 5,
  },
  indexText: {
    fontSize: 21,
    textAlign: 'center',
  },
});
