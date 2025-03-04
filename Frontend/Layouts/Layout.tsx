import React from 'react';
import { StyleSheet } from 'react-native';
import '../global.css';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});