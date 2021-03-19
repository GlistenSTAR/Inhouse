import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity,  ScrollView, Text,View, Dimensions, TextInput, Platform, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API_SERVER_URL } from '../app_config';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceSize = Dimensions.get('window');

const InformationScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);    
    const interestCandidates = [
      "Beauty", "Fashion", "Casual", "Catalog", 
      "Portrait", "Clothing", "Sport", "Fitness",
      "Plus Size", "Lingerie", "Swimsuit", "Body Parts",
      "Hair", "Erotic", "Art-Nude", "Business",
      "Hostess", "Promo"
    ];
    const [interestSelections, setInterestSelection] = useState([
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false, false, false,
      false, false
    ]);

    const heightCandidates = ["1.34cm", "2.4cm", "2.5cm"];
    const weightCandidates = ["1.34kg", "2.4kg", "2.5kg"];
    const ethnicityCandidates = ["AAA", "BBB", "CCC"];
    const skinColorCandidates = ["AAA", "BBB", "CCC"];
    const breastCandidates = ["AAA", "BBB", "CCC"];
    const eyeColorCandidates = ["AAA", "BBB", "CCC"];
    const waistCandidates = ["AAA", "BBB", "CCC"];
    const hairColorCandidates = ["AAA", "BBB", "CCC"];
    const hipCandidates = ["AAA", "BBB", "CCC"];
    const hairLengthCandidates = ["AAA", "BBB", "CCC"];
    const clothingCandidates = ["AAA", "BBB", "CCC"];
    const tattooCandidates = ["AAA", "BBB", "CCC"];
    const footwearandidates = ["AAA", "BBB", "CCC"];
    const piercingCandidates = ["AAA", "BBB", "CCC"];
    const experienceCandidates = ["AAA", "BBB", "CCC"];
    const workingAbroadCandidates = ["AAA", "BBB", "CCC"];
    const actingEducationCandidates = ["AAA", "BBB", "CCC"];
    const languagesCandidates = ["AAA", "BBB", "CCC"];


    const [interests, addInterest] = useState([]);
    const [height, setHeight] = useState("");
    const [ethnicity, setEthnicity] = useState("");
    const [weight, setWeight] = useState("");
    const [skinColor, setSkinColor] = useState("");
    const [breast, setBreast] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [waist, setWaist] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [hip, setHip] = useState("");
    const [hairLength, setHairLength] = useState("");
    const [clothing, setClothing] = useState("");
    const [tattoo, setTattoo] = useState("");
    const [footwear, setFootWear] = useState("");
    const [piercing, setPiercing] = useState("");
    const [experience, setExperience] = useState("");
    const [workingAbroad, setWorkingAbroad] = useState("");
    const [actingEducation, setActingEducation] = useState("");
    const [languages, setLanguages] = useState("");

    const [isVisibleModal, setIsModalShow] = useState(false);
    const [modalDataList, setModalDataList] = useState([]);
    const [modalHeaderTitle, setModalHeaderTitle] = useState("");
    const [modalDataType, setModalDataType] = useState("");

    const changeInterest = (index) => {
       if(interestSelections[index] == false){
         addInterest([...interests, interestCandidates[index]]);
       }else{
         addInterest(interests.filter(interest => interest != interestCandidates[index]));
       }
       interestSelections[index] = !interestSelections[index];
       setInterestSelection(interestSelections);
    };

    const setFormValue = (type) => {
      switch(type){
        case "height":
          setModalDataList(heightCandidates);
          setModalHeaderTitle("Height");          
        break;
        case "ethnicity":
          setModalDataList(ethnicityCandidates);
          setModalHeaderTitle("Ethnicity");
        break;
        case "weight":
          setModalDataList(weightCandidates);
          setModalHeaderTitle("Weight");
        break;
        case "skinColor":
          setModalDataList(skinColorCandidates);
          setModalHeaderTitle("Skin Color");
        break;
        case "breast":
          setModalDataList(breastCandidates);
          setModalHeaderTitle("Breast");
        break;
        case "eyeColor":
          setModalDataList(eyeColorCandidates);
          setModalHeaderTitle("Eye Color");
        break;
        case "waist":
          setModalDataList(waistCandidates);
          setModalHeaderTitle("Waist");
        break;
        case "hairColor":
          setModalDataList(hairColorCandidates);
          setModalHeaderTitle("Hair Color");
        break;
        case "hip":
          setModalDataList(hipCandidates);
          setModalHeaderTitle("Hip");
        break;
        case "hairLength":
          setModalDataList(hairLengthCandidates);
          setModalHeaderTitle("Hair Length");
        break;
        case "clothing":
          setModalDataList(clothingCandidates);
          setModalHeaderTitle("Clothing");
        break;
        case "tattoo":
          setModalDataList(tattooCandidates);
          setModalHeaderTitle("Tattoo");
        break;
        case "footwear":
          setModalDataList(footwearandidates);
          setModalHeaderTitle("Footwear");
        break;
        case "piercing":
          setModalDataList(piercingCandidates);
          setModalHeaderTitle("Piercing");
        break;
        case "workingAbroad":
          setModalDataList(workingAbroadCandidates);
          setModalHeaderTitle("Working Abroad");
        break;
        case "actingEducation":
          setModalDataList(actingEducationCandidates);
          setModalHeaderTitle("Acting Education");
        break;
        case "languages":
          setModalDataList(languagesCandidates);
          setModalHeaderTitle("Language");
        break;
        case "experience":
          setModalDataList(experienceCandidates);
          setModalHeaderTitle("Experience");
        break;
        default:
          setModalDataList([]);
        break;
      }

      setIsModalShow(true);
      setModalDataType(type); 
    }

    const setDataValue = (value) => {
      switch(modalDataType){
        case "height":
          setHeight(value);      
        break;
        case "ethnicity":
          setEthnicity(value);
        break;
        case "weight":
          setWeight(value);
        break;
        case "skinColor":
          setSkinColor(value);
        break;
        case "breast":
          setBreast(value);
        break;
        case "eyeColor":
          setEyeColor(value);
        break;
        case "waist":
          setWaist(value);
        break;
        case "hairColor":
          setHairColor(value);
        break;
        case "hip":
          setHip(value);
        break;
        case "hairLength":
          setHairLength(value);
        break;
        case "clothing":
          setClothing(value);
        break;
        case "tattoo":
          setTattoo(value);
        break;
        case "footwear":
          setFootWear(value);
        break;
        case "piercing":
          setPiercing(value);
        break;
        case "workingAbroad":
          setWorkingAbroad(value);
          setModalHeaderTitle("Working Abroad");
        break;
        case "actingEducation":
          setActingEducation(value);
        break;
        case "languages":
          setLanguages(value);
        break;
        case "experience":
          setExperience(value);
        break;
      }
      setIsModalShow(false);
    }

    const onSubmit = () => {
      setIsLoading(true);
      AsyncStorage.getItem('token', (err, token) => {
       var formData = new FormData();
       formData.append("interested_in", interests.join(","));
       formData.append("height", height);
       formData.append("ethinicity", ethnicity);
       formData.append("weight", weight);
       formData.append("skin_color", skinColor);
       formData.append("breast", breast);
       formData.append("eye_color", eyeColor);
       formData.append("waist", waist);
       formData.append("hair_color", hairColor);
       formData.append("hip", hip);
       formData.append("hair_length", hairLength);
       formData.append("clothing", clothing);
       formData.append("tattoo", tattoo);
       formData.append("footwear", footwear);
       formData.append("piercing", piercing);
       formData.append("experience", experience);
       formData.append("acting_education", actingEducation);
       formData.append("language", languages);
       formData.append("working_abroad", workingAbroad);
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
          }
       })
       .catch(err => {
         setIsLoading(false);
       });
      });
    }
    
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.interest_btn_row}>
              {
                interestCandidates.map((item, index) => {
                  return (
                     <TouchableOpacity activeOpacity={1} key={index} onPress={() => changeInterest(index)}>
                       <View style={[styles.interest_btn, interestSelections[index] && styles.interest_btn_active]}>
                        <Text style={[styles.interest_btn_text, interestSelections[index] && styles.interest_btn_text_active]}>
                            {item}
                        </Text>
                      </View>
                     </TouchableOpacity>
                  );
                })
              }                        
            </View>        

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Height</Text> 
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('height')}>
                     <Text style={styles.input_item_input}>{height}</Text>
                  </TouchableOpacity>                 
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Ethnicity</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('ethnicity')}>
                     <Text style={styles.input_item_input}>{ethnicity}</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Weight</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('weight')}>
                     <Text style={styles.input_item_input}>{weight}</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Skin Color</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('skinColor')}>
                     <Text style={styles.input_item_input}>{skinColor}</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Breast</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('breast')}>
                     <Text style={styles.input_item_input}>{breast}</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Eye Color</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('eyeColor')}>
                     <Text style={styles.input_item_input}>{eyeColor}</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Waist</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('waist')}>
                     <Text style={styles.input_item_input}>{waist}</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Hair Color</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('hairColor')}>
                     <Text style={styles.input_item_input}>{hairColor}</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Hip</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('hip')}>
                     <Text style={styles.input_item_input}>{hip}</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Hair Length</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('hairLength')}>
                     <Text style={styles.input_item_input}>{hairLength}</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Clothing</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('clothing')}>
                     <Text style={styles.input_item_input}>{clothing}</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Tattoo</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('tattoo')}>
                     <Text style={styles.input_item_input}>{tattoo}</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Footwear</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('footwear')}>
                     <Text style={styles.input_item_input}>{footwear}</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Piercing</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('piercing')}>
                     <Text style={styles.input_item_input}>{piercing}</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Experience</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('experience')}>
                     <Text style={styles.input_item_input}>{experience}</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Acting Education</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('actingEducation')}>
                     <Text style={styles.input_item_input}>{actingEducation}</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.input_container}>
               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Languages</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('languages')}>
                     <Text style={styles.input_item_input}>{languages}</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.input_item_container}>
                  <Text style={styles.input_item_label}>Working abroad</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setFormValue('workingAbroad')}>
                     <Text style={styles.input_item_input}>{workingAbroad}</Text>
                  </TouchableOpacity> 
               </View>
            </View>
          </View>
          <View style={{height: 40}}/>   
          {
            isVisibleModal && (
              <Modal isVisible={true}>
                  <View style={styles.modal}>
                    <View style={styles.modal_header}>
                        <Text style={styles.modal_header_text}>{modalHeaderTitle}</Text>
                        <TouchableOpacity style={styles.modal_close_btn} onPress={() => setIsModalShow(false)}>
                          <Ionicons name="close" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                       {
                         modalDataList.map((item, index) => {
                           return (
                             <TouchableOpacity key={index} onPress={() => setDataValue(item)}>
                               <Text style={styles.modal_list_item}>{item}</Text>
                             </TouchableOpacity>
                           )
                         })
                       }
                    </ScrollView>
                  </View>
              </Modal> 
            )
          }                         
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
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 20,
      paddingBottom: 20,
      position: 'relative',
      backgroundColor: 'white'
    },
    interest_btn_row: {
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
       flexWrap: 'wrap',
       marginBottom: 20
    },
    interest_btn:{
      borderColor: '#fda039',
      borderWidth: 1,
      width : deviceSize.width / 4,
      paddingTop: 15,
      paddingBottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10
    },

    interest_btn_text: {
       color: '#fda039'       
    },

    interest_btn_active: {
      backgroundColor: '#fda039'
    },
    interest_btn_text_active: {
      color: 'white'
    },

    input_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },

    input_item_container: {
      borderBottomColor: 'rgba(0,0,0,0.5)',
      borderBottomWidth: 1  
    },

    input_item_label: {
      textAlign: 'center'
    },
    input_item_input: {
      width : (deviceSize.width - 100)/2,
      height: 40,
      textAlign: 'center',
      lineHeight: 40,
      fontSize: 20,
      backgroundColor: 'white',
      marginTop: 10,
      color: 'black',        
    },   

    bottom_container: {
      position: 'absolute',
      bottom: 0,
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

    modal: {
      width: deviceSize.width - 50,
      height: deviceSize.height - 50,
      backgroundColor: 'white'
    },

    modal_header: {
      backgroundColor: '#fda039',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },

    modal_header_text: {
      color: 'white',
      fontSize: 20
    },

    modal_close_btn: {
      position: 'absolute',
      right: 10,
      top: 10
    },

    modal_list_item: {
      lineHeight: 30,
      height: 30,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)',
      marginBottom: 5
    }
  });

  
export default InformationScreen;