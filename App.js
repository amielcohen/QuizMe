import { StyleSheet, Text, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TheColor } from './constant/TheColor';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//screens import
//import CategoryScreen from './screens/CategoryScreen';
//import MealsOverViewScreen from './screens/MealsOverVIewScreen';
//import MealPage from './screens/MealPage';
import UserHome from './screens/user/UserHome';
import AllQuiz from './screens/user/AllQuiz';
import FavouritesQuiz from './screens/user/FavouritesQuiz';
import MyQuiz from './screens/user/MyQuiz';
import QuizPage from './screens/user/QuizPage';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: TheColor.primary100 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: 'white' },
        tabBarActiveTintColor: TheColor.primary100,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={UserHome}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name="All Quiz"
        component={AllQuiz}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name="Favourites Quiz"
        component={FavouritesQuiz}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name="My Quiz"
        component={MyQuiz}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: TheColor.primary100 },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="BottomTabsNavigator"
            component={BottomTabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Quiz Page" component={QuizPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
