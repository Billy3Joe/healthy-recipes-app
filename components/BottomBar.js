import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const  BottomBar = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerItem}>
           <Image
              source={require('../assets/logo.png')}
              style={styles.image}
            />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 0,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default  BottomBar;
