// App.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Products from './components/Products';
import Checkout from './components/Checkout';
import TabButton from './components/TabButton';
import OrderSuccessfull from './components/OrderSuccessfull';

export default function App() {
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState('Products');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Function to render the content based on the selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case 'Products':
        return <Products cart={cart} setCart={setCart} />;
      case 'Checkout':
        return <Checkout cart={cart} setCart={setCart} 
        goToProducts={() => setSelectedTab('Products')}
        goToOrderSuccessfull={() => setSelectedTab('OrderSuccessfull')} />;
      case 'OrderSuccessfull':
        return <OrderSuccessfull goToProducts={() => setSelectedTab('Products')} />;
      default:
        return <Products cart={cart} setCart={setCart} />;
    }
  };

  

  return (
    <View style={styles.container}>
      {/* Render the current tab's content */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        <TabButton
          label="Products"
          onPress={() => setSelectedTab('Products')}
          isSelected={selectedTab === 'Products'}
        />
        <TabButton
          label="Checkout"
          onPress={() => setSelectedTab('Checkout')}
          isSelected={selectedTab === 'Checkout'}
        />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
});
