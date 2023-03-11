import React, { useState } from 'react'
import MapView, {Marker, Callout} from 'react-native-maps'
import { StyleSheet, View, Text } from 'react-native'
import {doc, setDoc} from "firebase/firestore";
import {database} from "../config/config";


const MapView2 = ({navigation, route}) => {  // route.params.xxx
    const chatColl = 'notes';

    const [regionState, setRegionState] = useState({
        latitude: 55.691,
        longitude: 12.553,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })

    const markerCoordinate = {
        latitude: 55.6915,
        longitude: 12.555,
    }


    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>
                Telefon Nr: 12345678 {"\n"}
                Adresse: Guldbergsbage 29N {"\n"}{"\n"}

                ÅBNINGSTIDER{"\n"}
                Mandag 15:00 - 21:00{"\n"}
                Tirsdag 15:00 - 21:00{"\n"}
                Onsdag 15:00 - 21:00{"\n"}
                Torsdag 15:00 - 21:00{"\n"}
                Fredag 15:00 - 21:00{"\n"}
                Lørdag 15:00 - 21:00{"\n"}
                Søndag 15:00 - 21:00{"\n"}
            </Text>
            <MapView
                style={styles.map}
                initialRegion={regionState}
                tracksViewChanges={true}
            >
                <Marker
                    coordinate={markerCoordinate}
                    title={"KEA Pizzaria"}
                >
                </Marker>
            </MapView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoText:{
        width: "100%",
        height: "50%",
        fontWeight: "bold",
        fontSize: 24,
        padding: 25,
    },
    map: {
        alignSelf: "center",
        width: '90%',
        height: '47%',
        borderRadius: 100,
    },
});


export default MapView2;