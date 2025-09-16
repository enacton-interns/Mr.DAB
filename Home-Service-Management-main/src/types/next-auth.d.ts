import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  
  interface User {
    role: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user']; 
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
  }
}