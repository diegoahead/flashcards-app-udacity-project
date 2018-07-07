import React, {Component} from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { connect } from 'react-redux'
import { white, gray, purple } from '../utils/colors'

function AddCardBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
        onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Card</Text>
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

        const { deckItem, deckId } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.deckTitle}>{ deckItem.name }</Text>
                <Text style={styles.cardsNumber}>{ deckItem.cards.length } cards</Text>

                <AddCardBtn onPress={()=> this.props.navigation.navigate(
                    'NewCard',
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

});

function mapStateToProps (state, { navigation }) {

    const { deckId } = navigation.state.params

    return {
        deckId,
        deckItem: state.decks[deckId]
    }
}

export default connect(mapStateToProps)(NewDeck)
