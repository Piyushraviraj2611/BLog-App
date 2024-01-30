import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground,Linking} from 'react-native';


  const CreatePostLink = () => {
    const onPress = () => Linking.canOpenURL('https://blog-writefreely-adminpanel.onrender.com/').then(() => {
      Linking.openURL('https://blog-writefreely-adminpanel-or3t.onrender.com/');
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/bg.jpg')} style={styles.backgroundImage}>
      
        <Text style={{margin:10,fontSize:20}}>Click To Post New Blog.....</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Click here</Text>
        </TouchableOpacity>
     
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
   // marginTop:150,
  },
  button: {
    backgroundColor: 'transparent', // Make the button transparent
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2, // Add a border
    borderColor: '#007bff', // Border color
  },
  buttonText: {
    color: '#007bff', // Text color
    fontSize: 16,
  },
});

export default CreatePostLink;
