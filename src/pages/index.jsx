import { Box, Container, useMediaQuery } from '@chakra-ui/react'
import RightSide from '@/components/RightSide';
import LeftSide from '@/components/LeftSide';
import Middle from '@/components/Middle';
import Description from '@/components/Description';

function Home() {
  const [desktop] = useMediaQuery('(min-width: 600px)');
  return (
     <Box as='main' minH='100vh' pb={6} background="linear-gradient(60deg, #4b6cb7 0%, #182848 100%);">
      <Container maxW="container.xl" h='100%'>
        <Description />
        <Box display='flex' width="100%" justifyContent='center'
        flexDirection={desktop ? 'row' : 'column'} alignItems='center' gap={8}>
          <LeftSide />
          <Middle />
          <RightSide />
        </Box>
      </Container>
    </Box>
  ) 
}

export default Home;
  
