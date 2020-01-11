import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Colors} from '../assets';
import colors from '../assets/colors';

class LogoTitle extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={require('./icon.png')} style={{width: 30, height: 30}} />
        <Text style={{marginLeft: 5}}>{this.props.title}</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({
    navigation,
    navigationOptions,
    screenProps,
  }) => ({
    title: 'Home Screen',
    headerTitle: () => <LogoTitle title="Home" />,
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color={Colors.blueberry}
      />
    ),
    headerLeft: () => (
      <Button
        onPress={navigation.getParam('increaseCount')}
        title="+1"
        color={colors.watermelon}
      />
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({increaseCount: this._increaseCount});
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.setState({count: this.state.count + 1});
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Text>{this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={() =>
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
              title: 'Details Screen',
            })
          }
        />
        <Text>{this.props.navigation.getParam('params', 'NO CHANGE')}</Text>
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 30}}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions, screenProps}) => {
    // console.log('navigationOptions', navigationOptions);
    // console.log('screenProps', screenProps);
    return {
      title: navigation.getParam('title', 'A Nested Details Screen'),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      //   full
      headerBackTitle: 'Home Screen',
      //   truncated
      headerTruncatedBackTitle: 'Home',
      //   override back
      headerLeft: () => (
        <Button
          onPress={() => alert('No Back')}
          title="No"
          color={colors.white}
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({params: 'Updated!'});
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>
        <Text>{this.props.navigation.getParam('otherParam', '--')}</Text>
        <Button
          title="Go back"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <Button
          onPress={() => this.props.navigation.navigate('MyModal')}
          title="Open Modal"
          color={colors.rich_blue}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#e1e1e1',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppNavigator,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);
