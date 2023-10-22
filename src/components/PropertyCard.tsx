import { Blurhash } from "react-native-blurhash";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { Box, MapPin } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Card, H6, Image, Label, Stack, Text, XStack, ZStack } from "tamagui";

import { Property as PropertyType } from "../db/models/property";
import { formatPrice } from "../helpers/currency";

import { transition } from "@/app/apartments/[id]";

type Props = {
  property: PropertyType;
};

export const PropertyCard = ({ property }: Props) => {
  const opacity = useSharedValue(0);

  const router = useRouter();

  const navigateToProperty = () => {
    router.push(`/apartments/${property.id}`);
  };

  const animateTransition = () => {
    opacity.value = withSpring(1);
  };

  return (
    <Card
      br="$6"
      marginHorizontal="$2"
      bg="$backgroundTransparent"
      onPress={navigateToProperty}
      padding="$2.5"
      mb="$2"
    >
      <ZStack
        height={150}
        pos="relative"
        mb="$2"
        overflow="hidden"
        br="$4"
      >
        <Blurhash
          blurhash={property.imageBlurHash}
          style={{ height: 150, width: "100%" }}
        />
        <Animated.View
          style={{ opacity: opacity, height: 150, width: "auto" }}
          sharedTransitionStyle={transition}
          sharedTransitionTag="propertyCardCover"
        >
          <Image
            onLoadEnd={animateTransition}
            source={{ height: 150, uri: property.imageUrl }}
          />
        </Animated.View>
        <Stack pos="absolute"></Stack>
      </ZStack>
      <XStack justifyContent="space-between">
        <H6 mb="$-1.5">{property.streetAddress}</H6>
        <Stack
          br="$2"
          paddingHorizontal="$3"
          bg="$green11Dark"
        >
          <Label
            size="$1"
            color="$gray1"
          >
            {formatPrice(property.price ?? property.purchaseCost)} €
          </Label>
        </Stack>
      </XStack>

      <XStack
        mt="$1.5"
        alignItems="center"
      >
        <Box
          color="$gray9"
          size={12}
          fontSize="$2"
        />
        <Text
          fontFamily="$body"
          ml="$2"
          fontSize="$2"
          color="$gray9"
          mr="$2.5"
        >
          {property.squareMeters}
        </Text>

        <MapPin
          color="$gray9"
          size={12}
          fontSize="$2"
        />
        <Text
          fontFamily="$body"
          ml="$2"
          fontSize="$2"
          color="$gray9"
        >
          {property.city}, {property.country}
        </Text>
      </XStack>
    </Card>
  );
};
