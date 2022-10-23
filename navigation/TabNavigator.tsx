import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomersScreen from '../screens/CustomersScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Icon } from '@rneui/themed';

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tabs = createBottomTabNavigator<TabStackParamList>();

function TabNavigator(): JSX.Element {
  const navigation = useNavigation();
  const tw = useTailwind();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor:
          route.name === 'Customers' ? '#59C1CC' : '#EB6A7C',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Customers') {
            return (
              <Icon
                name='users'
                type='entypo'
                color={focused ? '#59C1CC' : 'gray'}
              />
            );
          } else if (route.name === 'Orders') {
            return (
              <Icon
                name='box'
                type='entypo'
                color={focused ? '#EB6A7C' : 'gray'}
              />
            );
          }
        }
      })}
    >
      <Tabs.Screen name='Customers' component={CustomersScreen} />
      <Tabs.Screen name='Orders' component={OrdersScreen} />
    </Tabs.Navigator>
  );
}

export default TabNavigator;
