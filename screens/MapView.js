import React, { useState, Text } from 'react'
import MapView, {Marker} from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import {doc, setDoc} from "firebase/firestore";
import {database} from "../config/config";


const MapView2 = ({navigation, route}) => {  // route.params.xxx
    const chatColl = 'notes';

    const [regionState, setRegionState] = useState({
        latitude: 55.12,
        longitude: 12.0,
        latitudeDelta: 2,
        longitudeDelta: 2,
    })
    const [markerState, setMarkerState] = useState([])
    const onRegionChange = (region) => {
        setRegionState({ region })
    }

    const detailView = "DetailView"
    const onSelectMarker = async (data) => {
        console.log("Latitude: ",data.nativeEvent.coordinate.latitude)
        console.log("Longitude: ",data.nativeEvent.coordinate.longitude)

        navigation.navigate({
            name: detailView,
            params: data.nativeEvent.coordinate,
            merge: true,
        })
    }

    const onCreatePin = (data) => {
        const {latitude, longitude} = data.nativeEvent.coordinate
        markerState.push(
            <Marker coordinate = {{latitude,longitude}}
                    key={data.timeStamp}
                    pinColor = {"blue"}
                    title={"Title"}
                    description={"description"}
                    onPress={onSelectMarker}
            >

            </Marker>)
        setMarkerState(markerState)
        // hack, to force map to update
        setRegionState({
            ...regionState,
            latitude: regionState.latitude
        })
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                //provider="google"

                initialRegion={regionState}
                onRegionChange ={onRegionChange}
                onLongPress = {onCreatePin}
            >
                {markerState}
            </MapView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});


export default MapView2;