import { StyleSheet } from 'react-native';

const backgroundColor = '#fff';
const borderColor = '#e4e4e4';
const primaryColor = '#d94700';
const secondaryColor = '#587ab0';
const successColor = '#069922';
const dangerColor = '#d04d4d';
const listHoverColor = '#f0f5fb';

const commonStyles = StyleSheet.create({
    notes: {
        flex: 1,
        backgroundColor,
        justifyContent: 'center',
    },
    listItem: {
        paddingVertical: 12,
        backgroundColor,
        paddingHorizontal: 16,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    toolbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 12
    },
    addForm: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 0,
        height: 40
    },
    textInput: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    swipeLayout: {
        alignItems: 'center',
        backgroundColor,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    swipeDeleteBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        right: 0,
        backgroundColor: dangerColor
    },
    swipeDeleteBtnText: {
        color: '#fff',
    }
});

export {
    listHoverColor,
    primaryColor,
    secondaryColor,
    commonStyles,
    dangerColor,
    successColor
};
