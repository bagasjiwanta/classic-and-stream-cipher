import { Box, Heading, Input, Stack, Text, Textarea } from "@chakra-ui/react";

export function FileInput({ fileInfo, handleFileChange }) {
  return (
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
              Click or drag and drop to {fileInfo.name ? "replace" : "upload"}
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
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            onChange={handleFileChange}
          />
        </Box>
      </Box>
    </Box>
  );
}

export function FilePreview({ show, fileInfo }) {
  return show ? (
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
  ) : null;
}

export function TextInput({ inputText, onChange, uppercase }) {
  return (
    <>
      <Heading size="sm">Text</Heading>
      <Textarea
        flexGrow="1"
        value={inputText}
        onChange={onChange}
        placeholder="Plain text here"
        style={{
          fontFamily: "monospace",
          textTransform: uppercase ? "uppercase" : null,
        }}
      />
    </>
  );
}
