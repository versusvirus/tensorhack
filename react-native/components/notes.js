import React from 'react';
import { Text, View, Button, TextInput, TouchableHighlight } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
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

    deleteBtnHandler = (rowMap, id) => {
        const newList = dataSource.deleteItem(id);
        this.setState({
            data: newList
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

    swipeRender = (data, rowMap) => {
        return (
            <View style={commonStyles.swipeLayout}>
                <TouchableHighlight
                    style={commonStyles.swipeDeleteBtn}
                    onPress={() => this.deleteBtnHandler(rowMap, data.item._id) }
                >
                    <Text style={commonStyles.swipeDeleteBtnText}>
                        Delete
                    </Text>
                </TouchableHighlight>
            </View>
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
                <SwipeListView data={this.state.data} keyExtractor={item => item._id}
                    renderItem={this.itemRender}
                    renderHiddenItem={ this.swipeRender }
                    rightOpenValue={-75} 
                />
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
