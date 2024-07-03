import { View, Text, StyleSheet, Image, FlatList, Pressable } from "react-native";
import { Shoes } from "./Data";

export default function Products({ cart, setCart}) {

    const addToCart = (item) => {
        if (cart.includes(item)) {
            alert('Item already in cart!');
            return;
        }
        item.qty = 1;
        setCart([...cart, item]);
        alert('Added to cart!');
    }
    
    return (
        <View style={styles.screen}>
            <Text style={styles.screenText}>Products</Text>

            <View>
                <FlatList
                    data={Shoes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={{ width: 150, height: 150 }} />
                            <View style={styles.detailsCtn}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>${item.price}</Text>

                                <View style={styles.ctaBtnCtn} >
                                    <Pressable style={styles.btn} onPress={() => addToCart(item)}>
                                        <Text style={styles.button}>Add to cart</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
    },
    screenText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    detailsCtn: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00060A'
    },
    price: {
        fontSize: 18,
        color: '#00060A',
        fontWeight: 'bold',
    },
    ctaBtnCtn: {
        marginTop: 10,
    },
    button: {
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 5,
        backgroundColor: '#FBA4A4',
        padding: 10,
        color: '#FFF8F6',
        width: 150,
    },
})