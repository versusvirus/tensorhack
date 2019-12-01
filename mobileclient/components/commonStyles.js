import { StyleSheet } from 'react-native';

const backgroundColor = '#fff';
const unaccentedBackgroundColor = '#f8f8f8';
const borderColor = '#e4e4e4';
const primaryColor = '#000';
const secondaryColor = '#587ab0';
const successColor = '#069922';
const dangerColor = '#d04d4d';
const listHoverColor = '#f0f5fb';
const fontSizeText = 18;
const fontSizeHeading = 24;
const textPaddingHorizontal = 16;

const commonStyles = StyleSheet.create({
    heading: {
        color: secondaryColor,
        fontSize: fontSizeHeading,
        paddingHorizontal: textPaddingHorizontal
    },
    page: {
        flex: 1,
        backgroundColor,
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        backgroundColor: unaccentedBackgroundColor
    },
    content: {
        flex: 9
    },
    footer: {
        flex: 1
    },
    listItem: {
        paddingVertical: 12,        
        paddingHorizontal: textPaddingHorizontal,
        fontSize: fontSizeText,
        borderBottomWidth: 1,
        borderBottomColor: borderColor
    },
    listSwipeItem: {
        backgroundColor,
    },
    hierarchyPadding: {
        paddingLeft: 32
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12
    },
    inputForm: {
        paddingVertical: 0,
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    textInput: {
        paddingVertical: 12,
        paddingHorizontal: textPaddingHorizontal,
        fontSize: fontSizeText,
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
