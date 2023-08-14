import { useState } from "react";
import { Filter, PlusCircle, Search } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, H2, Label, ScrollView, XStack, YStack } from "tamagui";

import { CreatePropertyModal } from "../components/CreatePropertyModal";
import { MySafeAreaView } from "../components/MySafeAreaView";
import { MyStack } from "../components/MyStack";
import { Property } from "../components/Property";
import { apartments } from "../models/apartment";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const openAddNewPropertyModal = () => {
    setOpen((x) => !x);
  };

  return (
    <MySafeAreaView>
      <ScrollView bg="$background">
        <MyStack>
          <XStack justifyContent="space-between">
            <YStack>
              <H2
                color="$blue12"
                letterSpacing={1.2}
              >
                Properties
              </H2>
              <Label
                disabled
                size="$1.5"
                color="$gray11"
              >
                Listing 10 properties
              </Label>
            </YStack>
            <XStack space="$2">
              <Button
                circular
                icon={Filter}
              />
              <Button
                circular
                icon={Search}
              />
            </XStack>
          </XStack>

          {apartments.map((apartment) => (
            <Property
              key={apartment.id}
              property={apartment}
            />
          ))}

          <Button
            onPress={openAddNewPropertyModal}
            icon={PlusCircle}
          >
            Add new property
          </Button>
        </MyStack>
      </ScrollView>

      <CreatePropertyModal
        open={open}
        setOpen={setOpen}
      />
    </MySafeAreaView>
  );
}
