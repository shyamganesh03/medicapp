import * as React from "react";
import { Searchbar } from "react-native-paper";

type SearchTextInputProps = {
  placeholder: string;
};

const SearchTextInput = ({ placeholder: label }: SearchTextInputProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Searchbar
      placeholder={label}
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{ paddingRight: 12 }}
      numberOfLines={1}
      autoCapitalize="none"
    />
  );
};

export default SearchTextInput;
