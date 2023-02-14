import Description from "@/components/Description";
import LeftSide from "@/components/LeftSide";
import { MutiProvider } from "@/components/Logic";
import Middle from "@/components/Middle";
import RightSide from "@/components/RightSide";
import { Box, Container, useMediaQuery } from "@chakra-ui/react";

export default function Page () {
  const [desktop] = useMediaQuery('(min-width: 600px)');
  
  return (
    <MutiProvider>
      <Box as='main' minH='100vh' pb={6} background="linear-gradient(60deg, #4b6cb7 0%, #182848 100%);">
        <Container maxW="container.xl" h='100%'>
          <Description title="Tucil 1 II4031 Kriptografi dan Koding" description="Classic Cryptography"/>
          <Box display='flex' width="100%" justifyContent='center'
          flexDirection={desktop ? 'row' : 'column'} alignItems='center' gap={8}>
            <LeftSide />
            <Middle />
            <RightSide />
          </Box>
        </Container>
      </Box>
    </MutiProvider>
  )
}
