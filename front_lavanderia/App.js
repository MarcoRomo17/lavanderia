
import { Login } from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateUser } from './CreateUser';
import { CreateClient } from './CreateClient';
import { AdminClient } from './AdminClient';
import { UpdateClient } from './UpdateClient';

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="CreateClient" component={CreateClient} />
      <Stack.Screen name="AdminClient" component={AdminClient} />
      <Stack.Screen name="UpdateClient" component={UpdateClient} />

 
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

