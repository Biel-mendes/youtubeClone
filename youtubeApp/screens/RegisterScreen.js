import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';
import { colors } from '../styles/Theme';

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

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.placeholder} value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor={colors.placeholder} value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={colors.placeholder} secureTextEntry value={senha} onChangeText={setSenha} />


      <TextInput
        placeholder="CEP"
        placeholderTextColor={colors.placeholder}
        style={styles.input}
        onChangeText={setCep}
        value={cep}
        onBlur={buscarCep}
      />

      <TextInput placeholder="Endereço" style={styles.input} placeholderTextColor={colors.placeholder} onChangeText={setEndereco} value={endereco} />
      <TextInput placeholder="Complemento" style={styles.input} placeholderTextColor={colors.placeholder} onChangeText={setComplemento} value={complemento} />
      <TextInput placeholder="Número" style={styles.input} placeholderTextColor={colors.placeholder} onChangeText={setNumero} value={numero} />
      <TextInput placeholder="Cidade" style={styles.input} placeholderTextColor={colors.placeholder} onChangeText={setCidade} value={cidade} />
      <TextInput placeholder="UF" style={styles.input} placeholderTextColor={colors.placeholder} onChangeText={setUf} value={uf} />

      <TouchableOpacity style={styles.botao} onPress={escolherAvatar}>
        <Text style={styles.botaoTexto}>Escolher avatar</Text>
      </TouchableOpacity>
      {avatarUrl && <Image source={{ uri: avatarUrl }} style={styles.avatar} />}

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: colors.fundo, height: '100%' },
  title: { fontSize: 28, textAlign: 'center', color: colors.texto, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 5,
    padding: 10,
    color: colors.texto,
    marginBottom: 10,
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
});