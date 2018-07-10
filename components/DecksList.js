import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import {receiveDecksData} from '../actions'
import { getDecks } from '../utils/api'

class DeckList extends Component {


    componentDidMount () {
        const { dispatch } = this.props

        getDecks()
          .then((decks) => {
            return (dispatch(receiveDecksData(JSON.parse(decks))))
          })
          .catch((error)=>{
            console.log(error.message);
            // alert(error.message);
         })
      }

      


    render() {

        const { decks, decksIds, state } = this.props



        return (
            <ScrollView>

                <View style={[styles.container,{flex:1}]}>

                    
                    {decks 
                        ? Object.keys(decks).map((deck) => (
                        <View style={[styles.deckItem]} key={decks[deck].name}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate(
                                'DeckDetail',
                                {deckId: decks[deck].name}
                            )}>
                                <Text>{decks[deck].name}</Text>
                                <Text>{decks[deck].cards.length} cards</Text>
                            </TouchableOpacity>
                        </View> 
                    ))
            
                    : <View style={[styles.container,{flex:1}, styles.noDeckYet]}>
                            <Text style={{fontSize: 18}}>It's seems quite empty here 🤷🏻‍♂ </Text>
                            <Text style={{fontSize: 18}}>feel free to create your first deck! 😎 </Text>
                        </View>
                    }



                </View>

            

            </ScrollView>
        )
    }
}

function mapStateToProps (state, decks, decksIds) {

    
    return {
        decks,
        state,
        decks: state.decks,
        // decksIds: Object.keys(state.decks)
    }
}
  
export default connect(mapStateToProps)(DeckList) 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
    },
    deckItem: {
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDeckYet: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
  });
  