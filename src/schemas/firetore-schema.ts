export interface UserRoom {
  roomId: string;
  lastMessage: string;
  timestamp: string;
  friendId: string;
}

export interface Message {
  message: string;
  timestamp: string;
  uid: string;
}

//Coleccion de usuarios
export interface UserDB {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  friends: string[];
  rooms: UserRoom[];
}

//coleccion de rooms
export interface RoomDB {
  messages: Message[];
  users: string[];
}

// simulacion de la base de datos

export const users: Record<string, UserDB> = {
  user1: {
    displayName: "John Doe",
    email: "john@example.com",
    photoURL: "https://example.com/john.jpg",
    uid: "user1",
    friends: ["user2"],
    rooms: [
      {
        roomId: "room1",
        lastMessage: "Hello, how are you?",
        timestamp: "2023-09-18T10:00:00Z",
        friendId: "user2",
      },
    ],
  },
  user2: {
    displayName: "Jane Smith",
    email: "jane@example.com",
    photoURL: "https://example.com/jane.jpg",
    uid: "user2",
    friends: ["user1"],
    rooms: [
      {
        roomId: "room2",
        lastMessage: "I'm doing well, thanks!",
        timestamp: "2023-09-18T11:00:00Z",
        friendId: "user1",
      },
    ],
  },
};

//Simulacion de salas
export const rooms: Record<string, RoomDB> = {
  room1: {
    messages: [
      {
        message: "Hello, how are you?",
        timestamp: "2023-09-18T10:00:00Z",
        uid: "user1",
      },
      {
        message: "I'm doing well, thanks!",
        timestamp: "2023-09-18T11:00:00Z",
        uid: "user2",
      },
    ],
    users: ["user1", "user2"],
  },
};
