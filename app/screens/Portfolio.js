import * as React from 'react';
import { useState, useEffect } from 'react';
import {AppRegistry, Image, StyleSheet, TouchableOpacity,  ScrollView, Text,View, Dimensions, TextInput, Platform, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API_SERVER_URL } from '../app_config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Upload from 'react-native-background-upload'

const deviceSize = Dimensions.get('window');

const PortfolioScreen = ({ navigation }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [albumTitle, setAlbumTitle] =  useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [albumImages, addAlbumImages] = useState([]);   

    const changeCover = () => {
      
      const options = {
        title: 'Select avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
     };
     ImagePicker.launchImageLibrary(options, (res) => {
        console.log(res.uri);     
        setCoverImage(res);
     });
    }

    const addImage = () => {
      
      const options = {
        title: 'Select avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
     };
     ImagePicker.launchImageLibrary(options, (res) => {
             
        addAlbumImages([...albumImages, res]);
     });
    }

    const onSubmit = () => {
       if(albumTitle.trim() == ""){
        Alert.alert(
          "Creating Album Failed!",
          "please enter album id or name.",
          [
          { text: 'OK', onPress: () => {}}
          ]);
          return;
       }
       
       AsyncStorage.getItem('token', (err, token) => {
          const options = {
            url: API_SERVER_URL + 'create_album/' + albumTitle + '?token=' + token,
            path: 'file://'+coverImage.uri.replace("file://", ""),
            method: 'POST',
            field: 'image',
            type: 'multipart'
          };

          Upload.startUpload(options).then((uploadId) => {
            console.log('Cover Upload started')
            Upload.addListener('progress', uploadId, (data) => {
              console.log(`Cover Progress: ${data.progress}%`)
            })
            Upload.addListener('error', uploadId, (data) => {
              console.log(`Cover Error: ${data.error}%`)
            })
            Upload.addListener('cancelled', uploadId, (data) => {
              console.log(`Cover Cancelled!`)
            })
            Upload.addListener('completed', uploadId, (data) => {              
              console.log('Cover Completed!', data);
              uploadImage(0);
            })
          });


          navigation.push("Main");
       });                 
    }    

    const uploadImage = (index) => {
       if(index >= albumImages.length){
         return;
       }

       AsyncStorage.getItem('token', (err, token) => {
        const options = {
          url: API_SERVER_URL + 'upload_image/' + albumTitle + '?token=' + token,
          path: 'file://'+albumImages[index].uri.replace("file://", ""),
          method: 'POST',
          field: 'image',
          type: 'multipart'
        };

        Upload.startUpload(options).then((uploadId) => {
          console.log('Image Upload started', index)
          Upload.addListener('progress', uploadId, (data) => {
            console.log(`Image Progress: ${data.progress}%`)
          })
          Upload.addListener('error', uploadId, (data) => {
            console.log(`Image Error: ${data.error}%`)
          })
          Upload.addListener('cancelled', uploadId, (data) => {
            console.log(`Image Cancelled!`);
            
          })
          Upload.addListener('completed', uploadId, (data) => {              
            console.log('Image Completed!', index);
            uploadImage(index + 1);
          })
        });        
     });    
    }

    return (
      <View>
        <ScrollView>
          <View style={styles.container}>              
            <View style={styles.cover_container}>
              <TouchableOpacity style={styles.cover_wrapper} activeOpacity={0.8} onPress={changeCover}>
                {
                  coverImage && (
                    <Image source={{uri: coverImage.uri}} style={styles.cover_image}/> 
                  )
                }                            
                  <Ionicons name="add" size={25} color="white"/>
                  <Text style={styles.cover_label}>Add or change cover</Text>                      
              </TouchableOpacity>                
            </View>  

            <View style={styles.album_input_container}>
               <TextInput style={styles.album_input} placeholder="Album Name" value={albumTitle} onChangeText={setAlbumTitle}/>  
            </View>           

            <View style={styles.photo_item_container}>
                <TouchableOpacity activeOpacity={0.8} onPress={addImage}>
                    <View style={styles.photo_item}>
                      <Ionicons name="add" size={25} color="black"/>
                      <Text style={styles.photo_item_label}>Add</Text>   
                    </View>
                </TouchableOpacity>
                {
                  albumImages.map((item, index) => {
                    return (
                      <View key={index} style={styles.album_item_container}>
                        <Image source={{uri: item.uri}} style={styles.album_item}/>  
                      </View> 
                    );
                  })
                }
                               
            </View>           
          </View>         
        </ScrollView>
        <TouchableOpacity activeOpacity={0.8} onPress={onSubmit}>
          <View style={styles.bottom_container}>
              <Text style={styles.save_btn}>Save</Text>
          </View>
        </TouchableOpacity> 
        {
          isLoading && (
            <View style={styles.loading_container}>
              <ActivityIndicator size="large" color="black"/>  
            </View> 
          )
        }        
      </View>
    );
}
const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: deviceSize.width,
        height: deviceSize.height,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000
    },
    container: {
      flex: 1,     
      position: 'relative',
      backgroundColor: 'white'
    },
    cover_container: {
      backgroundColor: '#fda039',
      padding: 20,
      height: deviceSize.height /3      
    },

    album_item_container: {
       marginRight: 10,
       marginBottom: 10
    },

    album_item: {
      width: 100,
      height: 100
    },

    cover_image: {
      width: deviceSize.width - 42,
      height: deviceSize.height /3 - 42,
      position: 'absolute',
      left: 0,
      top: 0
    },

    cover_wrapper: {
      flex: 1,
      borderWidth: 1,
      borderColor:  'rgba(255,255,255,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    cover_label: {
      color: 'white',
      fontSize: 18
    },     

    photo_item_container: {
      marginTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap'
    },

    photo_item: {
      height: 100,
      width: 100,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10
    },
    photo_item_label: {
      color: 'black'
    },
    album_input_container: {
      padding: 5
    },

    album_input: {
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.5)',
      height: 40,
      paddingLeft: 10,
      paddingRight: 10
    },

    bottom_container: {
      position: 'absolute',
      bottom: -42,
      left: 0,
      right: 0,
      height: 40,
      backgroundColor: '#fda039',
      justifyContent: 'center',
      alignItems: 'center'
    },

    save_btn: {
      color: 'white'
    },
  });

  
export default PortfolioScreen;