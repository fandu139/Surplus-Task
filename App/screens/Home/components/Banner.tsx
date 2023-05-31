import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BANNER_FIRST, BANNER_SECOND } from '../../../assets/images';
import { navigate } from '../../../helper/navigation';
import AppStyles from '../../../theme/appStyles';
import Colors from '../../../theme/colors';
import Fonts from '../../../theme/fonts';
import Text from '../../../uikit/Text';
import FastImage from 'react-native-fast-image';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const dummyBannerData = [
  {
    id: '0',
    img: BANNER_FIRST,
    title: 'Mari bergabung Surplus!',
    content: 'Banner Pertama',
  },
  {
    id: '2',
    img: BANNER_SECOND,
    title: 'Mari bergabung Surplus!',
    content: 'Banner Ke Dua',
  }
];

const windowWidth = Number(Dimensions.get('window').width);

const Banner = () => {
  const [paginationIndex, setPaginationIndex] = React.useState(0);

  const BannerPagination = () => {
    return (
      <Pagination
        dotsLength={dummyBannerData.length}
        activeDotIndex={paginationIndex}
        containerStyle={styles.indicatorContainer}
        dotContainerStyle={styles.indicatorInnerContainer}
        dotStyle={styles.indicator}
        inactiveDotStyle={styles.inactiveIndicator}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };

  // TODO hide see all banner button
  return (
    <View>
      <View style={styles.bannerContainer}>
        <Carousel
          loop
          autoplay
          shouldOptimizeUpdates
          enableSnap
          inactiveSlideOpacity={1}
          activeSlideOffset={50}
          inactiveSlideScale={0.95}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          onSnapToItem={(index) => setPaginationIndex(index)}
          data={dummyBannerData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.imageButtonContainer}
                testID="button-show-banner-detail"
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.imageContainer}
                  source={item.img}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.bannerPaginationContainer}>
        {dummyBannerData.length < 2 ? <View /> : <BannerPagination />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    height: 160,
    flexDirection: 'row',
    position: 'absolute',
  },
  paginationContainer: {
    paddingTop: 0,
  },
  indicatorContainer: {
    paddingTop: 10,
    paddingBottom: 0,
  },
  indicatorInnerContainer: {
    marginHorizontal: 2,
  },
  indicator: {
    width: 12,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.RED,
  },
  inactiveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.GRAYE0,
  },
  bannerPaginationContainer: {
    ...AppStyles.rowItemsSpace,
    marginBottom: 28,
    marginTop: 120,
    alignItems: 'flex-end',
  },
  imageButtonContainer: {
    width: windowWidth,
    height: 160,
    borderRadius: 3,
  },
  imageContainer: {
    width: windowWidth,
    borderRadius: 3,
    height: 160,
    borderWidth: 1,
    borderColor: Colors.GRAYE0,
  },
  sectionHeader: {
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: Colors.BLACK,
  },
  sectionTitle: {
    fontSize: Fonts.size.large,
  },
  sectionRightTitle: {
    fontSize: Fonts.size.moreExtraSmall,
    color: Colors.WHITE,
    padding: 5,
  },
});

export default Banner;
