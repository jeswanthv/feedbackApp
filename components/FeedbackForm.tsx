import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Router from 'next/router';
import React, { useState } from 'react';

export default function FeedbackForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    // Router.reload();
  };
  return (
    <Flex align='center' justify='center' id='contact'>
      <Box borderRadius='lg' m={3} p={3} width='100%'>
        <Box>
          <VStack spacing={3}>
            <Heading
              fontSize={{
                base: '4xl',
                md: '5xl',
              }}
            >
              Feedback
            </Heading>

            <Stack
              spacing={{ base: 4, md: 8, lg: 20 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Box borderRadius='lg' p={8} shadow='base'>
                <form onSubmit={submitData}>
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel>Title</FormLabel>

                      <InputGroup>
                        <Input
                          type='text'
                          name='text'
                          placeholder='title '
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Content</FormLabel>

                      <Textarea
                        name='content'
                        placeholder='content'
                        rows={6}
                        resize='none'
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </FormControl>

                    <Button
                      colorScheme='blue'
                      bg='blue.400'
                      color='white'
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type='submit'
                      // disabled={!content || !title}
                    >
                      Send Feedback
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
