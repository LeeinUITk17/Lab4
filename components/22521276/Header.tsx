import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal'; 

const { width } = Dimensions.get('window');

const Header: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };


  return (
    <>
      <View style={styles.header}>
        <ImageBackground
          source={{ uri: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/oc5zmrxqo1fpbmaqtx85.png' }} 
          style={styles.banner}
        >
          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
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
        backdropOpacity={0.0}
        style={styles.leftModal}
      >
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Menu</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
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
    backgroundColor: 'bisque',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
    width: '100%',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});
