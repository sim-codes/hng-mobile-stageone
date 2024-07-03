import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import CardInput from './CardInput';

export default function Checkout({ cart, setCart, goToProducts, goToOrderSuccessfull}) {
    const [total, setTotal] = useState(0);

    // Calculate the total price of the cart
    const calculateTotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.qty;
        });
        setTotal(total);
    };

    // Calculate the total price when the cart changes
    useEffect(() => {
        calculateTotal();
    }, [cart]);

    // Switch to order successfull screen and clear the cart
    const switchToOrderSuccessfull = () => {
        goToOrderSuccessfull();
        setCart([]);
    }



    const updateQty = (action, id) => {
        // Create a new array from the cart to avoid direct state mutation
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                if (action === 'add') {
                    return { ...item, qty: item.qty + 1 }; // Increase quantity
                } else if (action === 'sub' && item.qty > 1) {
                    return { ...item, qty: item.qty - 1 }; // Decrease quantity
                }
            }
            return item;
        });
    
        // Filter out the item if the action is 'del'
        const finalCart = action === 'del' ? updatedCart.filter(item => item.id !== id) : updatedCart;
    
        // Update the state with the new array
        setCart(finalCart);
    };
    
    return (
        <View style={styles.screen}>
            <Text style={styles.screenText}>Checkout</Text>

            <View>
                <View>
                    {/* Check if cart is empty */}
                    {cart.length === 0 ? (
                        <View style={styles.empty}>
                            <Text style={[styles.subText, {textAlign: 'center'}]}>Nothing here to checkout!</Text>
                            <Pressable onPress={goToProducts} style={styles.btn}>
                                <Text style={styles.button}>Go back to products</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <>
                        <Text style={styles.subText}>Cart</Text>

                        <View style={styles.cartCtn}>
                            <FlatList
                                data={cart}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.itemCtn}>
                                        <Image source={item.image} style={{ width: 50, height: 50 }} />


                                        <View style={styles.ctaCtn}>
                                            <Pressable style={styles.btn} onPress={() => updateQty('sub', item.id)}>
                                                <Text style={styles.button}>-</Text>
                                            </Pressable>
                                            <Text>{item.qty}</Text>
                                            <Pressable style={styles.plusBtn} onPress={() => updateQty('add', item.id)}>
                                                <Text style={styles.button}>+</Text>
                                            </Pressable>
                                        </View>
                                        <Text style={styles.price}>${item.price}</Text>
                                        <Pressable style={styles.btn} onPress={() => updateQty('del', item.id)}>
                                            <Image source={require('.././assets/trash.png')} style={{ width: 30, height: 30 }} />
                                            </Pressable>
                                    </View>
                                )}
                            />
                            {/* <Text style={styles.total}>Total price: ${total}</Text> */}
                        </View>

                        <View>
                            <Text style={styles.subText}>Payment</Text>
                            <CardInput total={total} goToOrderSuccessfull={switchToOrderSuccessfull} />
                        </View>
                        </>
                    )}
                </View>
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
    empty: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontWeight: 'bold',
    },
    total: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemCtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FBA4A4',
        marginBottom: 10,
    },
    cartCtn: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FBA4A4',
        marginBottom: 10,
    },
    plusBtn:{
        padding: 5,
        borderRadius: 5,
    },
    button: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#FBA4A4',
        padding: 10,
        width: 'auto',
        borderRadius: 5,
        color: '#FFF8F6',
    },
    ctaCtn: {
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})