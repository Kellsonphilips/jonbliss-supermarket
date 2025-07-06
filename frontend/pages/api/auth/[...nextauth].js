import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('NextAuth authorize called with:', credentials);
        
        // Simple test authentication
        if (credentials.email === 'test@jonbliss.com' && credentials.password === 'password') {
          console.log('Authentication successful for test user');
          return { 
            id: 1, 
            name: 'Test User', 
            email: 'test@jonbliss.com',
            role: 'customer'
          };
        }
        
        console.log('Authentication failed');
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
}); 