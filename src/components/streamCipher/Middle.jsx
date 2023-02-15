import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { asciiOnly } from "../helper";

function Middle({ setEncryptKey, encryptKey, isEncode, setIsEncode}) {
  const handleKeyChange = (e) => {
    const text = e.target.value;
    asciiOnly(text) && setEncryptKey(text);
  };

  return (
    <Card width="350px" height="500px">
      <CardHeader pb={2}>
        <HStack justifyContent="flex-start" gap={2}>
        <Heading
            size="lg"
            opacity={isEncode ? "1" : "0.4"}
            onClick={() => setIsEncode(true)}
            cursor="pointer"
          >
            Encode
          </Heading>
          <Heading
            size="lg"
            opacity={isEncode ? "0.4" : "1"}
            onClick={() => setIsEncode(false)}
            cursor="pointer"
          >
            Decode
          </Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack spacing={2} h="100%">
          <Box mb={2}>
            <Heading size="sm" pb={2}>
              Method
            </Heading>
            <Select onChange={() => {}} value="RC4">
              <option value="RC4">RC4 Stream Cipher</option>
            </Select>
          </Box>
          <Heading size="sm">Key</Heading>
          <Textarea
            flexGrow="1"
            placeholder="Key here"
            fontFamily="monospace"
            onChange={handleKeyChange}
            value={encryptKey}
          />
        </Stack>
      </CardBody>
    </Card>
  );
}

export default Middle;
