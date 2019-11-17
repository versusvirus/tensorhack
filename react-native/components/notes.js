import React from 'react';
import { FlatList, Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import { dataSource } from './Data';
import { commonStyles, listHoverColor, primaryColor, secondaryColor, successColor } from './commonStyles';

class Notes extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isAdd: false,
            addText: ''
        };
    }

    async componentWillMount() {
        return await this.refresh();
    }
    
    async refresh() {
        this.setState({
            data: await dataSource.getList()
        });
        return;
    }

    refreshBtnHandler = async () => {
        await this.refresh();
        return;
    }

    addBtnHandler = () => {
        this.setState({
            isAdd: true
        })
    }

    addTextInput = (text) => {
        this.setState({
            addText: text
        })
    }

    addConfirmBtnHandler = () => {
        const newItem = {
            name: this.state.addText
        };
        const newList = dataSource.addItem(newItem);
        this.setState({
            addText: '',
            isAdd: false,
            data: newList
        })
    }

    cancelBtnHandler = () => {
        this.setState({
            addText: '',
            isAdd: false
        })
    }

    itemHandler = (note) => {
        const navigation = this.props.navigation;
        navigation.navigate('Purchases', {note})
    }
    
    itemRender = ({item}) => {
        return (
            <TouchableHighlight underlayColor={listHoverColor} onPress={() => this.itemHandler(item._id)}>
                <Text style={commonStyles.listItem}>{item.name}</Text>
            </TouchableHighlight>
        )
    }

    render() {
        return (       
            <View style={commonStyles.notes}>
                {this.state.isAdd &&
                    <View style={commonStyles.addForm}>
                        <TextInput
                            autoFocus={true}
                            style={commonStyles.textInput}
                            placeholder="Note title"
                            onChangeText={this.addTextInput}
                            value={this.state.addText}
                        />
                        <Button color={successColor} title="OK" onPress={this.addConfirmBtnHandler}/>
                        <Button color={secondaryColor} title="Cancel" onPress={this.cancelBtnHandler}/>
                    </View>
                }
                <FlatList data={this.state.data} keyExtractor={item => item._id}
                    renderItem={this.itemRender} />
                <View style={commonStyles.toolbar}>
                    <Button color={primaryColor} title="Add note" onPress={this.addBtnHandler}/>    
                    <Button color={secondaryColor} title="Refresh" onPress={this.refreshBtnHandler}/>    
                </View>
            </View>
            
        );
    }

    static navigationOptions = {
        title: 'Notes',
    };
}

export default Notes;
