import * as React from 'react';
import { StackScreenFactory } from './utils/navigation';
import Identity from './screens/Identity';
import OrderStatus from './screens/OrderStatus';
import CustomerType from './screens/CustomerType';
import IndustryCity from './screens/IndustryCity';
import Marketing from './screens/Marketing';
import QueueCode from './screens/QueueCode';
import PrintConfig from './screens/PrintConfig';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import CreateCustomer from './screens/CreateCustomer';
import UpdateWarning from './screens/UpdateWarning';

export const CustomerStack = StackScreenFactory([
  { name: 'Identity', component: Identity },
  { name: 'OrderStatus', component: OrderStatus },
  { name: 'CustomerType', component: CustomerType },
  { name: 'IndustryCity', component: IndustryCity },
  { name: 'Marketing', component: Marketing },
  { name: 'QueueCode', component: QueueCode },
  { name: 'PrintConfig', component: PrintConfig },
  { name: 'CreateCusomter', component: CreateCustomer },
  { name: 'UpdateWarning', component: UpdateWarning }
]);

const Stack = createStackNavigator();

export const Root = () => {
  const { token } = useSelector(state => state.auth);

  return token ? (
    <CustomerStack />
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) 
};
