import React from 'react';
import { View, Text, Image, StyleSheet ,ImageBackground} from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
   
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our blog app! We're dedicated to bringing you the latest and most
        interesting content on a variety of topics.
      </Text>
      <Text style={styles.subtitle}>Our Team</Text>
      <View style={styles.teamMember}>
        <Image
          source={require('../../assets/myProfile.jpg')}
          style={styles.teamMemberImage}
          resizeMode="cover"
        />
        <Text style={styles.teamMemberName}>Piyush Raviraj</Text>
        <Text style={styles.teamMemberRole}>Founder & Creater</Text>
      </View>
      {/* Add more team members as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'#daf6fa',
  },
  logo: {
    width: 450,
    height: 200,
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  teamMember: {
    alignItems: 'center',
    marginTop: 20,
  },
  teamMemberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  teamMemberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  teamMemberRole: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default AboutUs;
