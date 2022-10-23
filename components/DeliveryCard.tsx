import { View, Text } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { Card, Icon } from '@rneui/themed';
import { Divider } from '@rneui/base';
import MapView, { Marker } from 'react-native-maps';

interface Props {
  order: Order;
  fullWidth?: boolean;
}

const DeliveryCard: React.FC<Props> = ({ order, fullWidth }) => {
  const tailwind = useTailwind();
  return (
    <Card
      containerStyle={[
        tailwind(`${fullWidth ? 'rounded-none m-0' : 'rounded-lg'}  my-2 `),
        {
          backgroundColor: fullWidth ? '#EB6A7C' : '#59C1CC',
          padding: 0,
          paddingTop: 16,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4
        }
      ]}
    >
      <View style={fullWidth && { height: '100%' }}>
        <Icon name='box' type='entypo' size={50} color='white' />
        <View style={tailwind('mt-3')}>
          <Text
            style={tailwind(
              'text-xs text-center uppercase text-white font-bold'
            )}
          >
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={tailwind('text-white text-center text-lg font-bold')}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color='white' />
          <View style={tailwind('mx-auto pb-5')}>
            <Text style={tailwind('text-center text-white font-bold mt-5')}>
              Address
            </Text>
            <Text style={tailwind('text-sm text-center text-white')}>
              {order.Address}, {order.City}
            </Text>
            <Text style={tailwind('text-sm text-center text-white italic')}>
              Shipping Cost: ${order.shippingCost}
            </Text>
          </View>
        </View>
        <Divider color='white' />
        <View style={tailwind('p-5')}>
          {order.trackingItems.items.map((item) => (
            <View
              key={item.item_id}
              style={tailwind('flex flex-row items-center justify-between')}
            >
              <Text style={tailwind('text-sm italic text-white')}>
                {item.name}
              </Text>
              <Text style={tailwind('text-white text-xl')}>
                x {item.quantity}
              </Text>
            </View>
          ))}
        </View>

        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          style={[
            tailwind('w-full'),
            { flexGrow: 1 },
            !fullWidth && { height: 200 }
          ]}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{
                latitude: order.Lat,
                longitude: order.Lng
              }}
              title='Delivery Location'
              description={order.Address}
              identifier='destination'
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
