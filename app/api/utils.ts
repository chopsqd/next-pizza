import { getServerSession, NextAuthOptions } from "next-auth";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export async function updateCartTotalAmount(token: string) {
  const userCart = await prisma.cart.findFirst({
    where: { token },
    include: {
      items: {
        orderBy: {
          createdAt: "desc"
        },
        include: {
          productVariant: {
            include: {
              product: true
            }
          },
          ingredients: true
        }
      }
    }
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart.items.reduce((acc, { productVariant, ingredients, quantity }) => {
    return acc + (productVariant.price + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) * quantity;
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id
    },
    data: {
      totalAmount
    },
    include: {
      items: {
        orderBy: {
          createdAt: "desc"
        },
        include: {
          productVariant: {
            include: {
              product: true
            }
          },
          ingredients: true
        }
      }
    }
  });
}

export async function getUserSession() {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER" as UserRole
        };
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "text" },
        password: { label: "Пароль", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const values = {
          email: credentials.email
        };

        const findUser = await prisma.user.findFirst({
          where: values
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid || !findUser.verified) {
          return null;
        }

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email }
            ]
          }
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId
            }
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || "User #" + user.id,
            password: hashSync(user.email, 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId
          }
        });

        return true;
      } catch (error) {
        console.error("[SIGN IN ERROR]:", error);
        return false;
      }
    },
    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email!
        }
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    }
  }
};