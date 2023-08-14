import { useRouter } from "expo-router";
import { Card, H6, Image, Label, Stack, Text, XStack, ZStack } from "tamagui";

import { Apartment } from "../models/apartment";

type Props = {
  property: Apartment;
};

export const Property = ({ property }: Props) => {
  const { name, address, monthlyRentalIncome, id } = property;
  const router = useRouter();

  const navigateToProperty = () => {
    router.push(`/properties/${id}`);
  };

  return (
    <Card
      br="$6"
      bg="$backgroundTransparent"
      onPress={navigateToProperty}
      padding="$2.5"
    >
      <ZStack
        height={150}
        pos="relative"
        mb="$2"
      >
        <Image
          source={{ height: 150, uri: property.imageUrl }}
          width="auto"
          mb="$2"
          br="$4"
        />
        <Stack pos="absolute"></Stack>
      </ZStack>
      <XStack justifyContent="space-between">
        <H6 mb="$-1.5">{name}</H6>
        <Stack
          br="$2"
          paddingHorizontal="$3"
          bg="$green11Dark"
        >
          <Label
            size="$1"
            color="$gray1"
          >
            {monthlyRentalIncome} €
          </Label>
        </Stack>
      </XStack>

      <Label
        size="$2"
        color="$gray9"
      >
        {address}
      </Label>
    </Card>
  );
};
