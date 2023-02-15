import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Description({ title, description, home = false }) {
  return (
    <Center p={7}>
      <Card>
        <CardHeader pb={0}>
          <Heading size="lg">{title}</Heading>
          {!home ? (
            <HStack justifyContent="space-between" alignItems="flex-end" pt={2}>
              <Text fontSize="larger">{description}</Text>
              <Link href="/">
                <Text textDecoration="underline">Back to Home</Text>
              </Link>
            </HStack>
          ) : null}
        </CardHeader>
        <CardBody pb={0}>
          <HStack justifyContent="space-between">
            <Text>Dewa Ayu Mutiara Kirana Praba Dewi</Text>
            <Text>
              <b>18220084</b>
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>I Putu Andika Bagas Jiwanta</Text>
            <Text>
              <b>18220053</b>
            </Text>
          </HStack>
        </CardBody>
        <CardFooter pt={2}>
          <Text style={{ textDecoration: "underline" }}>
            <Link
              href="https://github.com/bagasjiwanta/tucil-1-kripto"
              target="_blank"
              rel="noopener"
            >
              Github
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </Center>
  );
}
