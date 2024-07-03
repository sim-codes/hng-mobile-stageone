import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

export default function OrderSuccessfull({ goToProducts}) {
    return (
        <View style={styles.screen}>
            <Image source={require('.././assets/success.png')} style={{ width: 150, height: 150 }} />
            <Text style={styles.screenText}>Order Successful</Text>
            <Pressable onPress={goToProducts} style={styles.btn}>
                <Text style={styles.button}>Go back to products</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    btn: {
        backgroundColor: '#FBA4A4',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF8F6',
    },
});
