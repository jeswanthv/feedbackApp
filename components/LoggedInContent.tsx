import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';

const LoggedInContent = () => {
  const { data: session, status } = useSession();
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Avatar size={'sm'} src={session?.user?.image!} />
      </MenuButton>
      <MenuList>
        <Text m={2}>{session?.user?.email}</Text>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LoggedInContent;
