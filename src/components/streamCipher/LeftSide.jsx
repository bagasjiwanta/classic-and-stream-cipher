import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { asciiOnly } from "../helper";
import { FileInput, FilePreview, TextInput } from "../Inputs";

function LeftSide({
  isEncode,
  format,
  setFormat,
  inputText,
  setInputText,
  setInputFile,
}) {
  const [fileInfo, setFileInfo] = useState({
    name: "",
    preview: "",
  });

  const handleFormatChange = (e) => {
    if (format === "text") setInputFile(null);
    else setInputText("");
    setFileInfo({ name: "", preview: "" });
    setFormat(e.target.value);
  };

  const handlePlainTextChange = (e) => {
    const text = e.target.value;
    asciiOnly(text) && setInputText(text);
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

  return (
    <Card width="350px" height="500px">
      <CardHeader pb={2}>
        <Heading as="h2" size="lg" color="blue.500">
          {isEncode ? "Plain" : "Cipher"}
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
              <option value="file">File</option>
            </Select>
          </Box>
          {format == "text" ? (
            <TextInput
              onChange={handlePlainTextChange}
              inputText={inputText}
              uppercase={false}
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
