import {
    TextInput, View, Image, StyleSheet, Button,
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

    const [header, setHeader] = useState(route.params.object.header);
    const [description, setDescription] = useState(route.params.object.description);
    const [price, setPrice] = useState(route.params.object.price);
    const [hasImage, setHasImage] = useState(route.params.object.hasImage);
    const [imagePath, setImagePath] = useState(null);

    const chatColl = 'menu';

    const takeImageHandler = async () => {
        if(!route.params.object.hasImage) {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
            });
            setImagePath(result.assets[0].uri); // was result.assets[0].uri
            setHasImage(true);
            route.params.object.hasImage = true;
            console.log("in takeImageHandler. route..hasImage: " + route.params.object.hasImage);
        }
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

    if(route.params.object.hasImage || !route.params.object.hasImage ){ // will only be read at first render. Hence no extra downloads.

        console.log("image" + downloadImage())
    }



    const saveNote = async () => {
        await setDoc(doc(database, chatColl, route.params.object.key), {
            header: header,
            description: description,
            price: price,
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

    return (
        <View>
            <View style={styles.buttons}>
                <Button color="#f83821" title='ADD PIC' onPress={takeImageHandler}/>
                <Button color="#f83821" title='DEL PIC' onPress={deleteImage}/>
                <Button color="#f83821" title='SAVE' onPress={saveNote}/>
            </View>
            <TextInput
                style={styles.header}
                multiline={true}
                onChangeText={newheader => setHeader(newheader)}>
                {route.params.object.header}
            </TextInput>
            <TextInput
                style={styles.description}
                multiline={true}
                numberOfLines={1}
                onChangeText={newDesc => setDescription(newDesc)}>
                {route.params.object.description}
            </TextInput>
            <TextInput
                style={styles.price}
                multiline={true}
                keyboardType='numeric'
                onChangeText={newPrice => setPrice(newPrice)}>
                Price: {route.params.object.price}
            </TextInput>

            <View style={styles.imageView}>
                <Image  style={styles.image} source={{ uri: imagePath }}/>
            </View>

        </View> );
};

export default DetailView;


const styles = StyleSheet.create({

    buttons:{
        paddingTop: 15,
        paddingHorizontal: 30,
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    image:{
        width:"90%",
        height:350,
        backgroundColor:'#ddd',
    },
    imageView:{

        display: "flex",
        alignItems: "center",
    },
    header:{
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 40
    },
    description:{
        paddingTop: 20,
        paddingHorizontal: 25,
        fontSize: 20,
        height: 170,
        justifyContent: "flex-start",
        textAlignVertical: "top",
    },
    price:{
        alignSelf: "center",
        paddingTop: 20,
        paddingHorizontal: 25,
        fontSize: 40,
        height: 100,
        textAlignVertical: "top",
    },
});