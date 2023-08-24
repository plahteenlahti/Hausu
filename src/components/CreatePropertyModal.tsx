import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Camera, ListPlus, SaveAll } from "@tamagui/lucide-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  Form,
  H4,
  Image,
  Input,
  Label,
  ScrollView,
  Sheet,
  Stack,
  Text,
  XStack,
  YStack
} from "tamagui";

import { Property } from "../db/models/property";

import { PhotoPicker } from "./PhotoPicker";

type FormData = {
  name: string;
  country: string;
  city: string;
  streetAddress: string;
  area: number;
  photo: string;
  purchasePrice: number;
  image?: string;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatePropertyModal = ({ open, setOpen }: Props) => {
  const [position, setPosition] = useState(0);
  const database = useDatabase();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await database.write(async () => {
      await database.get("properties").create((property: Property) => {
        property.name = data.name;
        property.streetAddress = data.streetAddress;
        property.city = data.city;
        property.country = data.country;
        property.imageUrl = data.image;
      });
    });
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      snapPoints={[90, 50, 25]}
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation="bouncy"
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <XStack
          alignItems="center"
          justifyContent="flex-end"
          padding="$4"
          space="$2"
        >
          <Button
            icon={SaveAll}
            size="$3"
            themeInverse
            onPress={handleSubmit(onSubmit)}
          >
            Add
          </Button>
        </XStack>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView px="$4">
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PhotoPicker
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <YStack>
              <Controller
                control={control}
                rules={{
                  maxLength: 100
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      id="name"
                      placeholder="Property name"
                    />
                  </>
                )}
                name="name"
              />
              {errors.name && <Text>This is required.</Text>}
            </YStack>

            <YStack>
              <Controller
                control={control}
                name="country"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      id="country"
                      placeholder="Finland"
                    />
                  </>
                )}
              />
              {errors.country && <Text>This is required.</Text>}
            </YStack>

            <YStack>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Helsinki"
              />
            </YStack>

            <YStack>
              <Label htmlFor="address">Street address</Label>
              <Input
                id="address"
                placeholder="Malminkatu 38"
              />
            </YStack>

            <YStack>
              <Label htmlFor="square_footage">Living area</Label>
              <Input
                id="square_footage"
                placeholder="40 sqm"
                keyboardType="number-pad"
              />
            </YStack>

            <YStack>
              <Label htmlFor="purchasePrice">Purchase price</Label>
              <Input
                id="purchasePrice"
                placeholder="40 000"
                keyboardType="number-pad"
              />
            </YStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Sheet.Frame>
    </Sheet>
  );
};
