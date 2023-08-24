import { useEffect, useState } from "react";
import { Camera } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "tamagui";
import { Label, Stack, YStack } from "tamagui";

type Props = {
  onChange: (value: string) => void;
  value?: string;
};

export const PhotoPicker = ({ value, onChange }: Props) => {
  const [image, setImage] = useState(value);

  useEffect(() => {
    if (value !== image) {
      setImage(value);
    }
  }, [image, value]);

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
      onChange(result.assets[0].uri);
    }
  };

  return (
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
  );
};
