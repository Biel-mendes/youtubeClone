import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import { colors } from '../styles/Theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = async () => {
    try {
      const response = await api.post('/usuarios/login', { email, senha });
      const usuario = response.data.usuario;
      Alert.alert('Login realizado', `Bem-vindo, ${usuario.nome}`);
      navigation.navigate('VideoList', { usuario });
    } catch (error) {
      Alert.alert('Erro no login', error.response?.data?.erro || 'Erro desconhecido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.placeholder} onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={colors.placeholder} secureTextEntry onChangeText={setSenha} value={senha} />
      <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.link}>
        Não tem conta? <Text style={styles.linkTexto} onPress={() => navigation.navigate('Register')}>Cadastrar</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.fundo, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, color: colors.texto, textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: colors.inputBorder, padding: 10, color: colors.texto, borderRadius: 5, marginBottom: 15 },
  botao: { backgroundColor: colors.botao, padding: 12, borderRadius: 5, alignItems: 'center' },
  botaoTexto: { color: colors.botaoTexto, fontWeight: 'bold' },
  link: { marginTop: 20, color: colors.placeholder, textAlign: 'center' },
  linkTexto: { color: colors.botao },
});
