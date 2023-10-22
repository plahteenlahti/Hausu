import { useState } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import withObservables from "@nozbe/with-observables";
import { PlusCircle } from "@tamagui/lucide-icons";
import { BlurView } from "expo-blur";
import { Button, Stack, Text, XStack } from "tamagui";

import { CreatePropertyModal } from "@/components/CreatePropertyModal";
import { PropertyCard } from "@/components/PropertyCard";
import { database } from "@/db/database";
import { Property as PropertyType } from "@/db/models/property";
import { TableName } from "@/db/schema";

type Props = {
  properties: PropertyType[];
};

const AnimatedText = Animated.createAnimatedComponent(Text);

const Properties = ({ properties }: Props) => {
  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(aref);

  const [open, setOpen] = useState(false);
  const database = useDatabase();

  const openAddNewPropertyModal = () => {
    setOpen((x) => !x);
  };

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollHandler.value, [0, 30], [0, 1])
    };
  });

  // const titleStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { scale: interpolate(scrollHandler.value, [-30, 0, 30], [2, 1, 1]) }
  //     ]
  //   };
  // });

  const populateDB = async () => {
    try {
      const propertiesData = [
        {
          name: "Puinnintie",
          streetAddress: "Puinnintie 25",
          city: "Pori",
          country: "Finland",
          purchaseCost: 40_000,
          price: 45_000,
          squareMeters: 60,
          transferTax: 0.02,
          imageUrl: "https://perttu.dev/media/amira/puinnintie.jpg",
          imageBlurHash: "UvB}IEpJaead%%o~WBaekrf,V[jYogV@V@oe",
          notes: "No notes",
          purchaseDate: new Date()
        },
        {
          name: "Varvinkatu 2",
          streetAddress: "Varvinkatu 15 A",
          city: "Pori",
          country: "Finland",
          purchaseCost: 60_000,
          price: 80_000,
          squareMeters: 41,
          transferTax: 0.02,
          imageUrl: "https://perttu.dev/media/amira/varvinkatu.jpg",
          imageBlurHash: "UREpD}-;%%x]yFadXVo#NMVrogWBRne-WAWB",
          notes: "No notes",
          purchaseDate: new Date()
        },
        {
          name: "☀️ Summer home",
          streetAddress: "Rautatienpuistokatu 3",
          city: "Pori",
          country: "Finland",
          purchaseCost: 85_000,
          price: 160_000,
          squareMeters: 72,
          transferTax: 0.02,
          imageUrl: "https://perttu.dev/media/amira/rautatienpuistokatu.jpeg",
          imageBlurHash: "UMH_}dMwt100AgD%xAROpfD%xA%2aJxsW9NL",
          notes: "Notes for property 2",
          purchaseDate: new Date()
        },
        {
          name: "Varvinkatu 20",
          streetAddress: "Varvinkatu 15 A",
          city: "Pori",
          country: "Finland",
          purchaseCost: 50_000,
          price: 80_000,
          squareMeters: 41,
          transferTax: 0.02,
          imageUrl: "https://perttu.dev/media/amira/varvinkatu.jpg",
          imageBlurHash: "UREpD}-;%%x]yFadXVo#NMVrogWBRne-WAWB",
          notes: "Notes for property 2",
          purchaseDate: new Date()
        },
        {
          name: "Yrjönkatu",
          streetAddress: "Yrjönkatu 4",
          city: "Pori",
          country: "Finland",
          purchaseCost: 124_000,
          price: 130_000,
          squareMeters: 100.5,
          transferTax: 0.02,
          imageUrl: "https://perttu.dev/media/amira/yrjonkatu.jpeg",
          imageBlurHash: "UzKB:uWVtRog_NW;j[j[bwWrRkWBIoWXaeWV",
          notes: "Notes for property 4",
          purchaseDate: new Date()
        },
        {
          name: "Malmivaara 24",
          streetAddress: "Malminkatu 38 B",
          city: "Helsinki",
          country: "Finland",
          purchaseCost: 288_000,
          price: 300_000,
          squareMeters: 32,
          transferTax: 0.02,
          imageUrl: "https://perttu.dev/media/amira/malminkatu.jpg",
          imageBlurHash: "UFK-C8X;I^9F~US*-.xt9F%2R.Io8_IUjrog",
          notes: "Notes for property 4",
          purchaseDate: new Date()
        },
        {
          name: "Varvinkatu 8",
          streetAddress: "Varvinkatu 15 B",
          city: "Pori",
          country: "Finland",
          purchaseCost: 25_000,
          price: 30_000,
          squareMeters: 15,
          transferTax: 0.02,
          imageUrl: "https://perttu.dev/media/amira/varvinkatu.jpg",
          imageBlurHash: "UREpD}-;%%x]yFadXVo#NMVrogWBRne-WAWB",
          notes: "Notes for property 3",
          purchaseDate: new Date()
        }
      ];

      for (const data of propertiesData) {
        await database.write(async () => {
          await database.collections
            .get(TableName.PROPERTIES)
            .create((property: PropertyType) => {
              property.name = data.name;
              property.streetAddress = data.streetAddress;
              property.city = data.city;
              property.country = data.country;
              property.squareMeters = data.squareMeters;
              property.purchaseCost = data.purchaseCost;
              property.transferTax = data.transferTax;
              property.price = data.price;
              property.imageUrl = data.imageUrl;
              property.imageBlurHash = data.imageBlurHash;
              property.purchaseDate = data.purchaseDate;
              property.notes = data.notes;
            });
        });
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const { top } = useSafeAreaInsets();

  return (
    <Stack>
      <Animated.ScrollView
        entering={FadeIn}
        exiting={FadeOut}
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}

        <Button
          onPress={openAddNewPropertyModal}
          icon={PlusCircle}
        >
          Add new property
        </Button>
        <Button
          onPress={populateDB}
          icon={PlusCircle}
        >
          Add test data
        </Button>

        <CreatePropertyModal
          open={open}
          setOpen={setOpen}
        />
      </Animated.ScrollView>

      <View style={{ position: "absolute", width: "100%", height: 100 }}>
        <Animated.View
          style={[
            { position: "absolute", width: "100%", height: 100 },
            headerStyle
          ]}
        >
          <BlurView
            style={[{ width: "100%", height: 100 }]}
            intensity={100}
          />
        </Animated.View>
        <XStack
          paddingTop={top}
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="$4"
          marginBottom="$4"
        >
          <AnimatedText
            fontSize="$6"
            fontWeight="600"
            color="$blue12"
            letterSpacing={1.2}
          >
            Properties
          </AnimatedText>
        </XStack>
      </View>
    </Stack>
  );
};

const enhance = withObservables(["properties"], ({ properties }) => ({
  properties: properties.observe()
}));

const EnhancedProperties = enhance(Properties);

const propertiesQuery = database.get("properties").query();

const Wrapper = () => {
  return <EnhancedProperties properties={propertiesQuery} />;
};

export default Wrapper;
