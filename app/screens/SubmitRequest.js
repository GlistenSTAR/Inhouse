import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity,  ScrollView, Text,View, Dimensions, TextInput, Platform, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API_SERVER_URL } from '../app_config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from 'react-native-image-picker';

const deviceSize = Dimensions.get('window');

const SubmitRequestScreen = ({ navigation }) => {
    const [jobs, addUserJob] = useState([]);
    const [fullname, setFullName] = useState("");
    const [dob, setDob] = useState(new Date());
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [profession, setProfession] = useState("");
    const [isFreelancer, setIsFreelancer] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [aboutMe, setAboutMe] = useState("");
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showDobDatePicker, setShowDobDatePicker] = useState(false);
    const [joblist, setJobList] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [isProfession, setIsProfession] = useState(false);
    const [jobcandidates, setJobCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const onDobDateChange = (event, selectedDate) =>{
      setShowDobDatePicker(false);
      const currentDate = selectedDate || startDate;      
      setDob(currentDate);
             
    }

    const onStartDateChange = (event, selectedDate) =>{
      setShowStartDatePicker(false);
      const currentDate = selectedDate || startDate;      
      setStartDate(currentDate);      
    }
  
    useEffect(() => {
      AsyncStorage.getItem("user", (err, user) => {
        var userData = JSON.parse(user);
        setFullName(userData.name);
        setEmail(userData.email);
        setMobile(userData.mobile);
        fetch(API_SERVER_URL + "profession_list", {
          method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
          if(data.success == true){
            setCandidates(data.data);
          }          
        })
        .catch(err => {
  
        });
        fetch(API_SERVER_URL + "looking_for_list", {
          method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
          if(data.success == true){
            setJobList(data.data);
            var d = [];
            for(var i = 0; i < data.data.length; i++){
              d.push(false);
            }
            setJobCandidates(d);
          }          
        })
        .catch(err => {
  
        });
     });
    }, []);
  
    const onSubmit = () => {
      setIsLoading(true);
      AsyncStorage.getItem('token', (err, token) => {
       var formData = new FormData();
       formData.append("name", fullname);
       formData.append("email", email);
       formData.append("mobile", mobile);
       formData.append("about_me", aboutMe);
       formData.append("is_freelancer", isFreelancer==true? "yes": "no");
       formData.append("looking_for", jobs.join(","));
       formData.append("profession", profession);
       formData.append("career_start", startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate());
       formData.append("dob", dob.getFullYear() + "-" + (dob.getMonth() + 1) + "-" + dob.getDate());
       console.log("submit api", formData);
       fetch(API_SERVER_URL + "update_profile?token=" + token, {
         method: 'POST',
         body: formData
       })
       .then(res => res.json())
       .then(data => {
          
          if(data.success == true){
            console.log("api call ok", data);
            setIsLoading(false);
            navigation.push('Main');
          }
       })
       .catch(err => {
  
       });
      });
    }

    const changeJob = (index) => {
      if(jobcandidates[index] == true){
        addUserJob(jobs.filter(job => job !== joblist[index].name))
      }else{
        addUserJob(jobs => [...jobs, joblist[index].name]);
      }
      jobcandidates[index] = !jobcandidates[index];
      setJobCandidates(jobcandidates);
      console.log("jobcandidates", jobcandidates);
    }
  
    const getPhotos = () => {
        console.log("getPhotos function-------------------------");
        const options = {
           title: 'Select avatar',
           storageOptions: {
             skipBackup: true,
             path: 'images'
           }
        };
        ImagePicker.launchImageLibrary(options, (res) => {
            console.log(res.data);
            setIsLoading(true);
            AsyncStorage.getItem('token', (err, token) => {
               var formData = new FormData();
               formData.append('image',  res.data);

              //  setIsLoading(false);

              fetch(API_SERVER_URL + "upload_image?token=" + token, {
                method: 'POST',
                body: formData
              })
              .then(res => res.json())
              .then(data => {
                 console.log('upload successs', data);
                  setIsLoading(false);
                  Alert.alert(
                    "Attached Image uploaded successfully!",
                    "please click to upload more photos.",
                    [
                    { text: 'OK', onPress: () => {}}
                    ]);
              })
              .catch(err => {
                console.log('upload error', err);
                  setIsLoading(false);
                  Alert.alert(
                    "Attached Image failed to upload!",
                    JSON.stringify(err),
                    [
                    { text: 'OK', onPress: () => {
                      navigation.push('Login');
                    }}
                    ]);
              });
            });
        });
    }

    return (
      <View>
        <ScrollView>
            <View style={styles.container}>
              <View style={styles.header}>
                  <TouchableOpacity style={styles.back_btn} onPress={() => navigation.pop()}>
                      <Ionicons name="ios-arrow-back" size={25} color="black"/>
                  </TouchableOpacity>
                  <Text style={styles.header_text}>Submit Request</Text>
              </View>              
              <Text style={styles.desc_text}>Lorem ipsum is simply dummy text of the printing and typesetting industry.</Text>
              <Text style={styles.input_item_label}>Full Name</Text>
              <View style={styles.input_item_container}>
                <TextInput style={styles.input_item_input} placeholder="Enter your Full Name" value={fullname} onChangeText={setFullName}/>
              </View>
              <Text style={styles.input_item_label}>Email Id</Text>
              <View style={styles.input_item_container}>
                <TextInput style={styles.input_item_input} placeholder="Enter your Email Id" value={email} onChangeText={setEmail}/>
              </View>
              <Text style={styles.input_item_label}>Mobile Number</Text>
              <View style={styles.input_item_container}>
                <TextInput style={styles.input_item_input} placeholder="Enter your 10 digit mobile number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad"/>
              </View>
              <Text style={styles.input_item_label}>Birthday</Text>
              <TouchableOpacity onPress={() => {setShowDobDatePicker(true)}}>
                <View style={styles.input_item_container}>
                  <Text style={styles.input_item_input}>{dob.getFullYear()}-{dob.getMonth() + 1}-{dob.getDate()}</Text>
                </View>
              </TouchableOpacity>
              {showDobDatePicker && (
              <DateTimePicker
                  value={dob}
                  mode="date"
                  display="default"
                  onChange={(event, d) => onDobDateChange(event, d)}
              />
              )}
              <Text style={styles.input_item_label}>Profession</Text>
              <TouchableOpacity onPress={() => { setIsProfession(true); }}>
                <View style={styles.input_item_container}>
                <Text style={styles.input_item_input}>{profession}</Text>
                    <MaterialIcons name="arrow-drop-down" size={35} color="black"/>
                </View>
              </TouchableOpacity>
              {
              isProfession && (
                <View style={styles.select_wrapper}>
                    {
                      candidates.map((item, index) => {
                        return (
                          <TouchableOpacity key={index} onPress={() => { setProfession(item.name); setIsProfession(false) }}>
                              <View style={styles.option_item_wrapper}>
                                <Text style={styles.option_item_text}>{item.name}</Text>
                              </View>
                          </TouchableOpacity>                        
                        );
                      })
                    }
                </View> 
              )
              }
              <Text style={styles.input_item_label}>Looking for</Text>     
              <View style={styles.tab_items_container}>
                {
                  joblist.map((item, index) => {
                    return (    
                      <TouchableOpacity onPress={() => changeJob(index)} key={index}>
                        <View style={[styles.tag_container, (jobcandidates[index] == true) && styles.tag_active_container]} key={index}>
                            <Text style={styles.tag_text}>{item.name}</Text>                                            
                        </View>
                      </TouchableOpacity>                                
                    );
                  })
                }
              </View>
              <View style={styles.checkbox_container}>
                <Text style={styles.input_item_label}>Are you a freelancer? </Text>
                <CheckBox boxType="square" style={styles.checkbox} value={isFreelancer} onValueChange={setIsFreelancer}/>
              </View>
    
              <Text style={styles.input_item_label}>Career Start Date</Text>
              <TouchableOpacity onPress={() => {setShowStartDatePicker(true)}}>
                <View style={styles.input_item_container}>
                  <Text style={styles.input_item_input}>{startDate.getFullYear()}-{startDate.getMonth() + 1}-{startDate.getDate()}</Text>
                </View>
              </TouchableOpacity>
              {showStartDatePicker && (
              <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(event, d) => onStartDateChange(event, d)}
              />
              )}
    
              <Text style={styles.input_item_label}>About me</Text>
              <View style={styles.input_item_textarea_container}>
                <TextInput style={styles.input_item_textarea} placeholder="Enter your Message" multiline={true} numberOfLines={6} value={aboutMe} onChangeText={setAboutMe}/>
              </View>
              <Text style={styles.input_item_label}>Attachment</Text>
              <View style={styles.input_item_attachment_container}>
                <View style={styles.input_item_attachment_label}>
                  <TouchableOpacity onPress={getPhotos}>
                      <Text style={styles.input_item_attach_btn}>Add or Drag & Drop </Text>
                  </TouchableOpacity>
                  <Text>your files here</Text>              
                </View>
              </View>
              <View style={styles.btn_wrapper}>
                <TouchableOpacity onPress={onSubmit}>
                  <View
                      style={styles.login_btn}>
                      <Text
                        style={styles.login_btn_text}>
                        SUBMIT                
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>                                 
          </View>         
        </ScrollView>
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
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: Platform.OS == 'android'? 20 : 60,
      paddingBottom: 20,
      position: 'relative'
    },
    header: {
      paddingTop: 0,
      paddingBottom : 15,
      flexDirection: 'row',
      justifyContent: 'center'
    },
  
    back_btn: {
      position: 'absolute',
      left: 0,
      top: 0
    },
  
    back_btn_text: {
      color: 'black',
      marginLeft: 0,
      fontSize: 20,
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    header_text: {
      textAlign: 'center',
      fontSize: 20,
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
  
    desc_text: {
      textAlign: 'center',
      color: 'rgba(0,0,0,0.5)',
      marginBottom: 40
    },
    input_item_label: {
      color: 'rgb(165,104,189)',
      fontSize: 15,
      marginBottom: 8
    },
    input_item_container: {
      height: 50,
      width: deviceSize.width - 60,
      paddingTop: 5,
      paddingBottom: 5,
      borderColor: 'rgba(0,0,0,0.5)',
      borderWidth: 1,
      borderRadius: 25,
      justifyContent: 'center',
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
  
    checkbox_container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
  
    checkbox: {
      marginTop: -2,
      marginLeft: 10
    },
  
    tab_items_container: {
      paddingTop: 5,
      paddingBottom: 5,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
  
    tag_container: {
      flexDirection: 'row',
      borderWidth: 2,
      borderRadius: 25,
      borderColor: 'rgba(0,0,0,0.3)',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      marginLeft:10,
      marginBottom: 10
    },

    tag_active_container: {
      borderColor: 'rgb(165,104,189)'
    },
  
    tag_text: {
      color: 'rgba(0,0,0,0.7)',
      fontSize: 14,
      marginRight: 5
    },
  
    select_item: {
      fontSize: 15,
      lineHeight: 30,
      height: 28
    },
  
    input_item_input: {
      fontSize: 15,
      lineHeight: 20
    },
  
    input_item_textarea_container: {
      width: deviceSize.width - 60,
      borderColor: 'rgba(0,0,0,0.5)',
      borderWidth: 1,
      borderRadius: 25,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 20
    },
  
    input_item_textarea: {
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      lineHeight: 30,
      minHeight: 150
    },
    note_text: {
      color: 'rgba(0,0,0,0.5)',
      marginBottom: 20
    },
  
    input_item_attachment_container: {
      width: deviceSize.width - 60,
      paddingTop: 25,
      paddingBottom: 25,
      borderColor: 'rgba(0,0,0,0.5)',
      borderWidth: 1,
      borderRadius: 25,
      alignItems: 'center'
    },
  
    input_item_attach_btn: {
      color: 'rgb(165,104,189)',
      fontSize: 15,
      fontWeight: 'bold'
    },
  
    input_item_attachment_label: {
      color: 'rgba(0,0,0,0.5)',
      flexDirection: 'row'
    },
  
    btn_wrapper: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 50,
      paddingLeft: 10,
      paddingRight: 10
    },
  
    login_btn: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 40,
      alignItems: 'center',
      marginTop: 30,
      width: deviceSize.width - 50,
      backgroundColor: '#fda039'
    },
  
    login_btn_text: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      marginRight: 10,
      textAlign: 'center'
    },

    select_wrapper: {
      width: deviceSize.width - 70,
      backgroundColor: '#e3e3e3',
      marginTop: -20,
      marginLeft: 5,
      marginRight: 5
    },

    option_item_wrapper: {
      padding: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: 'rgba(0,0,0,0.1)'
    },

    option_item_text: {
      fontSize: 15,
      color: 'black'
    }
  });

  
export default SubmitRequestScreen;