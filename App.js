import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';
import { Dropdown } from 'react-native-material-dropdown';
import {createStackNavigator, createAppContainer} from 'react-navigation';

class Home extends Component {

  constructor() {
      super()
      this.state = {
        gpaForAPlus: 4.000,
        gpaForA: 4.000,
        gpaForAMinus: 3.670,
        gpaForBPlus: 3.330,
        gpaForB: 3.000,
        gpaForBMinus: 2.670,
        gpaForCPlus: 2.330,
        gpaForC: 2.000,
        gpaForCMinus: 1.670,
        gpaForDPlus: 1.330,
        gpaForD: 1.000,
        gpaForDMinus: 0.670,
        gpaForF: 0.000,
        gpaForNone: 0.000,
      }
  }

  static navigationOptions = {
    title: 'GPA Calculator',
    headerStyle: {
      backgroundColor: '#C75B12',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.contain}>
        <Text style={styles.text}>Calculate your grade point average based on current GPA settings:</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Cal', { gpaAPlus: this.state.gpaForAPlus, gpaA: this.state.gpaForA,
          gpaAMinus: this.state.gpaForAMinus, gpaBPlus: this.state.gpaForBPlus, gpaB: this.state.gpaForB, gpaBMinus: this.state.gpaForBMinus,
          gpaCPlus: this.state.gpaForCPlus, gpaC: this.state.gpaForC, gpaCMinus: this.state.gpaForCMinus, gpaDPlus: this.state.gpaForDPlus, gpaD: this.state.gpaForD,
          gpaDMinus: this.state.gpaForAMinus, gpaF: this.state.gpaForF, gpaNone: this.state.gpaForNone,})} activeOpacity={0.7}>
          <Text style={{color: 'white', fontSize: 20, textAlign: 'center',}}> Calculate GPA </Text>
        </TouchableOpacity>

        <Text style={styles.text}>Change GPA settings according to the university you attend:</Text>
        <TouchableOpacity style={styles.buttonTwo} onPress={() => this.props.navigation.navigate('Settings')} activeOpacity={0.7}>
          <Text style={styles.buttonText}> GPA Settings </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Cal extends Component {
  constructor() {
    super()
    this.state = {
      temp: 0,
      tempTwo: 0,
      totalCredits: 0,
      totalPreviousGPACredits: 0,
      totalGPACredits: 0,
      totalTotalGPA: 0,
      totalTotalCredits: 0,
      courseOne: 0,
      courseTwo: 0,
      courseThree: 0,
      courseFour: 0,
      courseFive: 0,
      courseSix: 0,
      courseSeven: 0,
      currentCredits: '',
      currentGPA: '',
      semesterGPA: '0.000',
      cumulativeGPA: '0.000',
      courseNameOne: '',
      courseNameTwo: '',
      courseNameThree: '',
      courseNameFour: '',
      courseNameFive: '',
      courseNameSix: '',
      courseNameSeven: '',
      courseOneCredits: '',
      courseOneGrade: '',
      courseTwoCredits: '',
      courseTwoGrade: '',
      courseThreeCredits: '',
      courseThreeGrade: '',
      courseFourCredits: '',
      courseFourGrade: '',
      courseFiveCredits: '',
      courseFiveGrade: '',
      courseSixCredits: '',
      courseSixGrade: '',
      courseSevenCredits: '',
      courseSevenGrade: '',
    }
    this.calculate = this.calculate.bind(this)
    this.clear = this.clear.bind(this)
  }

  static navigationOptions = {
    title: 'Calculate GPA',
    headerStyle: {
      backgroundColor: '#69BE28',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  calculate() {
    this.state.totalPreviousGPACredits = parseInt(this.empty(this.state.currentCredits)) * this.empty(this.state.currentGPA)

    console.log(this.state.totalPreviousGPACredits);
    console.log(this.state.currentCredits, this.empty(this.state.currentCredits), parseInt(this.empty(this.state.currentCredits)));

    this.state.totalCredits = parseInt(this.empty(this.state.courseOneCredits)) + parseInt(this.empty(this.state.courseTwoCredits)) + parseInt(this.empty(this.state.courseThreeCredits)) + parseInt(this.empty(this.state.courseFourCredits)) + parseInt(this.empty(this.state.courseFiveCredits)) + parseInt(this.empty(this.state.courseSixCredits)) + parseInt(this.empty(this.state.courseSevenCredits))
    this.state.courseOne = this.findGPA(this.empty(this.state.courseOneGrade)) * this.empty(this.state.courseOneCredits)
    this.state.courseTwo = this.findGPA(this.empty(this.state.courseTwoGrade)) * this.empty(this.state.courseTwoCredits)
    this.state.courseThree = this.findGPA(this.empty(this.state.courseThreeGrade)) * this.empty(this.state.courseThreeCredits)
    this.state.courseFour = this.findGPA(this.empty(this.state.courseFourGrade)) * this.empty(this.state.courseFourCredits)
    this.state.courseFive = this.findGPA(this.empty(this.state.courseFiveGrade)) * this.empty(this.state.courseFiveCredits)
    this.state.courseSix = this.findGPA(this.empty(this.state.courseSixGrade)) * this.empty(this.state.courseSixCredits)
    this.state.courseSeven = this.findGPA(this.empty(this.state.courseSevenGrade)) * this.empty(this.state.courseSevenCredits)

    console.log(this.state.totalCredits, this.state.courseOne, this.state.courseTwo, this.state.courseThree, this.state.courseFour, this.state.courseFive, this.state.courseSix, this.state.courseSeven);

    this.state.totalGPACredits = this.state.courseOne + this.state.courseTwo + this.state.courseThree + this.state.courseFour + this.state.courseFive + this.state.courseSix + this.state.courseSeven

    console.log(this.state.totalGPACredits);

    if ((this.state.totalCredits == 0) || (this.state.totalGPACredits == 0)) {
      this.setState({
        semesterGPA: '0.000',
      })
    }
    else {
      if ((this.state.totalPreviousGPACredits == 0)) {
        this.setState({
          cumulativeGPA: '0.000',
        })
      }
      else {
        this.state.totalTotalGPA = this.state.totalPreviousGPACredits + this.state.totalGPACredits
        this.state.totalTotalCredits = parseInt(this.empty(this.state.currentCredits)) + this.state.totalCredits
        this.state.tempTwo = this.state.totalTotalGPA / this.state.totalTotalCredits
        this.setState({
          cumulativeGPA: this.state.tempTwo.toFixed(3),
        })
      }
      this.state.temp = this.state.totalGPACredits/this.state.totalCredits
      this.setState({
        semesterGPA: this.state.temp.toFixed(3),
      })
    }
  }

  findGPA(letter) {
    switch(letter) {
      case 'A+':
        return this.props.navigation.state.params.gpaAPlus
        break
      case 'A':
        return this.props.navigation.state.params.gpaA
        break
      case 'A-':
        return this.props.navigation.state.params.gpaAMinus
        break
      case 'B+':
        return this.props.navigation.state.params.gpaBPlus
        break
      case 'B-':
        return this.props.navigation.state.params.gpaB
        break
      case 'B':
        return this.props.navigation.state.params.gpaBMinus
        break
      case 'C+':
        return this.props.navigation.state.params.gpaCPlus
        break
      case 'C':
        return this.props.navigation.state.params.gpaC
        break
      case 'C-':
        return this.props.navigation.state.params.gpaCMinus
        break
      case 'D+':
        return this.props.navigation.state.params.gpaDPlus
        break
      case 'D':
        return this.props.navigation.state.params.gpaD
        break
      case 'D-':
        return this.props.navigation.state.params.gpaDMinus
        break
      case 'F':
        return this.props.navigation.state.params.gpaF
        break
      case 0:
        return 0
        break
    }
  }

  empty(content) {
    if ((content == undefined) || (content == ''))   {
      return 0
    }
    else {
      return content
    }
  }

  clear() {
    this.setState({
      currentCredits: '',
      currentGPA: '',
      semesterGPA: '0.000',
      cumulativeGPA: '0.000',
      courseNameOne: '',
      courseNameTwo: '',
      courseNameThree: '',
      courseNameFour: '',
      courseNameFive: '',
      courseNameSix: '',
      courseNameSeven: '',
      courseOneCredits: '',
      courseOneGrade: '',
      courseTwoCredits: '',
      courseTwoGrade: '',
      courseThreeCredits: '',
      courseThreeGrade: '',
      courseFourCredits: '',
      courseFourGrade: '',
      courseFiveCredits: '',
      courseFiveGrade: '',
      courseSixCredits: '',
      courseSixGrade: '',
      courseSevenCredits: '',
      courseSevenGrade: '',
    })
  }

  render() {

    // var data = [["C", "Java", "JavaScript", "PHP"]];

    let data = [{
      value: '',}, {
      value: 'A+',}, {
      value: 'A',}, {
      value: 'A-',}, {
      value: 'B+',}, {
      value: 'B',}, {
      value: 'B-',}, {
      value: 'C+',}, {
      value: 'C',}, {
      value: 'C-',}, {
      value: 'D+',}, {
      value: 'D',}, {
      value: 'D-',}, {
      value: 'F',
    }];

    // let rows = []
    // let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    // for(let i = 0; i < 4; i++) {
    //   let row = []
    //   for(let j = 0; j < 3; j++) {
    //     row.push(
    //       <TextInput placeholder='Enter Course Name'/>
    //     )
    //   }
    //   rows.push(<View key={i} style={styles.row}>{row}</View>)
    // }

    return (
      <KeyboardAvoidingView style={styles.view} behavior="padding" enabled>
        <View style={styles.containerTotal}>
          <View style={styles.containerThree}>
            <Text style={{fontSize: 15, color: 'black'}}>Current Credits: </Text>
            <TextInput
              style = {styles.input}
              maxLength = {3}
              placeholder = '0'
              value = {this.state.currentCredits}
              // defaultValue = {this.state.currentCredits}
              onChangeText = {text => this.setState({currentCredits:text})}
            />
            <Text style={{fontSize: 15, color: 'black'}}> Current GPA: </Text>
            <TextInput
              style = {styles.input}
              maxLength={5}
              placeholder = '0.000'
              value = {this.state.currentGPA}
              onChangeText = {text => this.setState({currentGPA:text})}
            />
          </View>
          <View style={styles.containerOne}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}> Course </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}> Credits </Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}> Letter Grade </Text>
            </View>
            <ScrollView>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: 3,}}>
                <TextInput style = {styles.textInput} placeholder='Enter course name' value={this.state.courseNameOne} onChangeText = {text => this.setState({courseNameOne:text})}/>
                <TextInput style = {styles.creditInput} maxLength={1} placeholder = '0' value={this.state.courseOneCredits} onChangeText = {text => this.setState({courseOneCredits:text})}/>
                <Dropdown label='Grade' baseColor='black' textColor='black' selectedItemColor='black' itemColor='black' data={data} containerStyle={{width:100,}} value={this.state.courseOneGrade} onChangeText = {text => this.setState({courseOneGrade:text})} dropdownOffset = {{top: 12, left: 0}} dropdownMargins = {{min: 8, max: 16 }}/>
              </View>
              <View style={styles.containerOneOne}>
                <TextInput style = {styles.textInput} placeholder='Enter course name' value={this.state.courseNameTwo} onChangeText = {text => this.setState({courseNameTwo:text})}/>
                <TextInput style = {styles.creditInput} maxLength={1} placeholder = '0' value={this.state.courseTwoCredits} onChangeText = {text => this.setState({courseTwoCredits:text})}/>
                <Dropdown label='Grade' baseColor='black' textColor='black' selectedItemColor='black' itemColor='black' data={data} containerStyle={{width:100,}} value={this.state.courseTwoGrade} onChangeText = {text => this.setState({courseTwoGrade:text})} dropdownOffset = {{top: 12, left: 0}} dropdownMargins = {{min: 8, max: 16 }}/>
              </View>
              <View style={styles.containerOneOne}>
                <TextInput style = {styles.textInput} placeholder='Enter course name' value={this.state.courseNameThree} onChangeText = {text => this.setState({courseNameThree:text})}/>
                <TextInput style = {styles.creditInput}  maxLength={1} placeholder = '0' value={this.state.courseThreeCredits} onChangeText = {text => this.setState({courseThreeCredits:text})}/>
                <Dropdown label='Grade' baseColor='black' textColor='black' selectedItemColor='black' itemColor='black' data={data} containerStyle={{width:100,}} value={this.state.courseThreeGrade} onChangeText = {text => this.setState({courseThreeGrade:text})} dropdownOffset = {{top: 12, left: 0}} dropdownMargins = {{min: 8, max: 16 }}/>
              </View>
              <View style={styles.containerOneOne}>
                <TextInput style = {styles.textInput} placeholder='Enter course name' value={this.state.courseNameFour} onChangeText = {text => this.setState({courseNameFour:text})}/>
                <TextInput style = {styles.creditInput} maxLength={1} placeholder = '0' value={this.state.courseFourCredits} onChangeText = {text => this.setState({courseFourCredits:text})}/>
                <Dropdown label='Grade' baseColor='black' textColor='black' selectedItemColor='black' itemColor='black' data={data} containerStyle={{width:100,}} value={this.state.courseFourGrade} onChangeText = {text => this.setState({courseFourGrade:text})} dropdownOffset = {{top: 12, left: 0}} dropdownMargins = {{min: 8, max: 16 }}/>
              </View>
              <View style={styles.containerOneOne}>
                <TextInput style = {styles.textInput} placeholder='Enter course name' value={this.state.courseNameFive} onChangeText = {text => this.setState({courseNameFive:text})}/>
                <TextInput style = {styles.creditInput} maxLength={1} placeholder = '0' value={this.state.courseFiveCredits} onChangeText = {text => this.setState({courseFiveCredits:text})}/>
                <Dropdown label='Grade' baseColor='black' textColor='black' selectedItemColor='black' itemColor='black' data={data} containerStyle={{width:100,}} value={this.state.courseFiveGrade} onChangeText = {text => this.setState({courseFiveGrade:text})} dropdownOffset = {{top: 12, left: 0}} dropdownMargins = {{min: 8, max: 16 }}/>
              </View>
              <View style={styles.containerOneOne}>
                <TextInput style = {styles.textInput} placeholder='Enter course name' value={this.state.courseNameSix} onChangeText = {text => this.setState({courseNameSix:text})}/>
                <TextInput style = {styles.creditInput} maxLength={1} placeholder = '0' value={this.state.courseSixCredits} onChangeText = {text => this.setState({courseSixCredits:text})}/>
                <Dropdown label='Grade' baseColor='black' textColor='black' selectedItemColor='black' itemColor='black' data={data} containerStyle={{width:100,}} value={this.state.courseSixGrade} onChangeText = {text => this.setState({courseSixGrade:text})} dropdownOffset = {{top: 12, left: 0}} dropdownMargins = {{min: 8, max: 16 }}/>
              </View>
              <View style={styles.containerOneOne}>
                <TextInput style = {styles.textInput} placeholder='Enter course name' value={this.state.courseNameSeven} onChangeText = {text => this.setState({courseNameSeven:text})}/>
                <TextInput style = {styles.creditInput} maxLength={1} placeholder = '0' value={this.state.courseSevenCredits} onChangeText = {text => this.setState({courseSevenCredits:text})}/>
                <Dropdown label='Grade' baseColor='black' textColor='black' selectedItemColor='black' itemColor='black' data={data} containerStyle={{width:100,}} value={this.state.courseSevenGrade} onChangeText = {text => this.setState({courseSevenGrade:text})} dropdownOffset = {{top: 12, left: 0}} dropdownMargins = {{min: 8, max: 16 }}/>
              </View>
            </ScrollView>
          </View>
          <View style={styles.containerTwo}>
            <TouchableOpacity style={styles.buttonThree} onPress={this.calculate} activeOpacity={0.7}>
              <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}> Calculate </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonFour} onPress={this.clear} activeOpacity={0.7}>
              <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}> Clear </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerFour}>
            <Text style={{fontSize: 15, color: 'white'}}>Semester GPA :</Text>
            <Text style={{fontSize: 15, color: 'white'}}>{this.state.semesterGPA}</Text>
          </View>
          <View style={styles.containerFive}>
            <Text style={{fontSize: 15, color: 'white'}}>Cumulative GPA :</Text>
            <Text style={{fontSize: 15, color: 'white'}}>{this.state.cumulativeGPA}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

class Settings extends Component {

  constructor() {
      super()
      this.state = {
        gpaForAPlus: '',
        gpaForA: '',
        gpaForAMinus: '',
        gpaForBPlus: '',
        gpaForB: '',
        gpaForBMinus: '',
        gpaForCPlus: '',
        gpaForC: '',
        gpaForCMinus: '',
        gpaForDPlus: '',
        gpaForD: '',
        gpaForDMinus: '',
        gpaForF: '',
      }
  }

  static navigationOptions = {
    title: 'GPA Settings',
    headerStyle: {
      backgroundColor: '#00A1DE',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 100
    return (
      <KeyboardAvoidingView style={styles.view} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset} enabled>
        <View style={{flex: 1,}}>
        <ScrollView>
          <View style={{flex: 10, flexDirection: 'column', paddingVertical: 5,}}>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}> Grade </Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}> Corresponding GPA </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> A+ = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForAPlus} onChangeText = {text => this.setState({gpaForAPlus:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> A  = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForA} onChangeText = {text => this.setState({gpaForA:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> A- = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForAMinus} onChangeText = {text => this.setState({gpaForAMinus:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> B+ = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForBPlus} onChangeText = {text => this.setState({gpaForBPlus:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> B  = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForB} onChangeText = {text => this.setState({gpaForB:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> B- = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForBMinus} onChangeText = {text => this.setState({gpaForBMinus:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> C+ = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForCPlus} onChangeText = {text => this.setState({gpaForCPlus:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> C  = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForC} onChangeText = {text => this.setState({gpaForC:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> C- = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForCMinus} onChangeText = {text => this.setState({gpaForCMinus:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> D+ = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForDPlus} onChangeText = {text => this.setState({gpaForDPlus:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> D  = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForD} onChangeText = {text => this.setState({gpaForD:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> D- = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForDMinus} onChangeText = {text => this.setState({gpaForDMinus:text})}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 30, justifyContent: 'space-between', alignItems: 'center',}}>
              <Text style={{fontSize: 15,}}> F  = </Text>
              <TextInput style = {styles.input} maxLength={5} placeholder = '0.000' value = {this.state.gpaForF} onChangeText = {text => this.setState({gpaForF:text})}/>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 10,}}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Cal', { gpaAPlus: this.state.gpaForAPlus, gpaA: this.state.gpaForA,
              gpaAMinus: this.state.gpaForAMinus, gpaBPlus: this.state.gpaForBPlus, gpaB: this.state.gpaForB, gpaBMinus: this.state.gpaForBMinus,
              gpaCPlus: this.state.gpaForCPlus, gpaC: this.state.gpaForC, gpaCMinus: this.state.gpaForCMinus, gpaDPlus: this.state.gpaForDPlus, gpaD: this.state.gpaForD,
              gpaDMinus: this.state.gpaForAMinus, gpaF: this.state.gpaForF,})} activeOpacity={0.7}>
              <Text style={{color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}> Save </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOneOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  containerTotal: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerOne: {
    flex: 56,
    paddingBottom: 10,
    backgroundColor: 'white'
  },
  containerTwo: {
    paddingBottom: 10,
    flex: 5,
    backgroundColor: 'white',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  containerThree: {
    flex: 4,
    backgroundColor: 'white',
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  containerFour: {
    flex: 2,
    backgroundColor: '#00A1DE',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  containerFive: {
    flex: 2,
    backgroundColor: '#0039A6',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  contain: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 15,
    padding: 20,
  },
  button: {
    backgroundColor: '#69BE28',
    padding: 20,
    borderRadius: 50,
    width: 175,
  },
  buttonTwo: {
    backgroundColor: '#00A1DE',
    padding: 20,
    borderRadius: 50,
    width: 175,
  },
  buttonThree: {
    backgroundColor: '#008542',
    padding: 10,
    borderRadius: 50,
    width: 100,
  },
  buttonFour: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    width: 100,
  },
  buttonFive: {
    backgroundColor: '#69BE28',
    padding: 20,
    borderRadius: 50,
    width: 175,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 50,
    fontSize: 15,
    textAlign: 'center',
  },
  textInput: {
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 150,
    fontSize: 15,
    textAlign: 'center',
  },
  creditInput: {
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 50,
    fontSize: 15,
    textAlign: 'center',
  },
});

const RootStack = createStackNavigator({
    Home: {screen: Home},
    Cal: {screen: Cal},
    Settings: {screen: Settings},
  });

const App = createAppContainer(RootStack);

export default App;
