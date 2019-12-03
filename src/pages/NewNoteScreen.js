import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Picker,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
  Slider
} from 'react-native';

import FormRow from '../components/FormRow';
import { connect } from 'react-redux';
import { setField, saveNote, setAllFields, resetForm } from '../actions/NewNoteFormActions';

class NewNoteScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {

    const { navigation, setAllFields, resetForm } = this.props;
    const { params } = navigation.state;

    if (params && params.noteToEdit) {
      setAllFields(params.noteToEdit)
    } else {
      resetForm();
    }
  }

  render() {
    const { noteForm, setField, saveNote, navigation } = this.props;

    return (
      <ScrollView>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Título"
            value={noteForm.title}
            onChangeText={value => setField('title', value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Nome do politico para anotação"
            value={noteForm.name}
            onChangeText={value => setField('name', value)}
          />
        </FormRow>

        <FormRow>
          <View style={styles.rate}>
            <Text>Nota: </Text>
            <Text>{noteForm.rate}</Text>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={5}
            value={noteForm.rate}
            onValueChange={value => {
              setField('rate', value);
            }}
          />
        </FormRow>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Descrição"
            value={noteForm.description}
            onChangeText={value => setField('description', value)}
            numberOfLines={5}
            multiline={true}
          />
        </FormRow>

        {
          this.state.isLoading ?
            <ActivityIndicator />
            :
            <Button
              title="Salvar"
              onPress={async () => {
                this.setState({ isLoading: true })

                try {
                  await saveNote(noteForm);
                  navigation.goBack();
                } catch (error) {
                  Alert.alert('Erro', error.message);
                } finally {
                  this.setState({ isLoading: false })
                }

              }} />
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  rate: {
    flexDirection: 'row',
    paddingBottom: 15,
  }
});

const mapStateToProps = (state) => {
  return ({
    noteForm: state.noteForm
  })
}

const mapDispatchToProps = {
  setField,
  saveNote,
  setAllFields,
  resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteScreen);