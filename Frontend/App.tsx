import Layout from 'Layouts/Layout';
import './global.css';
import { View, Text } from 'react-native';

export default function App() {
  return (
    // <FitnessItems.Provider>
    <Layout>
      <View>
        <Text className='text-3xl'>Open up App.tsx to start working on your app!</Text>
      </View>
    </Layout>
    // </FitnessItems.Provider>
  );
}
