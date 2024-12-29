import { View, Text, StyleSheet } from "react-native";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome ot the Dashboard!</Text>

      <Text style={styles.subtitle}>
        You can now proceed with full access to your account and features.
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        padding:20
      },
      image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        marginTop: '35%',
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
      },
      button: {
       
        marginTop:10,
        backgroundColor: '#518462',
        padding: 11,
        borderRadius: 5,
        width: '80%',
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },

});

export default Dashboard;
