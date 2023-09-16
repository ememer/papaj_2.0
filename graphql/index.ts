export const createUserMutation = `mutation CreateUser($input: UserCreateInput!){
        userCreate(input: $input){
            user {
                name,
                displayName,
                email,
                avatarUrl
                id
            }
        }
    }
`;


export const getUserQuery = `
query GetUser($email: String!) {
    user(by: { email: $email }) {
        id
        name
        displayName
        email
        avatarUrl
    }
 }
`;
