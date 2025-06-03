import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RegistrarCliente({ route }) {
  const { guardarNuevo, clienteExistente, idCliente } = route.params;
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (clienteExistente) {
      setModoEdicion(true);
      setCedula(clienteExistente.nuevacedula);
      setNombres(clienteExistente.nuevosnombres);
      setApellidos(clienteExistente.nuevosapellidos);
      setFechaNacimiento(clienteExistente.nuevafechanac);
      setSexo(clienteExistente.nuevosexo);
    }
  }, [clienteExistente]);

  const Guardar = () => {
    if (!cedula || !nombres) {
      Alert.alert('Faltan datos', 'Por favor, complete al menos la cédula y nombres');
      return;
    }

    const nuevoCliente = {
      nuevacedula: cedula,
      nuevosnombres: nombres,
      nuevosapellidos: apellidos,
      nuevafechanac: fechaNacimiento,
      nuevosexo: sexo,
    };

    guardarNuevo(nuevoCliente, modoEdicion ? idCliente : null);
    Alert.alert(modoEdicion ? 'Cliente actualizado' : 'Cliente guardado');
    navigation.goBack();
  };

// Validaciones automáticas para cédula y fecha
const formatearCedula = (texto) => {
  // Separar números del texto final (letras)
  const match = texto.match(/^([0-9]*)([A-Za-z]*)$/);
  let numeros = texto.replace(/[^0-9]/g, '').slice(0, 13); // solo los primeros 13 dígitos
  let letras = texto.replace(/[^A-Za-z]/g, ''); // letras al final

  // Formateo con guiones: 000-000000-0000
  if (numeros.length > 3 && numeros.length <= 9) {
    numeros = numeros.slice(0, 3) + '-' + numeros.slice(3);
  }
  if (numeros.length > 9) {
    numeros = numeros.slice(0, 3) + '-' + numeros.slice(3, 9) + '-' + numeros.slice(9);
  }

  return (numeros + letras).slice(0, 25); // permite cédulas como 365-130995-0002H o ...Nicaragua
};

const formatearFecha = (texto) => {
  let soloNumeros = texto.replace(/[^0-9]/g, '');
  if (soloNumeros.length > 4 && soloNumeros.length <= 6) {
    soloNumeros = soloNumeros.slice(0, 4) + '-' + soloNumeros.slice(4);
  }
  if (soloNumeros.length > 6) {
    soloNumeros = soloNumeros.slice(0, 4) + '-' + soloNumeros.slice(4, 6) + '-' + soloNumeros.slice(6, 8);
  }
  return soloNumeros.slice(0, 10);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{modoEdicion ? 'Editar Cliente' : 'Registrar Cliente'}</Text>

      <Text style={styles.label}>Cédula:</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="id-card" size={20} color="green" />
        <TextInput
          style={styles.input}
          value={cedula}
          placeholder="000-000000-0000"
          onChangeText={(texto) => setCedula(formatearCedula(texto))}
          //editable={!modoEdicion}
        />
      </View>

      <Text style={styles.label}>Nombres:</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="green" />
        <TextInput style={styles.input} value={nombres} onChangeText={setNombres} />
      </View>

      <Text style={styles.label}>Apellidos:</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="people-outline" size={20} color="green" />
        <TextInput style={styles.input} value={apellidos} onChangeText={setApellidos} />
      </View>

      <Text style={styles.label}>Fecha de nacimiento:</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="calendar-today" size={20} color="green" />
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={fechaNacimiento}
          onChangeText={(texto) => setFechaNacimiento(formatearFecha(texto))}
           keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.genderContainer}>
        {['Masculino', 'Femenino'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.genderButton, sexo === option && styles.genderSelected]}
            onPress={() => setSexo(option)}
          >
            <Ionicons
              name={option === 'Masculino' ? 'male' : 'female'}
              size={20}
              color={sexo === option ? '#fff' : 'green'}
            />
            <Text style={[styles.genderText, sexo === option && styles.genderTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={Guardar}>
        <FontAwesome name="save" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>{modoEdicion ? 'Actualizar' : 'Guardar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#d0e8f2', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: { flex: 1, height: 40, marginLeft: 10 },
  genderContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  genderButton: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#4caf50',
    borderRadius: 20,
    padding: 10,
  },
  genderSelected: { backgroundColor: '#4caf50' },
  genderText: { marginLeft: 8, fontWeight: '600', color: '#4caf50' },
  genderTextSelected: { color: '#fff' },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#4caf50',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 18, marginLeft: 10 },
});
