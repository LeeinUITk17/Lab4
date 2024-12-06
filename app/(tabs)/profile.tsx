import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfile } from '@/context/ProfileContext';

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { user } = useProfile(); 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.picture }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Phone:</Text>
        <Text style={styles.infoText}>{user.phone}</Text>

        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>{user.address}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(routes)/edit')}>
          <Text style={styles.menuText}>Edit Information</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9', 
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#007bff', 
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 120, 
    height: 120,
    borderRadius: 60, 
    borderWidth: 3,
    borderColor: '#fff', 
    marginBottom: 20,
  },
  name: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5, 
  },
  email: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  infoSection: {
    marginTop: 30,
    marginHorizontal: 25, 
  },
  infoLabel: {
    fontSize: 18, 
    fontWeight: '500',
    color: '#333',
    marginTop: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#555', 
    marginBottom: 10, 
  },
  menu: {
    marginTop: 30,
    marginHorizontal: 25, 
  },
  menuItem: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginVertical: 10, 
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuText: {
    fontSize: 18, 
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 10, 
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600', 
    textAlign: 'center',
  },
});
