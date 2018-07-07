import React, {Component} from 'react';
import { StyleSheet,
     Text,
     View,
     TextInput,
     TouchableOpacity,
     Platform,
     KeyboardAvoidingView,
     TouchableWithoutFeedback,
     Keyboard
    } from 'react-native';
import { saveDeckTitle } from '../utils/api'
import { purple,white } from '../utils/colors'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            {children}
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )

function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    )
}

class NewDeck extends Component {

    state = {
        name: '',
        category: '',
        previousScore: 0,
        cards: []
      };

    submit = () => {
        const { name } = this.state
        const { goBack } = this.props

        const deck = {
            ...this.state,
          };

        this.props.dispatch(addDeck(deck))

        saveDeckTitle(deck)

        // console.log(this.props.state)

        this.setState({
            name: ''
        })

        goBack()
    }

    render() {
        const { name } = this.state
        return (
            <DismissKeyboard>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    editable = {true}
                    maxLength = {40}
                    placeholder = {'Hello'}
                    onChangeText={(name) => this.setState({name})}
                    value={name}
                    style={styles.textInput}
                />
        
                <SubmitBtn onPress={this.submit} />
            </DismissKeyboard>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    textInput: {
        borderColor: '#333',
        borderWidth: 1,
        // height: 40,
        width: 250,
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        borderRadius: 4,
    }
  });


  function mapStateToProps (state,{ navigation }) {
    return {
      state,
      goBack: () => navigation.goBack()
    }
  }


  
  
  export default connect(mapStateToProps)(NewDeck)