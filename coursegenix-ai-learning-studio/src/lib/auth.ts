import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

// Extend the Session and JWT types to include custom fields
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			credits: number;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		credits: number;
	}
}

// Define authentication options
export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	cookies: {
		sessionToken: {
			name: `next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production", // Only use secure in production
			},
		},
		callbackUrl: {
			name: `next-auth.callback-url`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
			},
		},
		csrfToken: {
			name: `next-auth.csrf-token`,
			options: {
				httpOnly: true,
				sameSite: "lax", 
				path: "/",
				secure: process.env.NODE_ENV === "production",
			},
		},
	},
	callbacks: {
		jwt: async ({ token }) => {
			try {
				// Use token.sub (subject) as the user ID, which is set by PrismaAdapter
				const dbUser = await prisma.user.findUnique({
					where: { id: token.sub },
					select: { id: true, credits: true }, // Fetch only required fields
				});

				if (dbUser) {
					token.id = dbUser.id;
					token.credits = dbUser.credits;
				} else {
					console.warn(`No user found for ID: ${token.sub}`);
					// Optionally, you could throw an error or set default values
				}
			} catch (error) {
				console.error("Error fetching user in JWT callback:", error);
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				// Map token data to session, ensuring all required fields are set
				session.user = {
					id: token.id,
					name: token.name,
					email: token.email,
					image: token.picture,
					credits: token.credits,
				};
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET as string,
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
};

// Utility function to get the server session
export const getAuthSession = async () => {
	return await getServerSession(authOptions);
};
