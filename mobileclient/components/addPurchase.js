import React from 'react';
import { View, Text, TextInput, FlatList, TouchableHighlight } from 'react-native';
import { characteristics, categories } from 'tensorhackfetchapi';
import { commonStyles, listHoverColor } from './commonStyles';

class AddPurchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriesList: [],
            searchStr: '',
            catId: null,
            charsList: []
        };
    }
    
    async componentWillMount() {
        return await this.refresh();
    }

    async refresh(name) {
        this.setState({
            categoriesList: await categories.get(name)
        });
        return;
    }

    searchTextInput = async (text) => {
        this.setState({
            searchText: text
        })
        await this.refresh(text);
        this.setState({
            catId: null
        })
    }

    itemHandler = async (catId, name) => {
        const noteId = this.props.navigation.getParam('note');      
        const charsList = (await characteristics.get(catId));

        charsList.forEach(element => {
            element.value = '';
        });

        this.setState ({
            searchText: name,
            catId,
            charsList
        })
        /*purchases.createPurchase(noteId, productId).then((result) => {
            this.props.navigation.goBack();
        }).catch((err) => {
            alert('Error creating purchase' + err);
        })*/
    }

    inputCharValueHandler = (value, item) => {
        const index = this.state.charsList.indexOf(item);
        const newCharsList = [...this.state.charsList]; 
        newCharsList[index].value = value;
        
        this.setState ({
            charsList: newCharsList
        })
    }

    catItemRender = ({item}) => {
        return (
            <TouchableHighlight underlayColor={listHoverColor} onPress={() => this.itemHandler(item._id, item.name)}>
                <Text style={commonStyles.listItem}>{item.name}</Text>
            </TouchableHighlight>
        )
    }

    charItemRender = ({item}) => {
        return (
            <View style={commonStyles.characteristicsItem}>
                <View style={commonStyles.characteristicsName}>
                    <Text>{item.name}</Text>
                </View>
                <View style={commonStyles.characteristicsValue}>
                    <TextInput
                            style={commonStyles.textInput}
                            placeholder="Введите значение"
                            onChangeText={(text) => {this.inputCharValueHandler(text, item)}}
                            value={item.value}
                        />
                </View>
            </View>
        )
    }

    render() {
        let content;
        if (this.state.catId) {
            content =
                <View style={commonStyles.characteristics}>
                    <View>
                        <Text style={commonStyles.characteristicsHeading}>Характеристики</Text>
                    </View>
                    <FlatList data={this.state.charsList} keyExtractor={item => item._id}
                        renderItem={this.charItemRender}
                    />
                </View>
        } else {
            content =
                <FlatList data={this.state.categoriesList} keyExtractor={item => item._id}
                    renderItem={this.catItemRender}
                />
        }   

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
                    {content}
                </View>
            </View>
      );
    }
    static navigationOptions = {
        title: 'Adding new purchase',
    };
}

export default AddPurchase;
