
import { Login } from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AdminClient } from './AdminClient';
import { UpdateClient } from './UpdateClient';
import { CreateUser } from './CreateUser';
import { CreateClient } from './CreateClient';
import { ejemploTablas } from './ejemploTablas';
import { AuxView } from './AuxView';
import { CreateOrder } from './CreateOrder';
import { CheckOut } from './CheckOut';
import { CreateGarment } from './CreateGarment';
import { AdminGarment } from './AdminGarment';
import { UpdateGarment } from './UpdateGarment';
import { CreateService } from './CreateService';
import { AdminService } from './AdminService';
import { UpdateService } from './UpdateService';

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="AuxView" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="CreateClient" component={CreateClient} />
      <Stack.Screen name="AdminClient" component={AdminClient} />
      <Stack.Screen name="UpdateClient" component={UpdateClient} />
      <Stack.Screen name="ejemploTablas" component={ejemploTablas} />
      <Stack.Screen name="AuxView" component={AuxView} />
      <Stack.Screen name="CreateOrder" component={CreateOrder} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="CreateGarment" component={CreateGarment} />
      <Stack.Screen name="AdminGarment" component={AdminGarment} />
      <Stack.Screen name="UpdateGarment" component={UpdateGarment} />
      <Stack.Screen name="CreateService" component={CreateService} /> 
      <Stack.Screen name="AdminService" component={AdminService} /> 
      <Stack.Screen name="UpdateService" component={UpdateService} /> 


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

