import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => ({
    plugins: [react()],

    /*
     * Addresses issue with top-level await statement from the i18next-react library.
     * See https://github.com/mozilla/pdf.js/issues/17245
     */
    build: {
        target: "es2022",

        /*
         * For some reason we get a chunk warning that is higher than 500kb. This raises the bar for chunk size
         */
        chunkSizeWarningLimit: 1600
    },
    esbuild: {
        target: "es2022"
    },
    optimizeDeps: {
        esbuildOptions: {
            target: "es2022",
        }
    },

    /*
     *
     */
}))
