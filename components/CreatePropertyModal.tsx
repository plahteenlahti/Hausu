import { useState } from "react";
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
  Sheet,
  Stack,
  XStack,
  YStack
} from "tamagui";

const photosDirectory = FileSystem.cacheDirectory + "amira/";
const photoFileUri = (photoId: string) => photoId + `_amira_${photoId}_200.gif`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatePropertyModal = ({ open, setOpen }: Props) => {
  const [position, setPosition] = useState(0);
  const [image, setImage] = useState("");

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(photosDirectory);
    if (!dirInfo.exists) {
      console.log("Photos directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(photosDirectory, {
        intermediates: true
      });
    }
  };

  const openImagePicker = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveProperty = async () => {
    // ensureDirExists()
    // // save image locally
    // if (image) {
    //   const fileInfo = await FileSystem.getInfoAsync(image);
    //   await FileSystem.downloadAsync(image, photosDirectory);
    // }
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      snapPoints={[85, 50, 25]}
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation="bouncy"
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        <Form
          onSubmit={() => null}
          padding="$4"
          space="$4"
        >
          <XStack
            alignItems="center"
            space="$2"
          >
            <ListPlus color="$gray10" />
            <H4>Add new property</H4>
          </XStack>

          <YStack>
            <Label htmlFor="imageUrl">Image</Label>
            <Stack
              height="$10"
              width="100%"
              backgroundColor="$gray6"
              br="$4"
              justifyContent="center"
              alignItems="center"
              onPress={openImagePicker}
              overflow="hidden"
            >
              <Camera
                size="$3"
                color="$gray11"
              />
              {!!image && (
                <Image
                  source={{ uri: image }}
                  position="absolute"
                  top={0}
                  bottom={0}
                  left={0}
                  right={0}
                  height={150}
                />
              )}
            </Stack>
          </YStack>

          <YStack>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Property name"
            />
          </YStack>

          <YStack>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Finland"
            />
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
            <Label htmlFor="square_footage">Street address</Label>
            <Input
              id="square_footage"
              placeholder="40"
              keyboardType="number-pad"
            />
          </YStack>

          <Form.Trigger>
            <Button
              icon={SaveAll}
              size="$5"
              themeInverse
            >
              Add property
            </Button>
          </Form.Trigger>
        </Form>
      </Sheet.Frame>
    </Sheet>
  );
};
