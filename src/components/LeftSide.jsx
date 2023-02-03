import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useAnimationControls } from "framer-motion";
import { useInfo } from "./Logic";

function LeftSide() {
  const [fileInfo, setFileInfo] = useState({
    name: "",
    preview: "",
  });
  const controls = useAnimationControls();
  const {
    format,
    method,
    setFormat,
    inputText,
    setInputText,
    inputFile,
    setInputFile,
    alphabetOnly,
    asciiOnly,
    extendedvigenere,
    isEncode,
  } = useInfo();

  useEffect(() => {
    if (textOnly) {
      setFormat("text");
    }
  }, [method]);

  useEffect(() => {
    if (inputFile.length === 0) {
      setFileInfo({ name: "", preview: "" });
    }
  }, [inputFile]);

  const ref = useRef();
  const handleFormatChange = (e) => setFormat(e.target.value);
  const handlePlainTextChange = (e) => {
    const text = e.target.value;
    if (extendedvigenere) {
      asciiOnly(text) && setInputText(text);
    } else {
      alphabetOnly(text) && setInputText(text.toUpperCase());
    }
  };

  const handleFileChange = async (e) => {
    const buffer = await e.target.files[0].arrayBuffer();
    const text = await e.target.files[0].text();
    const file = new Uint8Array(buffer);
    setFileInfo({
      name: e.target.files[0].name,
      preview: text.slice(0, 1000),
    });
    setInputFile(file);
  };
  const textOnly = !extendedvigenere;

  return (
    <Card width="350px" height="500px">
      <CardHeader pb={2}>
        <Heading as="h2" size="lg" color="blue.500">
          {!isEncode ? "Cipher" : "Plain"}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2} height="100%">
          <Box mb={2}>
            <Heading size="sm" pb={2}>
              Format
            </Heading>
            <Select defaultValue="text" onChange={handleFormatChange}>
              <option value="text">Text</option>
              {textOnly ? null : <option value="file">File</option>}
            </Select>
          </Box>
          {format == "text" ? (
            <>
              <Heading size="sm">Text</Heading>
              <Textarea
                flexGrow="1"
                value={inputText}
                onChange={handlePlainTextChange}
                placeholder="Plain text here"
                style={{
                  fontFamily: "monospace",
                  textTransform: extendedvigenere ? null : "uppercase",
                }}
              />
            </>
          ) : (
            <Box
              borderColor="gray.300"
              borderStyle="dashed"
              borderWidth="2px"
              rounded="md"
              shadow="sm"
              transition="all 150ms ease-in-out"
              _hover={{
                shadow: "md",
                borderColor: "blue.300",
              }}
              height={20}
            >
              <Box position="relative" height="100%" width="100%">
                <Box position="relative" height="100%" width="100%">
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    gap={0}
                    height="100%"
                  >
                    <Text>
                      Click or drag and drop to{" "}
                      {fileInfo.name ? "replace" : "upload"}
                    </Text>
                    {fileInfo.name ? (
                      <Text mt={0} fontWeight={700}>
                        {fileInfo.name}
                      </Text>
                    ) : null}
                  </Stack>
                  <Input
                    type="file"
                    height="100%"
                    width="100%"
                    ref={ref}
                    position="absolute"
                    top="0"
                    left="0"
                    opacity="0"
                    aria-hidden="true"
                    onDragEnter={() => controls.start("hover")}
                    onDragLeave={() => controls.stop()}
                    onChange={handleFileChange}
                  />
                </Box>
              </Box>
            </Box>
          )}
          {format == "text" ? null : (
            <>
              <Heading size="sm">Preview</Heading>
              <Textarea
                pt={0}
                flexGrow="1"
                value={fileInfo.preview}
                style={{ fontFamily: "monospace" }}
                readOnly={true}
              />
            </>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default LeftSide;
