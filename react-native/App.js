import React from 'react';
import { FlatList, StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { data, getList} from './components/Data';

class App extends React.Component {
    constructor() {
        super();
        this.state = {data};
        StatusBar.setHidden(true);
    }
    async componentWillMount() {
        return await this.refresh();
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.data} keyExtractor={item => item._id}
                    renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>} />
                <Button title="refresh" onPress={this.btnHandler}></Button>    
            </View>
            
        );
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

export default App;