import React, { useEffect } from 'react';
import SteinStore from 'stein-js-client';

const store = new SteinStore(
  'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list',
);

type Props = Array<{
  "area_kota": string;
  "area_provinsi": string;
  "komoditas": string;
  "price": string;
  "size": string;
  "tgl_parsed": string;
  "timestamp": string;
  "uuid": string;
}>

const useGetData = () => {
  const [dataList, setDataList] = React.useState<Props>([]);

  useEffect(() => {
    store.read('', { limit: 30, offset: 2 }).then((data: Props) => {
      const result = data.filter(value => value.komoditas && value.timestamp !== null );
      setDataList(result);
    });
  }, []);

  return {
    dataList
  };
};

export default useGetData;
