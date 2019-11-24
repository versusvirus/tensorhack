import React from 'react';
import { View, Text, Button, FlatList, TouchableHighlight } from 'react-native';
import { purchases } from 'tensorhackfetchapi';
import { commonStyles, primaryColor, secondaryColor, listHoverColor } from './commonStyles';

class Purchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            note: props.navigation.getParam('note')
        };
    }

    async componentWillMount() {
        return await this.refresh();
    }
    
    async refresh() {
        alert (await JSON.stringify(purchases.getPurchase(this.state.note)));
        this.setState({
            data: await purchases.getPurchase(this.state.note)
        });
        return;
    }

    addBtnHandler = () => {
        const navigation = this.props.navigation;
        const noteId = this.props.navigation.getParam('note');
        navigation.navigate('AddPurchase', {note: noteId});
    }

    refreshBtnHandler = async () => {
        await this.refresh();
        return;
    }

    itemHandler = (purchase) => {
        alert(purchase);
    }

    itemRender = ({item}) => {
        return (
            <TouchableHighlight underlayColor={listHoverColor} onPress={() => this.itemHandler(item._id)}>
                <Text style={commonStyles.listItem}>{item.text}</Text>
            </TouchableHighlight>
        )
    }

    render() {
      return (
        <View style={commonStyles.page}> 
            <View style={commonStyles.header}>
                <View style={commonStyles.inputForm}>
                    <Text style={commonStyles.heading}>{this.props.navigation.getParam('noteName')}</Text> 
                </View>
            </View>
            <View style={commonStyles.content}>
                <FlatList data={this.state.data} keyExtractor={item => item._id}
                    renderItem={this.itemRender}
                    renderHiddenItem={ this.swipeRender }
                    rightOpenValue={-75} 
                />
            </View>
            <View style={commonStyles.footer}>
                <View style={commonStyles.toolbar}>
                    <Button color={primaryColor} title="Add purchase" onPress={this.addBtnHandler}/>    
                    <Button color={secondaryColor} title="Refresh" onPress={this.refreshBtnHandler}/>    
                </View>
            </View>
        </View>
      );
    }
    static navigationOptions = {
        title: 'Purchases',
    };
}

export default Purchases;
