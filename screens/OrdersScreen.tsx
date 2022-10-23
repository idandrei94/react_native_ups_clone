import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation
} from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigation/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn/dist';
import useOrders from '../hooks/useOrders';
import { Button, Image } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const tailwind = useTailwind();

  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? '#EB6A7C' : 'gray', fontSize: 10 }}>
          Orders
        </Text>
      )
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#EB6A7C' }}>
      <Image
        source={{
          uri: 'https://links.papareact.com/m51'
        }}
        containerStyle={tailwind('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          onPress={() => setAscending((old) => !old)}
          color='pink'
          titleStyle={{ color: 'gray', fontWeight: '400' }}
          style={tailwind('py-2 px-5')}
        >
          {ascending ? 'Showind: Oldest First' : 'Showing: Most Recent First'}
        </Button>

        <View style={{ paddingBottom: 15 }}>
          {orders
            ?.sort((a, b) => {
              if (ascending) {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
              } else {
                return new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1;
              }
            })
            .map((order) => (
              <OrderCard key={order.trackingId} item={order} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
