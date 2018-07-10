import React, {Component} from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { connect } from 'react-redux'
import { white, gray, blue, green } from '../utils/colors'

function DeckDetailBtn ({ text, onPress, bgColor }) {
    return (
      <TouchableOpacity
        style={[styles.iosSubmitBtn, bgColor]}
        onPress={onPress}>
        <Text style={styles.submitBtnText}>{text}</Text>
      </TouchableOpacity>
    )
}

class NewDeck extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: deckId
        }
    }

    render(){

        const { deckItem, deckId, state } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle}>{ deckItem.name }</Text>
                <Text style={styles.cardsNumber}>{ deckItem.cards.length } cards</Text>
                <DeckDetailBtn text="Add Card" bgColor={{backgroundColor: blue}} onPress={()=> this.props.navigation.navigate(
                    'NewCard',
                    {deckId: deckId}
                )} />
                <DeckDetailBtn text="Start Quiz" bgColor={{backgroundColor: green}} onPress={()=> this.props.navigation.navigate(
                    'Quiz',
                    {deckId: deckId}
                )} />
                
            </View>
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
    deckTitle: {
        fontSize: 40,
    },
    cardsNumber: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        color: gray,
    },
    iosSubmitBtn: {
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 10,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },

});

function mapStateToProps (state, { navigation }) {

    const { deckId } = navigation.state.params

    return {
        deckId,
        deckItem: state.decks[deckId]
    }
}

export default connect(mapStateToProps)(NewDeck)
