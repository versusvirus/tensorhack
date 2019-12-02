import React from 'react';
import { View, Text, Button, FlatList, TouchableHighlight, Image } from 'react-native';
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

    componentWillMount() {
        this.props.navigation.addListener('didFocus',
            () => {
                this.refresh();
            }
        );
    }

    async refresh() {
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


    groupRender = ({item}) => {
        return (
            <>
                <View>
                    <Text style={commonStyles.listItem}>{item.name}</Text>
                </View>
                <FlatList data={item.products} keyExtractor={item => item.name}
                    renderItem={this.itemRender}
                />
            </>
        )
    }

    itemRender = ({item}) => {
        return (
            <View style={commonStyles.purchaseItem}>
                <Image source={{uri: item.logo}} style={commonStyles.purchaseImage} />
                <View style={commonStyles.purchaseDescription}>
                    <View><Text style={commonStyles.purchaseItemName}>{item.name}</Text></View>
                    <View><Text style={commonStyles.purchaseCharacteristics}>{(item.characteristics || [{ value: ' ' }]).map(item => item.value).join(' * ')}</Text></View>
                    <View style={commonStyles.purchaseInfo}>
                        <View><Text style={commonStyles.purchasePrice}>{item.price}</Text></View>
                        <View><Text style={commonStyles.purchaseStockPrice}>{item.stockprice}</Text></View>
                        <View style={commonStyles.purchaseCount}><Text>1 шт.</Text></View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
      return (
        <View style={commonStyles.page}> 
            <View style={commonStyles.header}>
                <View style={commonStyles.toolbar}>
                    <Button color={primaryColor} title="Добавить продукт" onPress={this.addBtnHandler}/>  
                </View>
            </View>
            <View style={commonStyles.content}>
                <FlatList data={this.state.data} keyExtractor={item => item.name}
                    renderItem={this.groupRender}
                />
            </View>
        </View>
      );
    }
    static navigationOptions = {
        title: 'Purchases',
    };
}

export default Purchases;
