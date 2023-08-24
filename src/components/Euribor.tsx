import React from "react";
import { Stack, Text, YStack } from "tamagui";

export const EuriborCard = () => {
  return (
    <YStack
      marginVertical="$10"
      padding="$2"
      borderRadius="$3"
      minHeight="$10"
      elevation="1"
      backgroundColor="$backgroundHover"
    >
      <Text fontFamily="$body">Reference rate</Text>
    </YStack>
  );
};
