import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useInfo } from "./Logic";

function RightSide() {
  const {
    outputText,
    extendedvigenere,
    downloadText,
    downloadFile,
    isEncode,
    format,
  } = useInfo();

  return (
    <Card width="350px" height="500px">
      <CardHeader pb={2}>
        <Heading as="h2" size="lg" color="teal.500">
          {isEncode ? "Cipher" : "Plain"}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2} h="100%">
          <Heading size="sm">Result </Heading>
          <Textarea
            flexGrow="1"
            placeholder="Cipher text here"
            style={{
              fontFamily: "monospace",
              textTransform: extendedvigenere ? null : "uppercase",
            }}
            value={
              typeof outputText === "string"
                ? outputText.slice(0, 1000)
                : new TextDecoder()
                    .decode(new Uint8Array(outputText))
                    .slice(0, 1000)
            }
            isReadOnly={true}
          />
          <HStack w="100%" pt={2}>
            <Button colorScheme="teal" onClick={() => downloadText()}>
              Download as text
            </Button>
            {extendedvigenere && format == "file" ? (
              <Button colorScheme="teal" onClick={() => downloadFile()}>
                Download as file
              </Button>
            ) : null}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default RightSide;
