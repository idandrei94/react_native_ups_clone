import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomersScreen';
import { Card, Icon } from '@rneui/themed';

interface Props {
  name: string;
  email: string;
  userId: string;
}

const CustomerCard: React.FC<Props> = ({ name, email, userId }) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const tailwind = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        orders.length &&
        navigation.navigate('MyModal', {
          userId,
          name
        })
      }
    >
      <Card containerStyle={tailwind('p-5 rounded-lg')}>
        <View>
          <View style={tailwind('flex-row justify-between')}>
            <View>
              <Text style={tailwind('text-2xl font-bold')}>{name}</Text>
              <Text style={tailwind('text-sm text-[#59C1CC]')}>
                ID: {userId}
              </Text>
            </View>
            <View style={tailwind('flex-row items-center justify-end')}>
              <Text style={{ color: '#59C1CC' }}>
                {loading ? 'Loading...' : `${orders.length}x`}
              </Text>
              <Icon
                style={tailwind('mb-5 ml-auto')}
                name='box'
                type='entypo'
                color='#59C1CC'
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
