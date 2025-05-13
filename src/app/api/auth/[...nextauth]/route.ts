// Importa o NextAuth, biblioteca principal de autenticação
import NextAuth from "next-auth";

// Importa o provedor do Google para autenticação
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Define a chave secreta para assinar os tokens
  secret: process.env.JWT_SECRET,

  // Define os provedores de autenticação que serão usados
  providers: [
    // Configura o provedor do Google
    GoogleProvider({
      // ID do cliente do Google (vem do .env)
      clientId: process.env.GOOGLE_CLIENT_ID!,
      // Chave secreta do cliente do Google (vem do .env)
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Configuração do JWT
  jwt: {
    // Tempo de expiração do token (30 dias)
    maxAge: 60 * 60 * 24 * 30,
  },
};

// Cria o handler do NextAuth com as configurações
const handler = NextAuth(authOptions);

// Exporta o handler como funções GET e POST
// GET: para verificar a sessão
// POST: para iniciar o processo de autenticação
export { handler as GET, handler as POST };
