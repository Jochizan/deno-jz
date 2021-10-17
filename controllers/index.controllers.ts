import { Request, Response, Body } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

interface User {
  id: string;
  name: string;
}

let _users: User[] = [
  {
    id: '1',
    name: 'Ryan Ray'
  }
];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: 'successful query',
    _users
  };
};

export const getUserById = ({
  params,
  response
}: {
  params: { id: string };
  response: Response;
}) => {
  const userFound = _users.find((user) => user.id === params.id);

  if (userFound) {
    response.status = 200;
    response.body = {
      message: 'You got a single user',
      userFound
    };
  } else {
    response.status = 404;
    response.body = {
      message: 'User not found'
    };
  }
};

interface userBody {
  name: string;
  id: string;
}

export const createUser = async ({
  request,
  response
}: {
  request: Request;
  response: Response;
}) => {
  const body: Body = request.body();

  if (!request.hasBody) {
    response.status = 400;
    return (response.body = {
      message: 'Body is required'
    });
  }

  const newUser: userBody = await body.value;

  newUser.id = v4.generate();

  _users.push(newUser);

  response.status = 200;

  response.body = {
    message: 'New user created',
    newUser
  };
};

export const updateUserById = async ({
  params,
  request,
  response
}: {
  params: { id: string };
  request: Request;
  response: Response;
}) => {
  const userFound = _users.find((user) => user.id === params.id);

  if (!userFound) {
    response.status = 200;
    response.body = {
      message: 'User not found'
    };
  } else {
    const body = request.body();
    const updatedUser = await body.value;

    _users = _users.map((user) =>
      user.id === params.id ? { ...user, ...updatedUser } : user
    );

    response.status = 200;
    response.body = {
      message: 'Update user successfully',
      _users
    };
  }
};

export const deleteUserById = ({
  params,
  response
}: {
  params: { id: string };
  response: Response;
}) => {
  _users = _users.filter((user) => user.id !== params.id);

  response.status = 201;
  response.body = {
    message: 'User deleted successfully',
    _users
  };
};
