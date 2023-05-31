import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import AuthContext from '../../../context/Auth';
import AppStyles from '../../../theme/appStyles';
import Fonts from '../../../theme/fonts';
import OrderItem from './OrderItem';
import useGetData from '../../../hook/useGetData';

const OrderListHome = () => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { dataList } = useGetData();

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  return (
    isAuthenticated ? (
      <FlatList
        testID="flat-list-item-order-active"
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        contentContainerStyle={AppStyles.flatListContainer}
        data={dataList}
        renderItem={({ item, index }) => (
          <OrderItem
            item={item}
            index={index}
          />
        )}
      />
    ) : null
  );
};

export default OrderListHome;
