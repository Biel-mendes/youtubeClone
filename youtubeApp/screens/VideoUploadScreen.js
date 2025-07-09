import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { colors } from '../styles/Theme';

export default function VideoUploadScreen() {
  const route = useRoute();
  const navigation = useNavigation();


  const usuario = route.params && route.params.usuario ? route.params.usuario : null;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);

  const escolherVideo = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setVideoUrl(resultado.assets[0].uri);
    }
  };

  const enviarVideo = async () => {
    if (!titulo || !videoUrl || !usuario?.id) {
      return Alert.alert('Erro', 'Preencha todos os campos e verifique se o usuário está logado.');
    }

    try {
      await api.post('/videos', {
        usuario_id: usuario.id,
        titulo,
        descricao,
        video_url: videoUrl,
      });

      Alert.alert('Sucesso', 'Vídeo enviado com sucesso!');
      navigation.navigate('VideoList', { usuario });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao enviar vídeo');
    }
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>⚠️ Usuário não identificado.</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <TouchableOpacity style={styles.botao} onPress={escolherVideo}>
              <Text style={styles.botaoTexto}>Escolher vídeo</Text>
        </TouchableOpacity>

      {videoUrl && <Text style={styles.preview}>🎥 Vídeo selecionado</Text>}

      <TouchableOpacity style={styles.botao} onPress={enviarVideo}>
              <Text style={styles.botaoTexto}>Enviar vídeo</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: colors.fundo },
  label: { marginTop: 10, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom:10, color: colors.texto, },
  preview: { marginVertical: 10, color: 'green', fontWeight: 'bold' },
  erro: { color: 'red', fontSize: 16, marginBottom: 20, textAlign: 'center' },
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
