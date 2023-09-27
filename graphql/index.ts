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

export const createNewMeetingMutation = `mutation MeetingsCreate($input: MeetingsCreateInput!) {
    meetingsCreate(input: $input) {
      meetings {
        createdBy {
            name
            displayName
            email
            avatarUrl
        }
        range
        date
        id
        updatedAt
        createdAt
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

export const getNewMeetingDate = `
query MeetingsCollection {
    meetingsCollection(last: 1) {
        edges {
          node {
            id
            createdAt
            date
            range
            rescheduleDate
            rescheduleRange
            isAnnounced
            acceptedBy
            rejectedBy
            createdBy {
              name
              displayName
              avatarUrl
              email
            }
          }
        }
      }
  }
`;

export const deleteMeetingDate = `
mutation MeetingsDelete($id: ID!) {
  meetingsDelete(by: {id: $id}) {
    deletedId
  }
}
`;

export const updateMeetingQuery = `
mutation MeetingsUpdate($id: ID!, $input: MeetingsUpdateInput!) {
    meetingsUpdate(by: {id: $id},input: $input) {
      meetings {
        isAnnounced
        rejectedBy
        acceptedBy
      }
    }
  }
`;

export const getUserCollectionQuery = `
query UserCollection($id: [ID!]) {
  userCollection(first:10,filter: {id: { in : $id}}) {
    edges {
      node {
        name
        id
        avatarUrl
      }
    }
  }
}
`;
