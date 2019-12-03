import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Button } from 'react-native';
import DeputadoCard from '../components/DeputadoCard';
import { connect } from 'react-redux'
import { watchDeputados } from '../actions'

class DeputadosPage extends React.Component {

  componentDidMount() {
    this.props.watchDeputados();
  }

  render() {

    if (this.props.deputados === null) {
      return (
        <View>
          <ActivityIndicator />
          <Button
            title="Adicionar"
            color="#000000"
            onPress={() => this.props.navigation.navigate('NewDeputadoScreen')}
          />
        </View>
      );
    }

    return (
      <View>

        <FlatList
          data={[...this.props.deputados, { isLast: true }]}
          renderItem={({ item, index }) => {
            return (
              item.isLast ?

                <View style={styles.container}>
                  <View style={styles.containerUm}>
                    <View style={styles.margem}>
                      <Button
                        title="Anotações"
                        color="#000000"
                        onPress={() => this.props.navigation.navigate('Note')} />
                    </View>
                    <Button
                      title="Adicionar"
                      style={styles.botao}
                      color="#000000"
                      onPress={() => this.props.navigation.navigate('NewDeputadoScreen')}
                    />
                  </View>

                </View>
                :
                <View style={styles.container}>
                  <DeputadoCard
                    style={styles.cards}
                    deputado={item}
                    //isLeft={isLeft(index)}
                    onNavigate={() => this.props.navigation.navigate('DeputadoDetail', { deputado: item })}
                  />
                </View>
            );
          }}
          keyExtractor={item => item.id}
          numColumns={1}
        />
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
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
  const { listaDeputados } = state;

  if (listaDeputados == null) {
    return { deputados: listaDeputados }
  }

  const keys = Object.keys(listaDeputados);
  const listaDeputadosWithId = keys.map(key => {
    return { ...listaDeputados[key], id: key }
  })
  return { deputados: listaDeputadosWithId };
}

export default connect(mapStateToProps, { watchDeputados })(DeputadosPage);