import {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native"

export default function CardInput({total, goToOrderSuccessfull}) {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');

    // Add '-' after every 4 characters in the card number
    const formatCardNumber = (value) => {
        setCardNumber(value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim());
    }

    // Verify inputs and proceed to order successfull screen
    const verifyInputs = () => {
        if (cardNumber.length < 19) {
            alert('Invalid card number!');
            return;
        }
        if (cardHolder === '') {
            alert('Invalid card holder name!');
            return;
        }
        if (expiryMonth.length < 2 || parseInt(expiryMonth) > 12) {
            alert('Invalid expiry month!');
            return;
        }
        if (expiryYear.length < 2 || parseInt(expiryYear) < 24) {
            alert('Invalid expiry year!');
            return;
        }
        if (cvv.length < 3) {
            alert('Invalid CVV!');
            return;
        }
        goToOrderSuccessfull();
    }



    return(
        <View>

            <TextInput style={styles.input} 
                placeholder='CARD HOLDER NAME' placeholderTextColor='#6C6C6C'
                value={cardHolder}
                onChangeText={(value) => setCardHolder(value)}
                maxLength={20}
            />
            
            <TextInput style={styles.input} 
                placeholder='CARD NUMBER' placeholderTextColor='#6C6C6C'
                keyboardType='numeric'
                inputMode='numeric'
                maxLength={19}
                value={cardNumber}
                onChangeText={(value) => formatCardNumber(value)}
            />

            <View style={styles.securityCodesCtn}>
                <TextInput style={[styles.input, styles.security]} 
                    placeholder='MM' placeholderTextColor='#6C6C6C'
                    maxLength={2}
                    keyboardType='numeric'
                    value={expiryMonth}
                    onChangeText={(value) => setExpiryMonth(value)}
                />
                <TextInput style={[styles.input, styles.security]} 
                    placeholder='YY' placeholderTextColor='#6C6C6C'
                    maxLength={2}
                    keyboardType='numeric'
                    value={expiryYear}
                    onChangeText={(value) => setExpiryYear(value)}
                />
                <TextInput style={[styles.input, styles.security]} 
                    placeholder='CVV' placeholderTextColor='#6C6C6C'
                    maxLength={3}
                    keyboardType='numeric'
                    value={cvv}
                    onChangeText={(value) => setCvv(value)}
                />
            </View>

            <Pressable style={styles.btn} onPress={verifyInputs}>
                <Text style={styles.button}>PAY NOW ${total}</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#FBA4A4',
        marginBottom: 20,
        paddingBottom: 10,
        fontSize: 18,
        color: '#00060A',
    },
    securityCodesCtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    security: {
        width: '30%',
    },
    btn: {
        backgroundColor: '#FBA4A4',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        color: '#FFF8F6',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})