import { Box, Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/Header';
import { prisma } from '../lib/prisma';
import { GetStaticProps } from 'next';
import Feedback, { FeedbackProps } from '../components/Feedback';
import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import FeedbackForm from '../components/FeedbackForm';

// index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.feedback.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: FeedbackProps[];
};

const Home: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const dashboard = (
    <Box m={8}>
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
