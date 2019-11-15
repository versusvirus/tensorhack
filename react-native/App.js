import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { FlatList, StyleSheet, Text, View, StatusBar, Button, TouchableWithoutFeedback } from 'react-native';
import { data, getList} from './components/Data';

StatusBar.setHidden(true);

class Notes extends React.Component {
    constructor() {
        super();
        this.state = {data};
        this.itemRenderBind = this.itemRender.bind(this);
    }

    static navigationOptions = {
        title: 'Notes',
    };

    async componentWillMount() {
        return await this.refresh();
    }
    
    async refresh() {
        this.setState({
            data: await getList()
        });
        return;
    }

    btnHandler = async () => {
        await this.refresh();
        return;
    }
    itemHandler(note) {
        const navigation = this.props.navigation;
        navigation.navigate('Purchases', {note})
    }
    
    itemRender({item}) {
        return (
            <TouchableWithoutFeedback onPress={() => this.itemHandler(item._id)}>
                <Text style={styles.item}>{item.name}</Text>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (       
            <View style={styles.container}>
                <FlatList data={this.state.data} keyExtractor={item => item._id}
                    renderItem={this.itemRenderBind} />
                <Button title="refresh" onPress={this.btnHandler}></Button>    
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

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
