import BookResponse from "../network/responses/BookResponse.ts";
import Book from "../model/Book.ts";
import SectionResponse from "../network/responses/SectionResponse.ts";
import Section from "../model/Section.ts";
import Entry from "../model/Entry.ts";
import EntryResponse from "../network/responses/EntryResponse.ts";

/**
 * Maps a book response to a book
 * @param book The book response
 */
export function mapBook(book: BookResponse): Book {
    return {
        id: book.id,
        name: book.name,
        description: book.description,
        key: book.key
    }
}

/**
 * Maps an entry response to an entry
 * @param entry The response
 */
export function mapEntry(entry: EntryResponse): Entry {
    return entry
}

/**
 * Maps an entry response to an entry
 * @param section The response
 */
export function mapSection(section: SectionResponse): Section {
    return section
}