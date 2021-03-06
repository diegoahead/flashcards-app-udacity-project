import React, {Component} from 'react';
import { 
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { saveCard } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'
import { white, green } from '../utils/colors'

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
        style={styles.iosSubmitBtn}
        onPress={onPress}>
        <Text style={styles.submitBtnText}>Create Card</Text>
      </TouchableOpacity>
    )
}



class NewCard extends Component {

    state = {
        cardTitle: '',
        cardAnswer: '',
    }

    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: 'Add Card'
        }
    }

    submit = () => {
        const { cardTitle, cardAnswer } = this.state
        const { goBack, deckId, navigation } = this.props

        // alert(cardTitle + cardAnswer)

        
        saveCard(deckId, {cardTitle, cardAnswer})

        this.props.dispatch(addCard(deckId, {cardTitle, cardAnswer}))

        // console.log(this.props.state)

        this.setState({
            cardTitle: '',
            cardAnswer: '',
        })

        goBack()
    }

    render(){
        const { deckItem, state, deckId } = this.props
        const { cardTitle, cardAnswer } = this.state
        return(
            <DismissKeyboard>
                <Text style={styles.newCardTitle}>
                    {/*`Add new card to this deck: ${deckItem.name}`*/}
                </Text>
                    <TextInput
                        editable = {true}
                        maxLength = {40}
                        placeholder = {'Card Title'}
                        onChangeText={(cardTitle) => this.setState({cardTitle})}
                        value={cardTitle}
                        style={styles.textInput}
                    />

                    <TextInput
                        editable = {true}
                        maxLength = {40}
                        placeholder = {'Card Answer'}
                        onChangeText={(cardAnswer) => this.setState({cardAnswer})}
                        value={cardAnswer}
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
        // justifyContent: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    textInput: {
        borderColor: '#333',
        borderWidth: 1,
        width: 250,
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        borderRadius: 4,
    },
    newCardTitle: {
        marginTop: 30,
    }
  });

function mapStateToProps (state, { navigation }) {

    const { deckId } = navigation.state.params

    return {
        deckId,
        state,
        deckItem: state.decks[deckId],
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps)(NewCard)
