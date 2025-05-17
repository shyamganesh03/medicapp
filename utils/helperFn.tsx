import * as Clipboard from "expo-clipboard";

export async function copyStringToClipBoard(text: string) {
  const result = await Clipboard.setStringAsync(text);
  return result;
}
