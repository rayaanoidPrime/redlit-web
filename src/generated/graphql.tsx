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
  changePassword?: Maybe<UserResponse>;
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Scalars['Boolean']>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  login?: Maybe<UserResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<UserResponse>;
  updatePost?: Maybe<Post>;
};


export type MutationChangePasswordArgs = {
  newPassword?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationForgotPasswordArgs = {
  email?: InputMaybe<Scalars['String']>;
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

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore?: Maybe<Scalars['Boolean']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Post = {
  __typename?: 'Post';
  authorId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  points?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  allposts?: Maybe<PaginatedPosts>;
  allusers?: Maybe<Array<Maybe<User>>>;
  hello?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  user?: Maybe<User>;
};


export type QueryAllpostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
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

export type ChangePasswordMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']>;
  newPassword?: InputMaybe<Scalars['String']>;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string } | null> | null, user?: { __typename?: 'User', id: number, username: string, email: string, createdAt: any, updatedAt: any } | null } | null };

export type CreatePostMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: number, createdAt: any, updatedAt: any, title?: string | null, text?: string | null, authorId?: number | null, points?: number | null } | null };

export type ForgotPasswordMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: boolean | null };

export type LoginMutationVariables = Exact<{
  usernameOrEmail?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
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

export type AllpostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type AllpostsQuery = { __typename?: 'Query', allposts?: { __typename?: 'PaginatedPosts', hasMore?: boolean | null, posts?: Array<{ __typename?: 'Post', id: number, createdAt: any, updatedAt: any, title?: string | null, text?: string | null, points?: number | null, authorId?: number | null } | null> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String, $newPassword: String) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($title: String, $text: String) {
  createPost(title: $title, text: $text) {
    id
    createdAt
    updatedAt
    title
    text
    authorId
    points
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String, $password: String) {
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
export const AllpostsDocument = gql`
    query Allposts($limit: Int, $cursor: String) {
  allposts(limit: $limit, cursor: $cursor) {
    posts {
      id
      createdAt
      updatedAt
      title
      text
      points
      authorId
    }
    hasMore
  }
}
    `;

export function useAllpostsQuery(options?: Omit<Urql.UseQueryArgs<AllpostsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllpostsQuery, AllpostsQueryVariables>({ query: AllpostsDocument, ...options });
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