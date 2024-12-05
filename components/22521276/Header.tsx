import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

const Header: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const navigateTo = (path: string) => {
    router.push(`/(tabs)/${path}`);
  };

  const logout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: () => router.push('/(routes)/login') },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <View style={styles.header}>
        <ImageBackground
          source={{
            uri: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/oc5zmrxqo1fpbmaqtx85.png',
          }}
          style={styles.banner}
        >
          <TouchableOpacity
            style={styles.menuButton}
            onPress={toggleSidebar}
            accessible
            accessibilityLabel="Open menu"
          >
            <Text style={styles.menuText}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Welcome to DC store ᕦ(ò_óˇ)ᕤ</Text>
        </ImageBackground>
      </View>
      <Modal
        isVisible={isSidebarVisible}
        onBackdropPress={toggleSidebar}
        onBackButtonPress={toggleSidebar}
        swipeDirection="left"
        onSwipeComplete={toggleSidebar}
        animationIn="bounceInLeft"
        animationInTiming={500}
        animationOut="bounceOutLeft"
        animationOutTiming={500}
        backdropTransitionOutTiming={500}
        backdropOpacity={0.3}
        style={styles.leftModal}
      >
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Menu</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateTo('')}
          >
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateTo('profile')}
          >
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateTo('category')}
          >
            <Text style={styles.menuItemText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateTo('cart')}
          >
            <Text style={styles.menuItemText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text style={styles.menuItemText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 200,
    width: '100%',
    backgroundColor: '#f4f4f4',
  },
  banner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  leftModal: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: width * 0.75,
    height: '90%',
    backgroundColor: '#f7f7f7',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menuItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    width: '100%',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
