import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { white, gray, purple } from '../utils/colors'
import { 
    clearLocalNotification,
    setLocalNotification 
} from '../utils/helpers'

function QuizBtn ({ text, onPress, bgColor }) {
    return (
      <TouchableOpacity
        style={[styles.iosSubmitBtn, bgColor]}
        onPress={onPress}>
        <Text style={styles.submitBtnText}>{text}</Text>
      </TouchableOpacity>
    )
}

function FlipAnswerQuestion ({ text, onPress }) {
    return (
      <TouchableOpacity
        style={styles.answerAndQuestionLink}
        onPress={onPress}>
        <Text style={styles.answerQstText}>{text}</Text>
      </TouchableOpacity>
    )
}


class Quiz extends Component {

    state = {
        correctAnswers: 0,
        currentCard: 0,
        numOfCards: 0,
        quizFinished: false,
        seeAnswer: false,
    }

    componentDidMount(){
        const { deckItem } = this.props
        this.setState({
            numOfCards: deckItem.cards.length,
        })
    }

    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: 'Quiz',
        }
    }

    handleFinish = () => {
        const { quizFinished } = this.state
        this.setState({
            quizFinished: !quizFinished,
        })
        clearLocalNotification().then(setLocalNotification)
    }

    handleCorrect = () => {
        const { currentCard, correctAnswers, numOfCards } = this.state

        if(!(currentCard + 1 === numOfCards) ) {
            this.setState({
                correctAnswers: correctAnswers + 1,
                currentCard: currentCard + 1,
                seeAnswer: false
            })
        } else {
            this.setState({
                correctAnswers: correctAnswers + 1,
            })
            console.log('Quiz finished!')
            this.handleFinish()
        }
    }
    
    handleIncorrect = () => {
        const { currentCard, numOfCards } = this.state


        if(!(currentCard+1 === numOfCards) ) {
            this.setState({
                currentCard: currentCard + 1,
                seeAnswer: false
            })
        } else {
            console.log('Quiz finished!')
            this.handleFinish()
        }

    }

    flipCard = () => {
        const { seeAnswer } = this.state
        {(seeAnswer ? 
            this.setState({seeAnswer: false})        
            :
            this.setState({seeAnswer: true})           
        )}
    }

    handleStartOver = () => {
        this.setState({
            correctAnswers: 0,
            currentCard: 0,
            quizFinished: false,
            seeAnswer: false,
        })
    }

    render() {
        const { deckItem, navigation, deckId } = this.props
        const { currentCard, numOfCards, correctAnswers, seeAnswer, quizFinished } = this.state

        if(!quizFinished) {
            return (
                <View style={[styles.container]}>
                    <Text style={[styles.remainingCards, {flex: 1}]}>{`${currentCard + 1}/${numOfCards}`}</Text>
                    
                        {seeAnswer ?
                            <View style={[styles.container, {flex: 1}]}>
                                <Text style={styles.answerAndQuestionText}>{deckItem.cards[currentCard].cardAnswer}</Text>
                                <FlipAnswerQuestion text="Show Question" onPress={this.flipCard} />
                            </View>
                            :
                            <View style={[styles.container]}>
                                <Text style={styles.answerAndQuestionText}>{deckItem.cards[currentCard].cardTitle}</Text>
                                <FlipAnswerQuestion text="Show Answer" onPress={this.flipCard} />
                            </View>
                        }

                    <View style={[styles.container, {flex: 1, alignSelf: 'flex-start', flexDirection: 'row'}]}>
                        <QuizBtn text="Correct" onPress={this.handleCorrect} bgColor={{backgroundColor: '#00b894' }} />
                        <QuizBtn text="Incorrect" onPress={this.handleIncorrect} bgColor={{backgroundColor: '#d63031' }} />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[styles.container]}>
                    <View style={[styles.container]}>
                        <Text style={styles.answerAndQuestionText}>{`You've answered ${correctAnswers} correct out of ${numOfCards}`}</Text>
                    </View>

                    <View style={[styles.container, {flex: 1, alignSelf: 'flex-start', flexDirection: 'row'}]}>
                        <QuizBtn text="Try again" onPress={this.handleStartOver} bgColor={{backgroundColor: '#00b894' }} />
                        <QuizBtn text="Back to deck" onPress={() => navigation.navigate(
                            'DeckDetail',
                            {deckId: deckId}
                        )} bgColor={{backgroundColor: '#0984e3' }} />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    remainingCards: {
        alignSelf: 'flex-start',
        fontSize: 18,
    },
    answerAndQuestionText: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },
    answerAndQuestionLink: {
        backgroundColor: '#fff', 
    },
    answerQstText: {
        color: '#d63031',
        fontSize: 18,
    }
});

function mapStateToProps (state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deckId,
        deckItem: state.decks[deckId]
    }
}

export default connect(mapStateToProps)(Quiz)