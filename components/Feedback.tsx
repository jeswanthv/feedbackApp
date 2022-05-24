import React from 'react';
import Router from 'next/router';
import { Stack, Text } from '@chakra-ui/react';
import dateFormat from 'dateformat';

export type FeedbackProps = {
  id: string;
  title: string;
  user: {
    name: string;
    email: string;
  } | null;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const Feedback: React.FC<{ Feedback: FeedbackProps }> = ({ Feedback }) => {
  const userName = Feedback.user ? Feedback.user.name : 'Unknown user';
  const date = dateFormat(Feedback.createdAt, 'mmmm dS, yyyy');
  return (
    <div onClick={() => Router.push('/')}>
      <Stack p='4' boxShadow='lg' m='4' borderRadius='sm'>
        <Stack direction='row' alignItems='center'>
          <Text fontWeight='semibold'>{Feedback.user?.name}</Text>
        </Stack>

        <Text fontWeight='semibold'>{Feedback.title}</Text>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent='space-between'
        >
          <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
            {Feedback.content}
          </Text>
          <Text fontSize={{ base: 'sm' }} fontWeight='bold'>{date}</Text>
        </Stack>
      </Stack>
    </div>
  );
};

export default Feedback;
