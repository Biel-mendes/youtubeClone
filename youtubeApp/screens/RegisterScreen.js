import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  const buscarCep = async () => {
    if (!cep) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) throw new Error();
      setEndereco(data.logradouro);
      setCidade(data.localidade);
      setUf(data.uf);
    } catch {
      Alert.alert('Erro', 'CEP inválido.');
    }
  };

  const escolherAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatarUrl(result.assets[0].uri);
    }
  };

  const cadastrar = async () => {
    if (!nome || !email || !senha || !cep || !endereco || !cidade || !uf) {
      return Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
    }

    try {
      await api.post('/usuarios', {
        nome,
        email,
        senha,
        cep,
        endereco,
        complemento,
        numero,
        cidade,
        uf,
        avatar_url: avatarUrl,
      });

      Alert.alert('Sucesso', 'Usuário cadastrado!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput placeholder="Nome" style={styles.input} onChangeText={setNome} value={nome} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} value={senha} />

      <TextInput
        placeholder="CEP"
        style={styles.input}
        onChangeText={setCep}
        value={cep}
        onBlur={buscarCep}
      />

      <TextInput placeholder="Endereço" style={styles.input} onChangeText={setEndereco} value={endereco} />
      <TextInput placeholder="Complemento" style={styles.input} onChangeText={setComplemento} value={complemento} />
      <TextInput placeholder="Número" style={styles.input} onChangeText={setNumero} value={numero} />
      <TextInput placeholder="Cidade" style={styles.input} onChangeText={setCidade} value={cidade} />
      <TextInput placeholder="UF" style={styles.input} onChangeText={setUf} value={uf} />

      <Button title="Escolher avatar" onPress={escolherAvatar} />
      {avatarUrl && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}

      <Button title="Cadastrar" onPress={cadastrar} color="#28a745" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignSelf: 'center', marginTop: 10 },
});
