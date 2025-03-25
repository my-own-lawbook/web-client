export {};

/**
 * Global extension declaration for the window interface.
 */
declare global {

    /**
     * The window type.
     */
    interface Window {

        /**
         * The app config that contains environment variables.
         */
        appConfig: {

            /**
             * The base url of the backend
             */
            apiBaseUrl: string;

            /**
             * The link to show legal information
             */
            legalLink: string | null;

            /**
             * The link to show information about the host
             */
            aboutHostUrl: string | null;
        };
    }
}