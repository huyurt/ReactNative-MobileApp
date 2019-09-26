import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import {hideMessage as flashHideMessage, showMessage as flashShowMessage} from "react-native-flash-message";
import {navigate} from "../../references/navigationReference";
import {CustomInput} from "../../components";

const ForgotPasswordContainer = ({headerText, onSubmit, hideMessage, onPressed, showMessage, message}) => {
    const [messageShowed, setMessageShowed] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (showMessage && !messageShowed) {
            setMessageShowed(true);
            flashShowMessage({
                message: message,
                position: 'bottom',
                autoHide: false,
                hideOnPress: true,
                animated: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                onPress: () => {
                    setMessageShowed(false);
                    hideMessage();
                }
            });
        }
    });

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    {headerText}
                </Text>
            </View>
            <CustomInput
                iconName='envelope'
                placeHolder='E-posta Adresiniz'
                autoCapitalize='none'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
            />
            <View style={styles.footerContainer}>
                <Button
                    title='< GERİ'
                    buttonStyle={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}
                    accessibilityLabel='< GERİ'
                    titleStyle={styles.footerButtonTitleBack}
                    containerStyle={styles.footerButtonContainerBack}
                    onPress={() => {
                        hideMessage();
                        flashHideMessage();
                        navigate('SignIn');
                    }}
                />
                <Button
                    title='ŞİFREMİ HATIRLAT'
                    accessibilityLabel='ÜYE OL'
                    titleStyle={styles.footerButtonTitle}
                    containerStyle={styles.footerButtonContainer}
                    loading={onPressed}
                    disabled={onPressed}
                    disabledStyle={styles.footerButtonDisabledContainer}
                    onPress={() => {
                        setMessageShowed(false);
                        hideMessage();
                        onSubmit({email});
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 10,
        paddingHorizontal: 10
    },
    header: {
        color: '#fff',
        fontSize: 13
    },
    footerContainer: {
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    footerCheckBoxContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0,
        marginLeft: 0,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    footerCheckBoxText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'normal'
    },
    footerButtonContainerBack: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    footerButtonTitleBack: {
        color: '#3598DC',
        fontSize: 11
    },
    footerButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    footerButtonTitle: {
        fontSize: 11
    },
    footerButtonDisabledContainer: {
        backgroundColor: '#5EB7FF',
    }
});

export {ForgotPasswordContainer};