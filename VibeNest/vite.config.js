import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
  // ,
  // server: {
  //   host: '172.27.75.82', // This will allow external network access
  //   port: 5173,       // Port remains the same
  // }

})
