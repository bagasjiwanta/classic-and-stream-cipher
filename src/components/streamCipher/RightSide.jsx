import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";

function RightSide(props) {
  const { outputText, downloadText, downloadFile, setOutputFormat} = props;

  return (
    <Card width="350px" height="500px">
      <CardHeader pb={2}>
        <Heading as="h2" size="lg" color="teal.500">
          Output
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2} h="100%">
          <Box mb={2}>
            <Heading size="sm" pb={2}>
              Format
            </Heading>
            <Select defaultValue="text" onChange={(e) => setOutputFormat(e.target.value)}>
              <option value="text">Text</option>
              <option value="base64">Base64</option>
              <option value="file">File</option>
            </Select>
          </Box>
          <Heading size="sm">Result</Heading>
          <Textarea
            flexGrow="1"
            placeholder="Cipher text here"
            fontFamily="monospace"
            value={typeof outputText !== 'string' ? new TextDecoder().decode(outputText) : outputText}
            isReadOnly={true}
          />
          <HStack w="100%" pt={2}>
            <Button colorScheme="teal" onClick={downloadText}>
              Download as text
            </Button>
            <Button colorScheme="teal" onClick={downloadFile}>
              Download as file
            </Button>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default RightSide;
