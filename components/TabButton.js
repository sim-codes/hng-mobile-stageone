import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function TabButton({ label, onPress, isSelected }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.tabButton, isSelected && styles.selectedTab]}
        >
            <Text style={styles.tabButtonText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    },
    tabButtonText: {
    fontSize: 16,
    color: '#555',
    },  
    selectedTab: {
      borderBottomWidth: 4,
      borderBottomColor: '#000',
    },
})