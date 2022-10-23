import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>;

const ModalScreen = () => {
  const tailwind = useTailwind();
  const {
    params: { name, userId }
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={tailwind(
          'flex flex-row w-full items-center justify-start px-5 pt-3 pb-5'
        )}
      >
        <TouchableOpacity
          onPress={() => navigation.canGoBack() && navigation.goBack()}
        >
          <Icon name='arrowleft' type='antdesign' />
        </TouchableOpacity>
      </View>
      <View>
        <View style={tailwind('pb-5 border-b-2 border-[#59C1CC]')}>
          <Text
            style={tailwind('text-center text-xl font-bold text-[#59C1CC]')}
          >
            {name}
          </Text>
          <Text style={tailwind('text-center italic text-sm')}>deliveries</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </SafeAreaView>
  );
};

export default ModalScreen;
