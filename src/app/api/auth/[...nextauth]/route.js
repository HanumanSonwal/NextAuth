import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'; // Import CredentialsProvider

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: { label: 'Username', type: 'text' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   authorize: async (credentials) => {
    //     const user = { id: 1, name: 'User', email: 'user@example.com' };
    //     if (credentials.username === 'user@example.com' && credentials.password === 'password') {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };

