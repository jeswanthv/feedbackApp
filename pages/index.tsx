import { Box, Button, Grid, GridItem, Heading, Stack } from '@chakra-ui/react';
import Header from '../components/Header';
import { prisma } from '../lib/prisma';
import { GetServerSideProps, GetStaticProps } from 'next';
import Feedback, { FeedbackProps } from '../components/Feedback';
import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import FeedbackForm from '../components/FeedbackForm';
import Link from 'next/link';

// get feedbacks
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.feedback.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  const feed = JSON.parse(JSON.stringify(data));
  return { props: { feed } };
};

type Props = {
  feed: FeedbackProps[];
};

const Home: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>loading...</div>;
  }
  console.log(props);
  const dashboard = (
    <Box m={8}>
      <Stack
        flex={{ base: 1, md: 0 }}
        justify={'flex-end'}
        direction={'row'}
        spacing={6}
      >
        <Link href='/users'>
          <Button colorScheme='teal'>Users</Button>
        </Link>
      </Stack>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {props.feed.map((feedback) => (
          <GridItem key={feedback.id} className='feedback'>
            <Feedback Feedback={feedback} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
  return (
    <>
      <Header />
      <Heading m={5}>Feedbacks</Heading>
      {session ? (
        session.user?.email === 'jeswanthv001@gmail.com' ? (
          dashboard
        ) : (
          <FeedbackForm />
        )
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
function useColorModeValue(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}
