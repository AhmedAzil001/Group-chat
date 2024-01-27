import {
    Box,
    Button,
    HStack,
    Heading,
    Stack,
    VStack,
    Text,
  } from '@chakra-ui/react';
  import React from 'react';
  import {
    AiFillMail,
    AiFillLinkedin,
    AiFillGithub,
    AiFillInstagram,
  } from 'react-icons/ai';
  
  const Footer = () => {
    return (
      <Box  minH={'40'} p={'16'} color={'blaclAlpha300'}>
        <Stack direction={['column', 'row']}>
          <VStack w={'full'}>
            <Heading
              size={'sm'}
              textTransform={'uppercase'}
              textAlign={['center', 'left']}
            >
              Social Media
            </Heading>
            <HStack m={'5'}>
              <Button variant={'link'} colorScheme={'purple'}>
                <a href="https://www.instagram.com/azil__ahmed_/" target="blank">
                  <AiFillInstagram size={'30'} />
                </a>
              </Button>
              <Button variant={'link'} colorScheme={'purple'}>
                <a href="https://github.com/AhmedAzil001" target="blank">
                  <AiFillGithub size={'30'} />
                </a>
              </Button>
              <Button variant={'link'} colorScheme={'purple'}>
                <a
                  href="https://www.linkedin.com/in/azil-ahmed-30a571233/"
                  target="blank"
                >
                  <AiFillLinkedin size={'30'} />
                </a>
              </Button>
              <Button variant={'link'} colorScheme={'purple'}>
                <a
                  href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                  target="blank"
                >
                  <AiFillMail size={'30'} />
                </a>
              </Button>
            </HStack>
            <Text>developed by Azil Ahmed</Text>
          </VStack>
        </Stack>
      </Box>
    );
  };
  
  export default Footer;
  