import { StyleSheet, Text, View, Platform, Button, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TheColor } from './constant/TheColor';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//redux
import { Provider, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { store } from './store/redux/store';
import { logout } from './store/redux/auth';

//screens import
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
//user screen
import UserHome from './screens/user/UserHome';
import AllQuiz from './screens/user/AllQuiz';
import FavouritesQuiz from './screens/user/FavouritesQuiz';
import MyQuiz from './screens/user/MyQuiz';
import QuizPage from './screens/user/QuizPage';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="log in" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function BottomTabsNavigator() {
  const dispatch = useDispatch();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: TheColor.primary100 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: 'white' },
        tabBarActiveTintColor: TheColor.primary100,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerRight: () => (
          // may move logout button to other place
          <Pressable onPress={() => dispatch(logout())} style={{ paddingHorizontal: 14 }}>
            <Ionicons name="log-out-outline" size={22} color="white" />
          </Pressable>
        ),
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

function AppStack() {
  return (
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
  );
}

function RootNavigator() {
  const isLogin = !!useSelector((state) => state.auth?.token);
  return isLogin ? <AppStack /> : <AuthStack />;
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
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
