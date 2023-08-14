import {
  ArrowDown01,
  ArrowLeft,
  ArrowUp10,
  Box,
  Map
} from "@tamagui/lucide-icons";
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
import { apartments } from "../../models/apartment";

export default function User() {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const property = apartments.find((prop) => prop.id === params.id);

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
                  {property.address}
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
          <Image
            source={{ height: 250, uri: property.imageUrl }}
            mb="$2"
            br="$4"
          />

          <H6 color="$gray11">Investment return</H6>
          <YGroup
            bordered
            separator={<Separator />}
          >
            <YGroup.Item>
              <ListItem
                title={`${property.squareFootage} sqm`}
                subTitle="Return on Invested Capital"
                icon={Box}
              />
            </YGroup.Item>
            <YGroup.Item>
              <ListItem
                title={`${property.monthlyExpenses} €`}
                subTitle="Monthly expenses"
                icon={ArrowDown01}
                color="$red10"
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
                title={`${property.squareFootage} sqm`}
                subTitle="Square footage"
                icon={Box}
              />
            </YGroup.Item>
            <YGroup.Item>
              <ListItem
                title={`${property.monthlyExpenses} €`}
                subTitle="Monthly expenses"
                icon={ArrowDown01}
                color="$red10"
              />
            </YGroup.Item>
            <YGroup.Item>
              <ListItem
                title={`${property.monthlyRentalIncome} €`}
                subTitle="Monthly rental income"
                icon={ArrowUp10}
                color="$green10"
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
}
