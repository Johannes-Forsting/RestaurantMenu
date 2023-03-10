import {
    TextInput, View, Image, StyleSheet, Button
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import React, {
    useState
} from 'react';
import {
    doc,
    collection,
    addDoc,
    setDoc,
    query,
    onSnapshot
} from 'firebase/firestore';
import {database, storage} from '../config/config';
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

const DetailView = ({navigation, route}) => {
    console.log("in detailview")
    console.log(route.params.longitude)
    const [text, setText] = useState(route.params.object.text);
    const [hasImage, setHasImage] = useState(route.params.object.hasImage);
    const [imagePath, setImagePath] = useState(null);

    const chatColl = 'notes';

    const takeImageHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true
        });
        setImagePath(result.assets[0].uri); // was result.assets[0].uri
        setHasImage(true);
        route.params.object.hasImage = true;
        console.log("in takeImageHandler. route..hasImage: " + route.params.object.hasImage);
    }

    const uploadImage = async () => {
        const res = await fetch(imagePath);
        const blob = await res.blob();
        const storageRef = ref(storage, route.params.object.key);
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log("uploaded blob or file " );
        });
    };

    const downloadImage = async () => {
        const storageRef = ref(storage, route.params.object.key);
        getDownloadURL(storageRef)
            .then((url) => {
                // Insert url into an <img> tag to "download"
                setImagePath(url);
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });
    };

    if(route.params.object.longitude !== ""){ // will only be read at first render. Hence no extra downloads.
        console.log("longitude: " + route.params.object.longitude)
        console.log("text: " + route.params.object.text)
        //downloadImage()
    }



    const saveNote = async () => {
        await setDoc(doc(database, chatColl, route.params.object.key), {
            text: text,
            latitude: route.params.latitude,
            longitude: route.params.longitude,
            hasImage: route.params.object.hasImage
        })
        if(route.params.object.hasImage){
            uploadImage();
        }
    }

    const deleteImage = async () => {
        const storageRef = ref(storage, route.params.object.key);
        deleteObject(storageRef).then(() => {
            // File deleted successfully
            route.params.object.hasImage = false;
            setImagePath(null);
            setHasImage(false);
            // setHasImage((prev) => {return false; })
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    };

    const mapView = "MapView"
    const goToMap = () => {
        navigation.navigate(mapView, {note: route.params.note})
    }

    return (
        <View>
            <View style={styles.buttons}>
                <Button  title='Get Image' onPress={takeImageHandler}/>
                <Button title='Delete Image' onPress={deleteImage}/>
                <Button title='Location' onPress={goToMap}/>
                <Button style={styles.saveButton} title='Save' onPress={saveNote}/>
            </View>
            <TextInput multiline={true}
                       onChangeText={newText => setText(newText)}>
                {route.params.object.text}
            </TextInput>
            { hasImage &&
                <Image  style={styles.image} source={{uri: imagePath}}/>
            }
        </View> );
};

export default DetailView;


const styles = StyleSheet.create({
    buttons:{
        flexDirection: 'row',
        alignItems:'stretch'
    },
    saveButton:{
        //alignSelf:'flex-end'
    },
    image:{
        width:200,
        height:200,
        backgroundColor:'#ddd'
    }
});