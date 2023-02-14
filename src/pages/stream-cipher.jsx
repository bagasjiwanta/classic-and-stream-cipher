import Description from "@/components/Description";
import { Box, Container, useMediaQuery } from "@chakra-ui/react";

export default function Page () {
  const [desktop] = useMediaQuery('(min-width: 600px)');
  return (
    <Box as='main' minH='100vh' pb={6} background="linear-gradient(90deg, #d53369 0%, #daae51 100%);">
      <Container maxW="container.xl" h='100%'>
        <Description title="Tucil 2 II4031 Kriptografi dan Koding" description="Stream Cipher"/>
        <Box display='flex' width="100%" justifyContent='center'
        flexDirection={desktop ? 'row' : 'column'} alignItems='center' gap={8}>
        </Box>
      </Container>
    </Box>
  )
}