import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../assets';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Details!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class MyHomeScreen extends React.Component {
  static navigationOptions = ({
    navigation,
    navigationOptions,
    screenProps,
  }) => ({
    title: 'Home Screen',
    drawerLabel: 'Home',
    headerLeft: () => (
      <View style={{paddingLeft: 10}}>
        <Ionicons
          onPress={() => navigation.toggleDrawer()}
          name="align-left"
          size={30}
          color={Colors.blueberry}
        />
      </View>
    ),

    drawerIcon: ({tintColor}) => (
      <Image
        source={require('./icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  });

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          onPress={() => this.props.navigation.navigate('Details')}
          title="Go to Details"
        />
      </View>
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    drawerLabel: 'Notifications',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('./icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
    headerLeft: () => (
      <View style={{paddingLeft: 10}}>
        <Ionicons
          onPress={() => navigation.toggleDrawer()}
          name="align-left"
          size={30}
          color={Colors.blueberry}
        />
      </View>
    ),
  });

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      </View>
    );
  }
}

const DrawerItem = props => (
  <Button
    style={styles.drawerItem}
    onPress={() => props.clickHandler()}
    title={props.label}
  />
);

const CustomDrawerContentComponent = ({navigation}) => {
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={styles.logoContainer}>
        <Text>Paris Corp</Text>
      </View>
      <View style={styles.list}>
        <DrawerItem
          label="Home"
          clickHandler={() => navigation.navigate('Home')}
        />
        <DrawerItem
          label="Notifications"
          clickHandler={() => navigation.navigate('Notifications')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    height: '20%',
    backgroundColor: Colors.marigold,
  },
  list: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  drawerItem: {
    marginVertical: 10,
    paddingLeft: 20,
    backgroundColor: Colors.watermelon,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const HomeStack = createStackNavigator({
  HomeScreen: MyHomeScreen,
  Details: DetailsScreen,
});

const NotificationStack = createStackNavigator({
  NotificationScreen: MyNotificationsScreen,
});

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Notifications: {
      screen: NotificationStack,
    },
  },
  {
    drawerBackgroundColor: Colors.veryLightPink,
    drawerType: 'slide',
    hideStatusBar: true,
    contentOptions: {
      activeTintColor: Colors.watermelon,
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    },
    contentComponent: props => <CustomDrawerContentComponent {...props} />,
  },
);

export default MyApp = createAppContainer(MyDrawerNavigator);
