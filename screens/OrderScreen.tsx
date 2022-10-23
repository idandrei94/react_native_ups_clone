import { View, Text, SafeAreaView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { OrdersScreenNavigationProp } from './OrdersScreen';
import { RootStackParamList } from '../navigation/RootNavigator';
import DeliveryCard from '../components/DeliveryCard';

type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>;

const OrderScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order }
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTitleStyle: { color: '#EB6A7C' },
      headerBackTitle: 'Deliveries',
      headerTintColor: '#EB6A7C'
    });
  }, []);

  return (
    <SafeAreaView style={tailwind('-mt-2')}>
      <DeliveryCard order={order} fullWidth />
    </SafeAreaView>
  );
};

export default OrderScreen;
