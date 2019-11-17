import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Notes from './components/notes';
import { Text, StatusBar, Button } from 'react-native';

StatusBar.setHidden(true);
console.disableYellowBox = true;

class Purchases extends React.Component {
    static navigationOptions = {
      title: 'Purchases',
    };
    render() {
      return (
        <> 
            <Text>Note - {this.props.navigation.getParam('note')}</Text> 
            <Button
            title="Back"
            onPress={() => this.props.navigation.navigate('Notes')}
            />
        </>
      );
    }
}



const MainNavigator = createStackNavigator({
    Notes: {screen: Notes},
    Purchases: {screen: Purchases},
});

const App = createAppContainer(MainNavigator);
export default App;
