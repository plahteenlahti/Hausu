import Animated, {
  SharedTransition,
  withSpring
} from "react-native-reanimated";
import { Database } from "@nozbe/watermelondb";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { ArrowDown01, ArrowLeft, Box, Map } from "@tamagui/lucide-icons";
import { useGlobalSearchParams, useRouter } from "expo-router";
import {
  Button,
  H3,
  H6,
  Image,
  Label,
  ListItem,
  ScrollView,
  Separator,
  TextArea,
  XStack,
  YGroup,
  YStack
} from "tamagui";

import { MySafeAreaView } from "../../components/MySafeAreaView";
import { MyStack } from "../../components/MyStack";
import { Property } from "../../db/models/property";
import { formatPrice } from "../../helpers/currency";

type Props = {
  property: Property;
};

export const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth)
  };
});

const PropertyView = ({ property }: Props) => {
  const router = useRouter();

  return (
    <MySafeAreaView>
      <ScrollView>
        <MyStack>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            space="$2"
          >
            <XStack space="$2">
              <Button
                icon={ArrowLeft}
                onPress={router.back}
              />
              <YStack>
                <H3>{property.name}</H3>
                <Label
                  size="$1"
                  color="$gray10"
                >
                  {property.streetAddress}, {property.city} {property.country}
                </Label>
              </YStack>
            </XStack>

            <Button
              icon={Map}
              circular
              backgroundColor="$backgroundStrong"
              elevate
            />
          </XStack>
          <Animated.View
            sharedTransitionTag="propertyCardCover"
            style={{ height: 250, width: "auto" }}
            sharedTransitionStyle={transition}
          >
            <Image
              source={{ height: 250, uri: property.imageUrl }}
              mb="$2"
              br="$4"
            />
          </Animated.View>

          <H6 color="$gray11">Return on investment</H6>
          <YGroup
            bordered
            separator={<Separator />}
          >
            <YGroup.Item>
              <ListItem
                title={`${formatPrice(property.purchaseCost)}`}
                subTitle="Purchase cost"
                icon={Box}
              />
            </YGroup.Item>
            <YGroup.Item>
              <ListItem
                title={`${formatPrice(
                  property.price ?? property.purchaseCost
                )} €`}
                subTitle="Estimated price"
                icon={ArrowDown01}
                color="$green10"
              />
            </YGroup.Item>
          </YGroup>

          <H6 color="$gray11">Details</H6>

          <YGroup
            bordered
            separator={<Separator />}
          >
            <YGroup.Item>
              <ListItem
                title={`${property.purchaseDate}`}
                subTitle="Purchase date"
                icon={Box}
              />
            </YGroup.Item>
            <YGroup.Item>
              <ListItem
                title={`${property.squareMeters} sqm`}
                subTitle="Square footage"
                icon={Box}
              />
            </YGroup.Item>
          </YGroup>

          <H6 color="$gray11">Notes</H6>
          <TextArea
            backgroundColor="$backgroundStrong"
            placeholder="Enter your details..."
            rows={10}
            value={property.notes}
          />
        </MyStack>
      </ScrollView>
    </MySafeAreaView>
  );
};

const EnchancedView = withDatabase(
  withObservables(
    ["id"],
    ({ id, database }: { id: string; database: Database }) => ({
      property: database.get("properties").findAndObserve(id)
    })
  )(PropertyView)
);

const PropertyViewWrapper = () => {
  const params = useGlobalSearchParams();

  return <EnchancedView id={params.id}></EnchancedView>;
};

export default PropertyViewWrapper;
