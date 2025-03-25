/**
 * Response body for a law-book
 */
type BookResponse = {

    /**
     * The id
     */
    id: number,

    /**
     * The key
     */
    key: string,

    /**
     * The name
     */
    name: string,

    /**
     * The description
     */
    description: string,

    /**
     * Whether a user is a member of the book, or only has access to it due to an invitation
     */
    isMemberOf: boolean

}

export default BookResponse