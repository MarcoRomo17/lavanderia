
import { Login } from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateUser } from './CreateUser';

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="CreateUser" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
 
    </Stack.Navigator>
  );
}

export default function App() {
  return (
     <NavigationContainer>
      <RootStack></RootStack>
     </NavigationContainer>
  );
}

