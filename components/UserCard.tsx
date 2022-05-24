import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import Header from './Header';

export type UserProps = {
  id: string;
  image: string;
  name: string;
  email: string;
  content: string;
};

const UserCard: React.FC<{ User: UserProps }> = (User) => {
  const { image, name, email } = User.User;
  console.log(User);
  return (
    <>
    <Center py={6}>
      <Box
        maxW={'450px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          src={
            image
          }
          mb={4}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {email}
        </Text>
      </Box>
    </Center>
    </>
  );
};
export default UserCard;
