import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      const res = await fetch(
        `https://api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/access/project/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/users`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SANITY_MANAGEMENT_TOKEN}`,
          },
        },
      );

      const members = await res.json();
      console.log(members.data[0].memberships);
      const isAdmin = members.data.some(
        (member: any) =>
          member.profile.email === user.email && member.memberships[0].roleNames.includes("administrator"),
      );

      return isAdmin;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
