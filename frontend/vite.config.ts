import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

interface ICommandProps {
  mode: string
}

export default ({ mode }: ICommandProps) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = parseInt(env.VITE_FRONTEND_PORT);
  return defineConfig({
    plugins: [
      react({
        babel: {
          plugins: [
            ['babel-plugin-react-compiler'],
          ],
        },
      }),
      tailwindcss(),
    ],
    server: { port: port },
  });
};