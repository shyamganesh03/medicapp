import DefaultImage from "@/assets/images/app-icon.png";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";

const ImageComponent = ({
  src,
  imageStyle = {},
}: {
  src: ImageSourcePropType | undefined;
  imageStyle?: StyleProp<ImageStyle>;
}) => {
  const [hasError, setHasError] = useState(false);
  const defaultStyle: StyleProp<ImageStyle> = {
    width: 100,
    height: 100,
    borderRadius: 16,
  };
  return (
    <Image
      source={hasError ? DefaultImage : src}
      style={[defaultStyle, imageStyle]}
      onError={() => setHasError(true)}
    />
  );
};

export default ImageComponent;
