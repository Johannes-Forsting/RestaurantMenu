import {View, Text, Pressable, StyleSheet} from 'react-native';

function pressHandler(){
    console.log("pressed");
}

function PrimaryButton({ children }){
    return (
        <Pressable onPress={pressHandler} style={styles.container}>
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#b00',
        borderRadius:25,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4
    },
    buttonText:{
        color:'white',
        textAlign:'center'
    }
})