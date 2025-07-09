/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './PlayWithFriends';
import {TestIds, useInterstitialAd} from '@react-native-admob/admob';
import LottieView from 'lottie-react-native';

const Cell = ({marker, onPress}) => (
  <Pressable style={styles.all_cell} onPress={onPress}>
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

const PlayWithComputer = () => {
  const [activePlayer, setActivePlayer] = useState('X');
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [firstPlayerName, setFirstPlayerName] = useState('You');
  const [secondPlayerName, setSecondPlayerName] = useState('AI');
  const [markers, setMarkers] = useState(Array(9).fill(null));
  const [gameCounter, setGameCounter] = useState(0);

  const [gameStarted, setGameStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [winnerModalVisible, setWinnerModalVisible] = useState(false);
  const [winner, setWinner] = useState('');

  const [gameEnded, setGameEnded] = useState(false);
  const [winnerScoreUpdated, setWinnerScoreUpdated] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);

  // Video Ads
  const interstitalAdID = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-8287135114525889/6995580074';

  const {adLoaded, show, load} = useInterstitialAd(interstitalAdID);

  useEffect(() => {
    // Load the ad initially
    load();
  }, [load]);

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

  const findBestMove = (newMarkers, player) => {
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

    // Check if the AI can win in the next move
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        newMarkers[a] === player &&
        newMarkers[a] === newMarkers[b] &&
        !newMarkers[c]
      )
        return c;
      if (
        newMarkers[a] === player &&
        newMarkers[a] === newMarkers[c] &&
        !newMarkers[b]
      )
        return b;
      if (
        newMarkers[b] === player &&
        newMarkers[b] === newMarkers[c] &&
        !newMarkers[a]
      )
        return a;
    }

    // Check if the player could win on their next move, and block them
    const opponent = player === 'O' ? 'X' : 'O';
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        newMarkers[a] === opponent &&
        newMarkers[a] === newMarkers[b] &&
        !newMarkers[c]
      )
        return c;
      if (
        newMarkers[a] === opponent &&
        newMarkers[a] === newMarkers[c] &&
        !newMarkers[b]
      )
        return b;
      if (
        newMarkers[b] === opponent &&
        newMarkers[b] === newMarkers[c] &&
        !newMarkers[a]
      )
        return a;
    }

    // Otherwise, pick a random available cell
    const emptyCells = newMarkers.reduce((acc, marker, index) => {
      if (!marker) {
        acc.push(index);
      }
      return acc;
    }, []);

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const makeComputerMove = () => {
    if (!gameEnded && isSinglePlayer && activePlayer === 'O') {
      const bestMove = findBestMove(markers, 'O');
      setTimeout(() => {
        markPosition(bestMove);
      }, 0.1);
    }
  };


  //For Easy level 👇👇
  // const makeComputerMove = () => {
  //   if (!gameEnded && isSinglePlayer && activePlayer === 'O') {
  //     const emptyCells = markers.reduce((acc, marker, index) => {
  //       if (!marker) {
  //         acc.push(index);
  //       }
  //       return acc;
  //     }, []);

  //     const randomIndex = Math.floor(Math.random() * emptyCells.length);
  //     const computerMove = emptyCells[randomIndex];

  //     setTimeout(() => {
  //       markPosition(computerMove);
  //     }, 0.1);
  //   }
  // };

  useEffect(() => {
    makeComputerMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlayer]);

  useEffect(() => {
    if (!gameStarted) {
      setModalVisible(true);
    } else {
      const winner = calculateWinner(markers);
      if (winner === 'X' || winner === 'O') {
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
      } else if (winner === 'O' && isSinglePlayer) {
        setSecondPlayerScore(prevScore => prevScore + 1);
      }
      setWinnerScoreUpdated(true);
    }
  }, [gameEnded, winner, winnerScoreUpdated, isSinglePlayer]);

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
    handleGameCounter();
  };

  const renderCells = () => {
    return markers.map((marker, index) => (
      <Cell key={index} marker={marker} onPress={() => markPosition(index)} />
    ));
  };

  //For Video Ads
  useEffect(() => {
    if (gameCounter > 0 && gameCounter % 5 === 0) {
      if (adLoaded) {
        show();
      } else {
        load(); // Ensure the ad is loaded
      }
    }
  }, [gameCounter, adLoaded, show, load]);

  const handleGameCounter = () => {
    setGameCounter(gameCounter + 1);
    if ((gameCounter + 1) % 5 === 0) {
      load(); // Load the next ad after showing the current one
    }
  };
  return (
    <View style={styles.container}>
      {/* Take User Name  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Your Name</Text>
            <TextInput
              style={styles.inputPlayerName1}
              placeholder="Your Name"
              onChangeText={text => setFirstPlayerName(text)}
              value={firstPlayerName}
            />
            <Button
              title="Start Game"
              onPress={handleStartGame}
              color={'#0080df'}
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
          {winnerModalVisible && (winner === 'X' || winner === 'O') && (
            <View
              style={{
                width: 300,
                height: 300,
                position: 'absolute',
                bottom: '40%',
              }}>
              <LottieView
                source={require('../assets/confetti.json')}
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
          )}
          <View style={styles.winnerModalContent}>
            <Text style={styles.winnerModalTitle}>
              {winner === 'X' && `${firstPlayerName} Won`}
              {winner === 'O' && `${secondPlayerName} Won`}
              {winner === null && "It's a draw"}
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
        source={require('../assets/a.webp')}
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
              {firstPlayerName.length > 8
                ? firstPlayerName.slice(0, 8) + '...'
                : firstPlayerName}
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
            <Text style={styles.playerName}>{secondPlayerName}</Text>
            <Text style={styles.playerScore}>{secondPlayerScore}</Text>
          </View>
        </View>

        <View style={styles.mainContainer}>{renderCells()}</View>
        <TouchableOpacity onPress={resetMarkers} style={styles.buttonContainer}>
          <Text style={styles.button}>Restart</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default PlayWithComputer;
