
import { Login } from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AdminClient } from './AdminClient';
import { UpdateClient } from './UpdateClient';
import { CreateUser } from './CreateUser';
import { CreateClient } from './CreateClient';
import { ejemploTablas } from './ejemploTablas';

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="AdminClient" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="CreateClient" component={CreateClient} />
      <Stack.Screen name="AdminClient" component={AdminClient} />
      <Stack.Screen name="UpdateClient" component={UpdateClient} />
      <Stack.Screen name="ejemploTablas" component={ejemploTablas} />
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

