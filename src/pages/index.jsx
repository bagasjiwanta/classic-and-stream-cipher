import { Box, Container } from '@chakra-ui/react'
import RightSide from '@/components/RightSide';
import LeftSide from '@/components/LeftSide';
import Middle from '@/components/Middle';

function Home() {
  return (
     <Box as='main' background="linear-gradient(60deg, #4b6cb7 0%, #182848 100%);">
      <Container maxW="container.xl" pt={4} h='100vh'>
        <Box display='flex' flexDirection='row' width="100%" justifyContent='space-around'>
          <LeftSide />
          <Middle />
          <RightSide />
        </Box>
      </Container>
    </Box>
  ) 
}

export default Home;

