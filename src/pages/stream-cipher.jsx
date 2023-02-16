import Description from "@/components/Description";
import { download } from "@/components/helper";
import LeftSide from "@/components/streamCipher/LeftSide";
import Middle from "@/components/streamCipher/Middle";
import RightSide from "@/components/streamCipher/RightSide";
import { mrc4 } from "@/functions/mrc4";
import { Box, Container, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [desktop] = useMediaQuery("(min-width: 600px)");
  const [inputText, setInputText] = useState("");
  const [format, setFormat] = useState("text");
  const [outputFormat, setOutputFormat] = useState('text')
  const [inputFile, setInputFile] = useState([]);
  const [encryptKey, setEncryptKey] = useState("");
  const [outputText, setOutputText] = useState("");
  const downloadFile = () =>
    download(outputText, "application/octet-stream", "result");
  const downloadText = () => download(outputText, "text/plain", "result.txt");

  const props = {
    inputText,
    setInputText,
    format,
    setFormat,
    inputFile,
    setInputFile,
    encryptKey,
    setEncryptKey,
    outputText,
    setOutputText,
    downloadFile,
    downloadText,
    outputFormat,
    setOutputFormat,
  };

  useEffect(() => {
    const set = async () => {
      if (
        encryptKey === "" || 
        (inputText === "" && format !== 'file') ||
        (inputFile.length === 0 && format === 'file')
      ) {
        setOutputText("");
        return;
      }
      let result;
      if (format === 'file') {
        result = await mrc4(inputFile, encryptKey, format, outputFormat);
      } else {
        result = await mrc4(inputText, encryptKey, format, outputFormat);
      }
      setOutputText(result);
    }

    set()
  }, [inputFile, inputText, encryptKey, outputFormat, format]);

  return (
    <Box
      as="main"
      minH="100vh"
      pb={6}
      background="linear-gradient(90deg, #d53369 0%, #daae51 100%);"
    >
      <Container maxW="container.xl" h="100%">
        <Description
          title="Tucil 2 II4031 Kriptografi dan Koding"
          description="Stream Cipher"
        />
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          flexDirection={desktop ? "row" : "column"}
          alignItems="center"
          gap={8}
        >
          <LeftSide {...props} />
          <Middle {...props} />
          <RightSide {...props} />
        </Box>
      </Container>
    </Box>
  );
}
