interface User {
  id: number;
  name: string;
  email: string;
}

function processUsers(users: User[]): User[] {
  console.log("🔍 Starting user processing...");

  const processedUsers = users.map((user) => {
    // 🔴 Breakpoint aquí - F9 en VSCode
    console.log(`Processing user: ${user.name}`);

    return {
      ...user,
      email: user.email.toLowerCase(),
    };
  });

  console.log("✅ User processing completed");
  return processedUsers;
}

// Datos de prueba
const users: User[] = [
  { id: 1, name: "Ana", email: "ANA@EMAIL.COM" },
  { id: 2, name: "Luis", email: "LUIS@EMAIL.COM" },
];

const result = processUsers(users);
console.log("Final result:", result);