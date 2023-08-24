import withObservables from "@nozbe/with-observables";
import { ArrowUp, Euro } from "@tamagui/lucide-icons";
import { H1, ScrollView, Separator, Text, XStack, YStack } from "tamagui";

import { EuriborCard } from "@/components/Euribor";
import { MySafeAreaView } from "@/components/MySafeAreaView";
import { database } from "@/db/database";
import { Property } from "@/db/models/property";
import { formatPrice } from "@/helpers/currency";
import {
  calculatePercentageIncrease,
  numberToShortFormat
} from "@/helpers/financial";

type Props = {
  properties: Array<Property>;
};

const DashboardView = ({ properties }: Props) => {
  const totalAssets = properties.reduce(
    (prev, curr) => prev + (curr.price ?? curr.purchaseCost),
    0
  );
  const originalWorth = properties.reduce(
    (prev, curr) => prev + curr.purchaseCost,
    0
  );

  const increase = calculatePercentageIncrease(totalAssets, originalWorth);

  return (
    <MySafeAreaView>
      <ScrollView
        paddingHorizontal="$4"
        paddingTop="$12"
      >
        <Text
          color="$gray9"
          fontFamily="$body"
          fontSize="$2"
          letterSpacing={1.2}
          fontWeight="500"
          mb="$2"
        >
          Total assets
        </Text>
        <H1
          color="$gray12"
          mb="$2"
          fontSize="$10"
          fontWeight="bold"
        >
          {formatPrice(totalAssets)}
        </H1>
        <XStack alignItems="center">
          <ArrowUp
            size="$1"
            color="$green10"
          />
          <Text
            fontFamily="$body"
            ml="$1"
            color="$green10"
          >
            {increase.toFixed(2)}%
          </Text>
        </XStack>
        <Separator marginVertical="$4" />
        <XStack justifyContent="space-between">
          <YStack>
            <Text
              fontFamily="$body"
              fontSize="$1"
              color="$gray9"
              fontWeight="600"
              mb="$1"
            >
              Properties
            </Text>
            <Text
              fontFamily="$body"
              fontWeight="bold"
              fontSize="$7"
            >
              {properties.length}
            </Text>
          </YStack>

          <YStack>
            <Text
              fontFamily="$body"
              fontSize="$1"
              color="$gray9"
              fontWeight="600"
              mb="$1"
            >
              Cashflow
            </Text>
            <Text
              fontFamily="$body"
              fontWeight="bold"
              fontSize="$7"
            >
              {numberToShortFormat(2000)}
            </Text>
          </YStack>

          <YStack>
            <Text
              fontFamily="$body"
              fontSize="$1"
              color="$gray9"
              fontWeight="600"
              mb="$1"
            >
              Profit
            </Text>
            <Text
              fontFamily="$body"
              fontWeight="bold"
              fontSize="$7"
            >
              {numberToShortFormat(totalAssets - originalWorth)}
            </Text>
          </YStack>
        </XStack>

        <EuriborCard />
      </ScrollView>
    </MySafeAreaView>
  );
};

const enhance = withObservables(["properties"], ({ properties }) => ({
  properties: properties.observe()
}));

const EnhancedProperties = enhance(DashboardView);

const propertiesQuery = database.get("properties").query();

const Dashboard = () => {
  return <EnhancedProperties properties={propertiesQuery} />;
};

export default Dashboard;
