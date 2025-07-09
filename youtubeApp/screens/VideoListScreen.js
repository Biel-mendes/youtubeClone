import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import api from '../services/api';
import { useRoute } from '@react-navigation/native';
import { colors } from '../styles/Theme';

export default function VideoListScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const route = useRoute();
  const usuario = route.params?.usuario;

  useEffect(() => {
    carregarVideos();
  }, []);

  const carregarVideos = async () => {
    try {
      const response = await api.get('/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
    } finally {
      setCarregando(false);
    }
  };

  const renderItem = ({ item }) => (
    <View>
    

    <TouchableOpacity style={styles.card}
    onPress={() => navigation.navigate('VideoDetail', { video: item, usuario })}>
      <View style={styles.header}>
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        <Text style={styles.autor}>{item.autor}</Text>
      </View>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
    </TouchableOpacity>
    </View>
  );

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#555" />
        <Text>Carregando vídeos...</Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: colors.fundo, height: '100%', justifyContent: 'center', paddingBottom: 60}}> 
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />

    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Upload', { usuario })}>
            <Text style={styles.botaoTexto}>Enviar vídeo</Text>
    </TouchableOpacity>

    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 100,
    backgroundColor: colors.fundo,
    borderColor: '#ffff'
  },
  loadingContainer: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.fundo ,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20, marginRight: 10,
  },
  autor: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.texto
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.texto
  },
  descricao: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
    color: colors.texto
  },
  botao: {
    backgroundColor: colors.botao,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: colors.botaoTexto,
    fontWeight: 'bold',
  },
});
