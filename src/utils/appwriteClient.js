import { Client, Databases, Storage, Query, Account, ID, Functions, ExecutionMethod } from 'appwrite';

export const projectId = '67044df70006671b3cfc';
export const databaseId = '670450630037e54037e5';
export const projectsCollectionId = '670450c00010a0a5b2e6';
export const usersCollectionId = '670450b9000492c95c0a';
export const petsCollectionId = '670450d4001a8888bd7e';
export const questionsCollectionId = '670450ed00308d322483';
export const commentsCollectionId = '6704511f000de214c79d';
export const bookshelfCollectionId = '670450e1000449220733';
export const projectImageBucketId = '6704532f0007f337ad70';
export const petImageBucketId = '670452e6003933c892d4';
export const authenticateFunctionId = '6704c5e20002d98cd8b9';

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67044df70006671b3cfc');

const database = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);
const functions = new Functions(client);


export const authenticate = async (accountId) => {
  const functionResponse = await functions.createExecution(authenticateFunctionId, accountId, true, ExecutionMethod.POST);
  console.log(functionResponse);
  return functionResponse;
}

export const register = async (email, password, first_name, last_name) => {
  try {
    const response = await account.create(ID.unique(), email, password);
    if (!response) {
      throw new Error('Failed to create account');
    }
    
    const user = await database.createDocument(databaseId, usersCollectionId, ID.unique(), {
      accountId: response.$id,
      email: email,
      first_name: first_name,
      last_name: last_name,
    });

    await authenticate(response.$id);

    await login(email, password);

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const currentUser = await getUser();
    localStorage.setItem('session', JSON.stringify(session));
    return { session, currentUser };
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    const session = await account.deleteSession('current');
    localStorage.removeItem('session');
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentAccount = async () => {
  try {
    const currentAccount = await account.get();
    // await authenticate(currentAccount.$id);
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async () => {
  try {
    const currentAccount = await getCurrentAccount();
    if (!currentAccount) throw new Error('No account found');
    const currentUser = await database.listDocuments(databaseId, usersCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ]);
    if (!currentUser) throw new Error('No user found');
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
};

export const getProjects = async (project_type) => {
  try {
    const response = await database.listDocuments(databaseId, projectsCollectionId, [Query.equal('project_type', project_type)]);
    return response.documents;
  } catch (error) {
    console.error(error);
  }
};

export const getQuestions = async () => {
  try {
    const response = await database.listDocuments(databaseId, questionsCollectionId);
    return response.documents;
  } catch (error) {
    console.error(error);
  }
};

export const createQuestion = async (question, authorId) => {
  try {
    const newQuestion = await database.createDocument(databaseId, questionsCollectionId, ID.unique(), {
      body: question,
      author: authorId,
    });
    return newQuestion;
  } catch (error) {
    console.error(error);
  }
};

export const createComment = async (comment, authorId, questionId) => {
  try {
    const newComment = await database.createDocument(databaseId, commentsCollectionId, ID.unique(), {
      body: comment,
      author: authorId,
      question: questionId,
    });
    return newComment;
  } catch (error) {
    console.error(error);
  }
};

export const getPets = async (filter_type, filter_value) => {
  if (!filter_type || !filter_value) {
    const response = await database.listDocuments(databaseId, petsCollectionId);
    const allPets = response.documents.map((item, index) => {
      const petPic = storage.getFileView(petImageBucketId, item.imageId);
      
      let lastInitial = '';
      if (item.owner.last_name) {
        lastInitial = item.owner.last_name.charAt(0);
      }
      const owner_name = item.owner.first_name + ' ' + lastInitial + '.';

      if (item.birthday) {
        let birthdayFormatted = new Date(item.birthday).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        });
        item.birthdayFormatted = birthdayFormatted;
      }

      let createdAtFormatted = new Date(item.$createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
      });

      return {
        ...item,
        image: petPic,
        owner_name: owner_name,
        createdAtFormatted: createdAtFormatted,
      };
    });
    console.log(response);
    console.log(allPets);
    return allPets;
  }
  // try {
  //   const response = await database.listDocuments(databaseId, petsCollectionId, [Query.equal(filter_type, filter_value)]);
  //   console.log(response);
  //   return response.documents;
  // } catch (error) {
  //   console.error(error);
  // }
};

export const createPet = async (pet, ownerId, image) => {
  console.log(pet);
  console.log(ownerId);
  console.log(image);
  try {
    const newImage = await storage.createFile(petImageBucketId, ID.unique(), image);
    console.log(newImage);
    const newPet = await database.createDocument(databaseId, petsCollectionId, ID.unique(), {
      name: pet.name,
      pet_type: pet.pet_type,
      breed: pet.breed,
      birthday: pet.birthday,
      owner: ownerId,
      imageId: newImage.$id,
    });
    return newPet;
  } catch (error) {
    console.error(error);
  }
};

export const getBookshelf = async () => {
  try {
    const response = await database.listDocuments(databaseId, bookshelfCollectionId);
    console.log(response);
    return response.documents;
  } catch (error) {
    console.error(error);
  }
};