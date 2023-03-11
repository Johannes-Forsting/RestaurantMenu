import { StatusBar } from 'expo-status-bar';
import { FlatList,
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';


import React, {
    useState,
    useEffect
} from 'react';

import {
    collection,
    addDoc,
    query,
    onSnapshot
} from 'firebase/firestore'

import {database, storage} from '../config/config'

const ListView = ({navigation, route}) => {  // route.params.xxx

    const chatColl = 'menu';
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        readDB();
    }, []);
    const readDB = async () => {
        const collectionRef = collection(database, chatColl);
        const q = query(collectionRef, ref => ref.orderBy('createdAt', 'desc'));
        // const querySnapshot = await getDocs(q);
        onSnapshot(q, snapshot =>{
            const _notes = [];
            snapshot.forEach(snap => {
                _notes.push({
                    ...snap.data(),
                    key: snap.id
                });
            });
            // setNotes( prevNotes => {
            //    return {...prevNotes, _notes}
            //  });
            setNotes(_notes);
        });
    }


    const addNote = () => {

        addDoc(collection(database, chatColl), {
            header: "New Item",
            description: "Put food describtion here",
            hasImage: false
        });
    }

    const detailView = "DetailView"
    const clickRow = (obj) => {
        navigation.navigate(detailView, {object: obj})
    }




    const mapView = "MapView"
    const getMap = (item) => {
        navigation.navigate(mapView, {notes:notes})
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button
                    color={"#252525"}
                    title='INFO'
                    onPress={getMap}/>
                <Button
                    color={"#ea964e"}
                    title='ADD+'
                    onPress={addNote}/>
            </View>
            <View style={styles.imagePreview}>
                <Image
                    source={{uri: 'https://i.imgur.com/RTksagv.png'}} style={styles.image}
                />
            </View>
            <StatusBar style="auto" />
                <FlatList
                    style={styles.menu}
                    data={notes}
                    renderItem={({item}) =>
                        <View style={styles.item}>
                            <Button
                                color="#f83821"
                                title={item.header.substring(0,30)}
                                onPress={() => clickRow(item)}/>
                        </View>
                    }
                />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop: 15,
        paddingHorizontal: 30,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"

    },
    item: {
        padding: 0,
        fontSize: 11,
        margin: 5,
        borderStyle: "solid",
        borderColor: "#3d1d06",
        borderWidth: 3,
        borderRadius: 5
    },
    imagePreview:{
        width:'100%',
        height:250,
        alignItems:'center',
    },
    image:{
        width:'100%',
        height:'100%',
    },
    menu:{
        width: 250,
        alignSelf: "center"
    }
});


export default ListView;