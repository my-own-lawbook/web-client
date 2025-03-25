/**
 * Represents a law-book
 */
type Book = {

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
     * Whether the user is a member of the book, or only has access to it due to an invitation
     */
    isMemberOf: boolean

}

export default Book