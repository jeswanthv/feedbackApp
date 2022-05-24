import { prisma } from '../lib/prisma';
import { GetServerSideProps } from 'next';
import React from 'react';
import UserCard, { UserProps } from '../components/UserCard';
import { Box, Button, Grid, GridItem, Stack } from '@chakra-ui/react';
import Header from '../components/Header';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany();
  const data = JSON.parse(JSON.stringify(users));
  return { props: { data } };
};
type Props = {
  data: UserProps[];
};
const users: React.FC<Props> = (props) => {
  return (
    <>
      <Header />
      <Box m={8}>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Link href='/'>
            <Button colorScheme='teal'>Feedbacks</Button>
          </Link>
        </Stack>
        <Grid templateColumns='repeat(3, 1fr)' gap={3}>
          {props.data.map((user) => (
            <GridItem key={user.id} className='user'>
              <UserCard User={user} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default users;
