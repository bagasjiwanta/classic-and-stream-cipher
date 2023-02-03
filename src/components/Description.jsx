import { Card, CardBody, CardFooter, CardHeader, Center, HStack, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Description() {
  return (
    <Center p={7}>

      <Card w='562px'>
        <CardHeader pb={0}>
          <Heading size='lg'>Tucil 1 II4031 Kriptografi dan Koding</Heading>
        </CardHeader>
        <CardBody pb={0}>
          <HStack justifyContent='space-between'>
            <Text>Dewa Ayu Mutiara Kirana Praba Dewi</Text>
            <Text><b>18220084</b></Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text>I Putu Andika Bagas Jiwanta</Text>
            <Text><b>18220053</b></Text>
          </HStack>
        </CardBody>
        <CardFooter pt={2}>
          <Text style={{textDecoration: 'underline'}}>
            <Link href='https://github.com/bagasjiwanta/tucil-1-kripto' target='_blank' rel='noopener'>Github</Link>
          </Text>
        </CardFooter>
      </Card>
    </Center>
  )
}