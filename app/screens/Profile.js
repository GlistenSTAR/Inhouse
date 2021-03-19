import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Text,View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API_SERVER_URL } from '../app_config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Upload from 'react-native-background-upload';

const deviceSize = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
    const [userData, setData] = useState(null);


    useEffect(() => {
      AsyncStorage.getItem('token', (err, token) => {
        fetch(API_SERVER_URL + "profile?token=" + token, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            setData(data);
            console.log(data);
        })
        .catch(err => {
    
        });
      });
    }, []); 
  
    const goToProfile = function(){
      navigation.push('EditProfile');
      
    }

    const updateAvatar = () => {
      const options = {
        title: 'Select avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
     };
     ImagePicker.launchImageLibrary(options, (res) => {
      userData.data.profile_pic = res.uri;
      AsyncStorage.getItem('token', (err, token) => {
        const options = {
          url: API_SERVER_URL + 'update_profile_pic?token=' + token,
          path: 'file://'+res.uri.replace("file://", ""),
          method: 'POST',
          field: 'image',
          type: 'multipart'
        };

        Upload.startUpload(options).then((uploadId) => {
          console.log('Avatar Upload started')
          Upload.addListener('progress', uploadId, (data) => {
            console.log(`Avatar Progress: ${data.progress}%`)
          })
          Upload.addListener('error', uploadId, (data) => {
            console.log(`Avatar Error: ${data.error}%`)
          })
          Upload.addListener('cancelled', uploadId, (data) => {
            console.log(`Avatar Cancelled!`)
          })
          Upload.addListener('completed', uploadId, (data) => {              
            console.log('Avatar Completed!', data);            
          })
        });        
     }); 
     });
    }
  
    return (
       userData?
       (<ScrollView>
          <View style={styles.container}>
              <View style={styles.header}>
                  <TouchableOpacity style={styles.back_btn}>
                      <Ionicons name="ios-arrow-back" size={25} color="white"/>
                      <Text style={styles.back_btn_text}>Back</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.user_container}>
                  <View style={{width: 80,height: 80}}>
                    <Image source={{uri:userData.data.profile_pic}} style={styles.avatar}/>
                    <TouchableOpacity activeOpacity={0.8} style={styles.camera_btn} onPress={updateAvatar}>
                        <Ionicons name="camera" size={25} color="black"/>
                    </TouchableOpacity>                     
                  </View>                 
                 
                  <View style={styles.user_info_container}>
                  <Text style={styles.username}>{userData.data.name}</Text>
                      <View style={styles.social_container}>
                          <View style={styles.social_item}>
                              <Ionicons name="logo-instagram" size={15} color="white"/>
                              <Text style={styles.social_item_text}>{userData.data.fb_link}</Text>
                          </View>
                          <View style={styles.social_item}>
                              <Ionicons name="logo-facebook" size={15} color="white"/>
                              <Text style={styles.social_item_text}>{userData.data.insta_link}</Text>
                          </View>
                      </View>
                  </View>                
              </View>
              <View style={styles.follow_container}>
                  <View style={styles.follow_item}>
                      <Text style={styles.follow_item_text}>
                          {userData.data.followers}
                      </Text>
                      <Text style={styles.follow_item_type}>
                          Followers
                      </Text>
                  </View>
                  <View style={styles.follow_item}>
                      <Text style={styles.follow_item_text}>
                      {userData.data.following}
                      </Text>
                      <Text style={styles.follow_item_type}>
                          Followings
                      </Text>
                  </View>
                  <TouchableOpacity onPress={goToProfile}>
                      <Text style={styles.edit_btn}>EDIT PROFILE</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.main_containr}>
                  <Text style={styles.block_header}>My Albums</Text>
                  <View style={styles.gallery_container}>
                    <ScrollView horizontal={true}>
                      {
                        userData.data.my_albums.map((item, index) => {
                           return  (
                            <View style={styles.gallery_item} key={index}>
                              <View style={styles.galler_row}>
                                <Image source={{uri:item.images[0]}} style={styles.gallery_image}/>
                                <Image source={{uri:item.images[1]}} style={styles.gallery_image}/>
                              </View> 
                              <View style={styles.galler_row}>
                                <Image source={{uri:item.images[2]}} style={styles.gallery_image}/>
                                <Image source={{uri:item.images[3]}} style={styles.gallery_image}/>
                              </View>  
                              <Text style={styles.gallery_text}>{item.name}</Text>                    
                          </View>
                           );
                        })
                      }                                    
                    </ScrollView>
                  </View>
                  <Text style={styles.block_header}>Favourite Place</Text>                
                  {
                    userData.data.my_images.map((item, lindex) => {
                      return (
                      <View key={lindex} style={styles.gallery_container}>
                        <ScrollView horizontal={true}>
                          {item.map((image, index) => {
                            return (
                              <Image key={index} source={{uri :image}} style={styles.gallery2_image}/>
                            );
                          })}                       
                        </ScrollView>
                      </View>
                      );
                    })
                  }                      
              </View>
          </View>
       </ScrollView>):(<Text></Text>)
    );
}
const styles = StyleSheet.create({
    container: {
      width: deviceSize.width,
      backgroundColor: '#fda039'
    },
  
    header: {
      paddingTop: 55,
      paddingBottom : 15,
      paddingLeft: 15,
      paddingRight: 15
    },
  
    back_btn: {
      flexDirection: 'row'
    },
  
    back_btn_text: {
      color: 'white',
      marginLeft: 10,
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: 'center'
    },
  
    user_container: {
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center'
    },
  
    avatar: {
       width: 80,
       height: 80,
       borderRadius: 40
    },

    camera_btn: {
       position: 'absolute',
       top: 0,
       right: 0,
       width: 30,
       height: 30,
       backgroundColor: '#fda039',
       justifyContent: 'center',
       alignItems: 'center',
       borderRadius: 15,
       borderColor: 'black',
       borderWidth: 1
    },
  
    user_info_container: {
      marginLeft: 20,
    },
  
    username: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
  
    social_container: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10
    },
  
    social_item: {
      flexDirection: 'row',
      marginRight: 20
    },
  
    social_item_text: {
      fontSize: 13,
      color: 'white',
      marginLeft: 5,
      marginTop: -3
    },
  
    follow_container: {
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center'
    },
  
    follow_item: {
      marginRight: 30
    },
  
    follow_item_text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      paddingBottom: 10,
      textAlign: 'center'
    },
    follow_item_type: {
      fontSize: 15,
      color: 'white'
    },
    edit_btn: {
      color: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: 15
    },
  
    main_containr: {
      marginTop: 20,
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: 'white',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      width: deviceSize.width
    },
  
    block_header: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      padding: 20
    },
  
    gallery_container: {
      height: 230
    },
  
    gallery_item: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      elevation: 1,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      textShadowRadius: 5,
      backgroundColor: 'white',
      paddingRight: 5,
      paddingBottom: 5,
      height: 230,
      marginRight: 30,
      borderRadius: 5,
    },
  
    galler_row: {
      flexDirection: 'row'
    },
  
    gallery_image: {
       width: 90,
       height: 90,
       marginLeft: 5,
       marginTop: 5,
       borderRadius: 12
    },
  
    gallery_text: {
      height: 30,
      lineHeight: 30,
      paddingLeft: 10,
      fontSize: 15
    },
  
    gallery2_image: {
       width: 220,
       height: 220,
       marginLeft: 20,
       marginTop: 5,
       borderRadius: 8,
       resizeMode: 'cover'
    }
  });

  
export default ProfileScreen;