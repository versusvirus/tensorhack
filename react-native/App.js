import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Notes from './components/notes';
import Purchases from './components/purchases';
import { StatusBar } from 'react-native';

StatusBar.setHidden(true);
console.disableYellowBox = true;

const MainNavigator = createStackNavigator({
    Notes: {screen: Notes},
    Purchases: {screen: Purchases},
});

const App = createAppContainer(MainNavigator);
export default App;
