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

function RightSide(props) {
  const { outputText, downloadText, downloadFile, isEncode } = props;
  return (
    <Card width="350px" height="500px">
      <CardHeader pb={2}>
        <Heading as="h2" size="lg" color="teal.500">
          {isEncode ? "Cipher" : "Plain"}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2} h="100%">
          <Heading size="sm">Result</Heading>
          <Textarea
            flexGrow="1"
            placeholder="Cipher text here"
            fontFamily="monospace"
            value={typeof outputText === 'string' ? outputText : new TextDecoder().decode(outputText)}
            isReadOnly={true}
          />
          <HStack w="100%" pt={2}>
            <Button colorScheme="teal" onClick={downloadText}>
              {" "}
              Download as text{" "}
            </Button>
            <Button colorScheme="teal" onClick={downloadFile}>
              {" "}
              Download as file{" "}
            </Button>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default RightSide;
