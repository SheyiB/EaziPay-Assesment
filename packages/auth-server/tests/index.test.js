const { GraphQLClient } = require('graphql-request');

const dotenv = require('dotenv')

const usermodel = require('../src/model')

dotenv.config({ path: './config/.env'})

const endpoint = `http://localhost:${process.env.PORT}/api`; 

// Initialize a GraphQL client
const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: process.env.MOCK_AUTH, 
  },
});

// Test cases
describe('Authentication and User Query', () => {
  let userId; 

  it('should sign up a new user', async () => {
    const signUpMutation = `
      mutation {
        signUp(
          name: "EmmaCBreezy",
          email: "emmad@breezy.com",
          number: "12345",
          password: "123456"
        )
      }
    `;

    const response = await client.request(signUpMutation);
    expect(response).toBeDefined();
    expect(response.data.signUp).toBeString();
  });

  it('should sign in an existing user', async () => {
    const signInMutation = `
      mutation {
        signIn(
          name: "EmmaCBreezy",
          password: "123456"
        )
      }
    `;

    const response = await client.request(signInMutation);
    expect(response).toBeDefined();
    expect(response.data.signIn).toBeString() 
  });

  it('should get user account information', async () => {
    const getUserQuery = `
      query {
        user {
          email
          password
          name
          id
        }
      }
    `;

    const response = await client.request(getUserQuery);
    expect(response).toBeDefined();
    expect(response.user).toBeDefined();
    expect(response.user.email).toBe('emmad@breezy.com'); 
    expect(response.user.name).toBe('EmmaCBreezy'); 

    userId = response.user.id;
  });

  afterAll(async () => {
    
    usermodel.User.findByIdAndDelete(userId)
  });
});
