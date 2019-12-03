import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from './pages/LoginScreen';
import DeputadosScreen from './pages/DeputadosScreen';
import DeputadoDetailScreen from './pages/DeputadoDetailScreen';
import NewDeputadoScreen from './pages/NewDeputadoScreen';
import NoteDetailScreen from './pages/NoteDetailScreen';
import NotesScreen from './pages/NotesScreen';
import NewNoteScreen from './pages/NewNoteScreen'

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },

  'Main': {
    screen: DeputadosScreen
  },

  'DeputadoDetail': {
    screen: DeputadoDetailScreen,
    navigationOptions: ({ navigation }) => {
      const { deputado } = navigation.state.params;
      return {
        title: deputado.name
      }
    }
  },
  'NewDeputadoScreen': {
    screen: NewDeputadoScreen,
    navigationOptions: ({ navigation }) => {
      if (navigation.state.params && navigation.state.params.deputadoToEdit) {
        return {
          title: navigation.state.params.deputadoToEdit.title
        }
      }
      return {
        title: 'Novo Deputado'
      }
    }
  },
  'Note': {
    screen: NotesScreen,
    navigationOptions: {
      title: 'Anotações',
    }
  },
  'NoteDetailScreen': {
    screen: NoteDetailScreen,
    navigationOptions: ({ navigation }) => {
      const { note } = navigation.state.params;
      return {
        title: note.title
      }
    }
  },

  'NewNoteScreen': {
    screen: NewNoteScreen,
    navigationOptions: ({ navigation }) => {
      if (navigation.state.params && navigation.state.params.noteToEdit) {
        return {
          title: navigation.state.params.noteToEdit.title
        }
      }
      return {
        title: 'Nova Anotação'
      }
    }
  },


},


  {
    defaultNavigationOptions: {
      title: "Deputados",
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: "#white",
        borderBottomWidth: 1,
        borderBottomColor: '#C5C5C5',
      },
      headerTitleStyle: {
        color: 'black',
        fontSize: 28,
      }
    },
  });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;