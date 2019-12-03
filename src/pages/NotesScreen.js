import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import NoteCard from '../components/NoteCard';
import AddCard from '../components/AddCard.js';
import { connect } from 'react-redux';
import { watchNotes } from '../actions';

const isLeft = number => number % 2 === 0;

class NotesPage extends React.Component {
  componentDidMount() {
    this.props.watchNotes();
  }

  render() {
    if (this.props.notes === null) {
      return (
        <View>
          <ActivityIndicator />
          <AddCard
            onNavigate={() => this.props.navigation.navigate('NewNoteScreen')}
          />
        </View>
      );
    }

    return (
      <View>

        <FlatList
          data={[...this.props.notes, { isLast: true }]}
          renderItem={({ item, index }) => {
            return (
              item.isLast ?

                <View style={styles.container}>
                  <Button
                    title="Adicionar"
                    style={styles.botao}
                    color="#000000"
                    onPress={() => this.props.navigation.navigate('NewNoteScreen')}
                  />
                </View>
                :
                <View style={styles.container}>
                  <NoteCard
                    style={styles.cards}
                    note={item}
                    //isLeft={isLeft(index)}
                    onNavigate={() => this.props.navigation.navigate('NoteDetailScreen', { note: item })}
                  />
                </View>
            );
          }}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  containerUm: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  cards: {
    justifyContent: 'center',
    elevation: 1,
    borderBottomWidth: 10,
  },
  botao: {
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  margem: {
    marginRight: 10
  }
})

const mapStateToProps = state => {
  const { listaNotes } = state;

  if (listaNotes === null) {
    return { notes: listaNotes };
  }

  const keys = Object.keys(listaNotes);
  const listaNotesWithId = keys.map(key => {
    return { ...listaNotes[key], id: key }
  })
  return { notes: listaNotesWithId };
}


export default connect(
  mapStateToProps,
  { watchNotes }
)(NotesPage);