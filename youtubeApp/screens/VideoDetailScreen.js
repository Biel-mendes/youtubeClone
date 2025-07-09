import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';
import { Video } from 'expo-av';
import { colors } from '../styles/Theme';


export default function VideoDetailScreen() {
  const route = useRoute();
  const { video, usuario } = route.params;

  const [comentarios, setComentarios] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    buscarComentarios();
  }, []);

  const buscarComentarios = async () => {
    try {
      const response = await api.get(`/comentarios/${video.id}`);
      setComentarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const enviarComentario = async () => {
    if (!mensagem.trim()) return;

    try {
      await api.post('/comentarios', {
        video_id: video.id,
        usuario_id: usuario.id,
        mensagem,
      });
      setMensagem('');
      buscarComentarios();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o comentário.');
    }
  };

  const curtir = async () => {
    try {
      const res = await api.post('/curtidas', {
        video_id: video.id,
        usuario_id: usuario.id,
      });
      Alert.alert('👍', res.data.mensagem);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao curtir vídeo.');
    }
  };

  const renderComentario = ({ item }) => (
    <View style={styles.comentario}>
      <Image source={{ uri: item.avatar_url }} style={styles.avatarComentario} />
      <View>
        <Text style={styles.autorComentario}>{item.autor}</Text>
        <Text styles={{color: "#fff"}}>{item.mensagem}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: video.avatar_url }} style={styles.avatar} />
          <Text style={styles.autor}>{video.autor}</Text>
        </View>
        <Video
          source={{ uri: video.video_url }}
          style={{ width: '100%', height: 200, marginVertical: 10 }}
          useNativeControls
          resizeMode="contain"
        />
        <Text style={styles.titulo}>{video.titulo}</Text>
        <Text style={styles.descricao}>{video.descricao}</Text>

        <TouchableOpacity style={styles.curtirBotao} onPress={curtir}>
          <Text style={styles.curtirTexto}>❤️ Curtir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.comentariosContainer}>
        <Text style={styles.comentariosTitulo}>Comentários</Text>
        <FlatList
          data={comentarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderComentario}
        />

        <TextInput
          placeholder="Escreva um comentário..."
          style={styles.input}
          placeholderTextColor={colors.placeholder}
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity style={styles.botao} onPress={enviarComentario}>
                      <Text style={styles.botaoTexto}>Enviar comentário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.fundo },
  card: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 16, marginBottom: 16, backgroundColor: colors.fundo },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  autor: { fontWeight: 'bold', fontSize: 16, color:'#ffff'  },
  titulo: { fontSize: 20, fontWeight: 'bold', marginTop: 5, color:'#ffff' },
  descricao: { fontSize: 16, color: '#555', marginBottom: 10,color:'#ffff'  },
  curtirBotao: { alignItems: 'center', marginTop: 10 },
  curtirTexto: { color: 'red', fontWeight: 'bold', fontSize: 16 },
  comentariosContainer: { flex: 1, color:'#ffff' },
  comentariosTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color:'#ffff'  },
  comentario: { flexDirection: 'row', marginBottom: 10, alignItems: 'center', color:'#ffff'  },
  avatarComentario: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  autorComentario: { fontWeight: 'bold', color:'#ffff'  },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 10, borderRadius: 5, color: colors.placeholder},
    botao: {
    backgroundColor: colors.botao,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 35
  },
  botaoTexto: {
    color: colors.botaoTexto,
    fontWeight: 'bold',
  },
  comentarioText:{color: "#fffff"}
});
