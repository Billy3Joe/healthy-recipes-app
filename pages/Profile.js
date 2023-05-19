import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import BottomBar from "../components/BottomBar";

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
      <BottomBar namePage="Home" />
    </View>
  )
}

const styles = StyleSheet.create({})