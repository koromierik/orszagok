import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [orszagok, setOrszagok] = useState([]);

  useEffect(() => {
    const orszagokJsonPath = FileSystem.documentDirectory + 'orszagok.json';

    const readOrszagokFile = async () => {
      try {
        const fileContent = await FileSystem.readAsStringAsync(orszagokJsonPath);
        const parsedOrszagok = JSON.parse(fileContent);
        setOrszagok(parsedOrszagok.orszagok);
      } catch (error) {
        console.error('Hiba történt az országok JSON fájl olvasása közben:', error);
      }
    };

    readOrszagokFile();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Országok:</Text>
      <View>
        {orszagok.map((orszag, index) => (
          <View key={index} style={{ borderWidth: 1, borderColor: 'black', padding: 10, margin: 5 }}>
            <Text>Név: {orszag.nev}</Text>
            <Text>Terület: {orszag.terulet}</Text>
            <Text>Népesség: {orszag.nepesseg}</Text>
            <Text>Főváros: {orszag.fovaros}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}