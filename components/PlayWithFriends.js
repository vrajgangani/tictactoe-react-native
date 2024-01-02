/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

// Create a Cell component for rendering individual cells
const Cell = ({marker, onPress}) => (
  <Pressable activeOpacity={0.6} style={styles.all_cell} onPress={onPress}>
    {marker && (
      <Image
        source={
          marker === 'X'
            ? require('../assets/cross.png')
            : require('../assets/zero.png')
        }
        style={styles.playIcon}
      />
    )}
  </Pressable>
);

const PlayWithFriends = () => {
  const [activePlayer, setActivePlayer] = useState('X');
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [firstPlayerName, setFirstPlayerName] = useState('Player 1');
  const [secondPlayerName, setSecondPlayerName] = useState('Player 2');
  const [markers, setMarkers] = useState(Array(9).fill(null));

  const [gameStarted, setGameStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [winnerModalVisible, setWinnerModalVisible] = useState(false);
  const [winner, setWinner] = useState('');

  const [gameEnded, setGameEnded] = useState(false);
  const [winnerScoreUpdated, setWinnerScoreUpdated] = useState(false);

  const markPosition = position => {
    if (!markers[position]) {
      setMarkers(prevMarkers => {
        const updatedMarkers = [...prevMarkers];
        updatedMarkers[position] = activePlayer;
        return updatedMarkers;
      });
      setActivePlayer(prevActivePlayer =>
        prevActivePlayer === 'X' ? 'O' : 'X',
      );
    }
  };

  const resetMarkers = () => {
    setMarkers(Array(9).fill(null));
  };

  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    if (!gameStarted) {
      setModalVisible(true);
    } else {
      const winner = calculateWinner(markers);
      if (winner === 'X') {
        setWinner(winner);
        setWinnerModalVisible(true);
        setGameEnded(true);
      } else if (winner === 'O') {
        setWinner(winner);
        setWinnerModalVisible(true);
        setGameEnded(true);
      } else {
        const isBoardFull = markers.every(marker => marker !== null);
        if (isBoardFull) {
          setWinner(winner);
          setWinnerModalVisible(true);
          setGameEnded(true);
        }
      }
    }
  }, [markers, gameStarted]);

  useEffect(() => {
    if (gameEnded && !winnerScoreUpdated) {
      if (winner === 'X') {
        setFirstPlayerScore(prevScore => prevScore + 1);
      } else if (winner === 'O') {
        setSecondPlayerScore(prevScore => prevScore + 1);
      }
      setWinnerScoreUpdated(true);
    }
  }, [gameEnded, winner, winnerScoreUpdated]);

  const renderCells = () => {
    return markers.map((marker, index) => (
      <Cell key={index} marker={marker} onPress={() => markPosition(index)} />
    ));
  };

  const handleStartGame = () => {
    if (firstPlayerName && secondPlayerName) {
      setGameStarted(true);
      setModalVisible(false);
    }
  };

  const handleRestartGame = () => {
    setWinner('');
    resetMarkers();
    setWinnerModalVisible(false);
    setGameEnded(false);
    setWinnerScoreUpdated(false);
  };

  return (
    <View style={styles.container}>
      {/* PlayName Taken modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Player Names</Text>
            <TextInput
              style={styles.inputPlayerName1}
              placeholder="Player 1 Name"
              onChangeText={text => setFirstPlayerName(text)}
              value={firstPlayerName}
            />
            <TextInput
              style={styles.inputPlayerName2}
              placeholder="Player 2 Name"
              onChangeText={text => setSecondPlayerName(text)}
              value={secondPlayerName}
            />
            <Button
              title="Start Game"
              onPress={handleStartGame}
              color={'#e21e57'}
              style={styles.startGameButton}
            />
          </View>
        </View>
      </Modal>

      {/* winner delcare Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={winnerModalVisible}
        onRequestClose={() => setWinnerModalVisible(false)}>
        <View style={styles.winnerModalContainer}>
          <View style={styles.winnerModalContent}>
            <Text style={styles.winnerModalTitle}>
              {winner
                ? winner === 'X'
                  ? `${firstPlayerName} Won`
                  : `${secondPlayerName} Won`
                : "It's a draw!"}
            </Text>
            <Button
              title="Play Again"
              onPress={handleRestartGame}
              color="#e21e57"
              style={styles.playAgainButton}
            />
          </View>
        </View>
      </Modal>

      <ImageBackground
        source={require('../assets/play-background.jpg')}
        resizeMode="cover"
        style={styles.imgeBackground}>
        <View style={styles.playersContainer}>
          <View
            style={[
              styles.playerInfo,
              activePlayer === 'X' && styles.activePlayerStyle,
            ]}>
            <Image
              source={require('../assets/cross.png')}
              style={styles.playIcon}
            />
            <Text style={styles.playerName}>
              {
                firstPlayerName.length > 8
                  ? firstPlayerName.slice(0, 8) + '...' // If length > 8, truncate and add '...'
                  : firstPlayerName // If length <= 8, display the original name
              }
            </Text>
            <Text style={styles.playerScore}>{firstPlayerScore}</Text>
          </View>
          <View
            style={[
              styles.playerInfo,
              activePlayer === 'O' && styles.activePlayerStyle,
            ]}>
            <Image
              source={require('../assets/zero.png')}
              style={styles.playIcon}
            />
            <Text style={styles.playerName}>
              {secondPlayerName.length > 8
                ? secondPlayerName.slice(0, 8) + '...'
                : secondPlayerName}
            </Text>
            <Text style={styles.playerScore}>{secondPlayerScore}</Text>
          </View>
        </View>

        <View style={styles.mainContainer}>{renderCells()}</View>
        <TouchableOpacity onPress={resetMarkers} style={styles.buttonContainer}>
          <Text style={styles.button}>Restart</Text>
        </TouchableOpacity>
      </ImageBackground>
      {/* ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgeBackground: {
    flex: 1,
    filter: 'brightness(100px)',
  },
  playersContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  playIcon: {
    width: 50,
    height: 50,
    margin: 8,
  },
  playerInfo: {
    padding: 5,
    margin: 18,
    width: 140,
    display: 'flex',
    alignItems: 'center',
  },
  activePlayerStyle: {
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 10,
  },
  playerName: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  playerScore: {
    fontSize: 20,
    color: '#fff',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  all_cell: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 3,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
    backgroundColor: '#0080df',
    fontSize: 20,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#474745',
    paddingHorizontal: 45,
    paddingVertical: 30,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
  },
  inputPlayerName1: {
    borderBottomColor: '#0080df',
    borderBottomWidth: 3,
    padding: 3,
    marginBottom: 10,
    marginTop: 30,
  },
  inputPlayerName2: {
    borderBottomColor: '#e21e57',
    borderBottomWidth: 3,
    padding: 3,
    marginBottom: 50,
  },
  winnerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  winnerModalContent: {
    backgroundColor: '#474745',
    paddingHorizontal: 55,
    paddingVertical: 50,
    borderRadius: 15,
  },
  winnerModalTitle: {fontSize: 20, color: '#fff', marginBottom: 30},
});

export default PlayWithFriends;
