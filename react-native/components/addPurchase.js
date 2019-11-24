import React from 'react';
import { View, Text, TextInput, FlatList, TouchableHighlight } from 'react-native';
import { products, purchases } from 'tensorhackfetchapi';
import { commonStyles, listHoverColor } from './commonStyles';

class AddPurchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchStr: ''
        };
    }
    
    async refresh(name) {
        this.setState({
            data: await products.getProducts(name)
        });
        return;
    }

    searchTextInput = (text) => {
        this.setState({
            searchText: text
        })
        this.refresh(text);
    }

    itemHandler = (productId) => {
        const noteId = this.props.navigation.getParam('note');
        purchases.createPurchase(noteId, productId).then((result) => {
            this.props.navigation.navigate();
        }).catch((err) => {
            alert('Error adding product');
        })
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
        <View style={commonStyles.page}>
            <View style={commonStyles.header}>
                <View style={commonStyles.inputForm}>
                    <TextInput
                        autoFocus={true}
                        style={commonStyles.textInput}
                        placeholder="Note title"
                        onChangeText={this.searchTextInput}
                        value={this.state.searchText}
                    />
                </View>
            </View>
            <View style={commonStyles.content}>
                <FlatList data={this.state.data} keyExtractor={item => item._id}
                    renderItem={this.itemRender}
                />
            </View>
        </View>
      );
    }
    static navigationOptions = {
        title: 'Adding new purchase',
    };
}

export default AddPurchase;
