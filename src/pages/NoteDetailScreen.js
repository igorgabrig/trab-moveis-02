import React from 'react';
import { 
  ScrollView,
  Image, 
  StyleSheet,
  Button,
  View
} from 'react-native';
import Line from '../components/Line';
import LongText from '../components/LongText';

import {connect} from 'react-redux';
import {deleteNote} from '../actions';

class NoteDetailScreen extends React.Component {
  render() {
    const { note } = this.props.navigation.state.params;
    return(
      <ScrollView>
       
        <Line label="Título" content={note.title} />
        <Line label="Nome" content={note.name} />
        <Line label="Nota" content={note.rate}/>
        <LongText label="Descrição" content={note.description} />
        <View style={styles.button}>
          <Button 
            title="Editar"
            onPress={() => {
              this.props.navigation.replace('NewNoteScreen', {noteToEdit: note});
            }}
            />
        </View>

        <View style={styles.button}>
          <Button 
            title="Excluir"
            color="#FF0004"
            onPress={ async () => {
              const hasDeleted = await this.props.deleteNote(note)

              if(hasDeleted) {
                this.props.navigation.goBack();
              }
            }}
            />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2,
  },
  button: {
    margin: 10
  }
});

export default connect(null, {deleteNote} )(NoteDetailScreen);