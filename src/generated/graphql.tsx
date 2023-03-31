import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Scalars['Boolean']>;
  login?: Maybe<UserResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<UserResponse>;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  title?: InputMaybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationLoginArgs = {
  password?: InputMaybe<Scalars['String']>;
  usernameOrEmail?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePostArgs = {
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  allposts?: Maybe<Array<Maybe<Post>>>;
  allusers?: Maybe<Array<Maybe<User>>>;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  user?: Maybe<User>;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<Maybe<FieldError>>>;
  user?: Maybe<User>;
};

export type RegularUserFragment = { __typename?: 'User', id: number, username: string };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string } | null> | null, user?: { __typename?: 'User', id: number, email: string, username: string, createdAt: any, updatedAt: any } | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type RegisterMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string } | null> | null, user?: { __typename?: 'User', id: number, email: string, username: string, createdAt: any, updatedAt: any } | null } | null };

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', allposts?: Array<{ __typename?: 'Post', id: number, createdAt: any, updatedAt: any, title?: string | null } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
      createdAt
      updatedAt
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String, $username: String, $password: String) {
  register(email: $email, username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
      createdAt
      updatedAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const AllPostsDocument = gql`
    query AllPosts {
  allposts {
    id
    createdAt
    updatedAt
    title
  }
}
    `;

export function useAllPostsQuery(options?: Omit<Urql.UseQueryArgs<AllPostsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllPostsQuery, AllPostsQueryVariables>({ query: AllPostsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};