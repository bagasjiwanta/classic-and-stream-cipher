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
import { asciiOnly, alphabetOnly } from "../helper";
import { FileInput, FilePreview, TextInput } from "../Inputs";

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
            <TextInput
              onChange={handlePlainTextChange}
              inputText={inputText}
              uppercase={!extendedvigenere}
            />
          ) : (
            <FileInput
              fileInfo={fileInfo}
              handleFileChange={handleFileChange}
            />
          )}
          <FilePreview show={format == "file"} fileInfo={fileInfo} />
        </Stack>
      </CardBody>
    </Card>
  );
}

export default LeftSide;
