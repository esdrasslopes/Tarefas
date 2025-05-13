# Tarefas+

Tarefas+ é um aplicativo web desenvolvido com **Next.js** e **TypeScript**, utilizando **Firebase** para o gerenciamento de dados e **NextAuth.js** para autenticação, com suporte ao **Google Provider**. O aplicativo permite que os usuários se autentiquem com suas contas Google e interajam com uma lista de tarefas.

## Funcionalidades

- **Autenticação:** Os usuários podem fazer login com sua conta Google, usando o NextAuth.js.
- **Postar Tarefas:** Os usuários podem adicionar novas tarefas.
- **Comentar nas Tarefas:** Os usuários podem adicionar comentários nas tarefas postadas.
- **Excluir Comentários:** Os usuários podem excluir seus próprios comentários.
- **Compartilhar Tarefas:** Tarefas podem ser compartilhadas entre os usuários.

## Tecnologias Utilizadas

- **Next.js** com **TypeScript**
- **Firebase** para o gerenciamento de dados em tempo real
- **NextAuth.js** com **Google Provider** para autenticação
- **Sass** para estilização

## Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente necessárias:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
