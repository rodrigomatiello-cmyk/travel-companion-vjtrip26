# Travel Companion · Dubai + Japão 2026

Este pacote transforma o arquivo criado no Claude em um app web/PWA para usar no iPhone.

## O que esta versão faz

- Roda fora do Claude, como site/app web.
- Pode ser publicada gratuitamente na Vercel.
- Pode sincronizar Rodrigo, Luciana e Luísa via Firebase/Firestore gratuito.
- Se o Firebase não estiver configurado, funciona em modo teste local no próprio aparelho.

## Passo 1 — Criar Firebase gratuito

1. Acesse Firebase Console.
2. Crie um projeto.
3. Entre em **Build > Firestore Database**.
4. Crie o banco em modo produção ou teste.
5. Vá em **Rules** e cole o conteúdo de `firestore.rules.txt`.
6. Publique as regras.
7. Vá em **Project settings > Your apps > Web app**.
8. Crie um Web App e copie o `firebaseConfig`.

Você precisará transformar o `firebaseConfig` nestas variáveis:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_TRIP_DOC_ID=vjtrip26-familia
```

## Passo 2 — Publicar grátis na Vercel

1. Crie um repositório novo no GitHub.
2. Suba todos estes arquivos para o repositório.
3. Acesse Vercel e clique em **Add New Project**.
4. Importe o repositório.
5. Em **Environment Variables**, cadastre as variáveis `VITE_FIREBASE_...` acima.
6. Clique em **Deploy**.

Configuração esperada:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Passo 3 — Colocar no iPhone como app

Em cada iPhone:

1. Abrir o link da Vercel no Safari.
2. Tocar no botão de compartilhar.
3. Tocar em **Adicionar à Tela de Início**.
4. Nomear como **Viagem 2026**.

## Segurança

Não coloque no app:

- passaporte completo;
- foto de documento;
- cartão;
- senhas;
- dados de seguro completos.

Use apenas lembretes operacionais.

## Teste rápido local, se quiser testar no computador

```bash
npm install
cp .env.example .env.local
npm run dev
```

Se não preencher Firebase, o app abre em modo local, sem sincronizar entre aparelhos.
