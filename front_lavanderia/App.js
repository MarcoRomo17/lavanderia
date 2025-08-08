
import { Login } from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AdminClient } from './Clients/AdminClient';
import { UpdateClient } from './Clients/UpdateClient';
import { CreateUser } from './Users/CreateUser';
import { CreateClient } from './Clients/CreateClient';
import { AuxView } from './AuxView';
import { CreateOrder } from './Orders/CreateOrder';
import { CheckOut } from './Orders/CheckOut';
import { CreateGarment } from './Garments/CreateGarment';
import { AdminGarment } from './Garments/AdminGarment';
import { UpdateGarment } from './Garments/UpdateGarment';
import { CreateService } from './Service/CreateService';
import { AdminService } from './Service/AdminService';
import { UpdateService } from './Service/UpdateService';
import { Allorders } from './Orders/AllOrders';
import { PendingOrders } from './Orders/PendingOrders';
import Dashboard from './Dashboard';
import { OrderDetail } from './Orders/OrderDetail';
import { AdminUsers } from './Users/AdminUsers';
import { UpdateUsers } from './Users/UpdateUsers';


const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="CreateClient" component={CreateClient} />
      <Stack.Screen name="AdminClient" component={AdminClient} />
      <Stack.Screen name="UpdateClient" component={UpdateClient} />
      <Stack.Screen name="AuxView" component={AuxView} />
      <Stack.Screen name="CreateOrder" component={CreateOrder} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="CreateGarment" component={CreateGarment} />
      <Stack.Screen name="AdminGarment" component={AdminGarment} />
      <Stack.Screen name="UpdateGarment" component={UpdateGarment} />
      <Stack.Screen name="CreateService" component={CreateService} /> 
      <Stack.Screen name="AdminService" component={AdminService} /> 
      <Stack.Screen name="UpdateService" component={UpdateService} /> 
      <Stack.Screen name="Allorders" component={Allorders} />
      <Stack.Screen name="PendingOrders" component={PendingOrders} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />

            <Stack.Screen name="AdminUsers" component={AdminUsers} /> 
      <Stack.Screen name="UpdateUsers" component={UpdateUsers} /> 
     


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

