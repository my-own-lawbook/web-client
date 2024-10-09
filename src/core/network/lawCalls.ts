import {ApiResult, authenticatedApiCall, flattenApiResultList} from "./base/apiCall.ts";
import BookResponse from "./responses/BookResponse.ts";
import {mapBook, mapEntry, mapSection} from "../mapping/lawMapping.ts";
import Book from "../model/Book.ts";
import Entry from "../model/Entry.ts";
import EntryResponse from "./responses/EntryResponse.ts";
import Section from "../model/Section.ts";
import SectionResponse from "./responses/SectionResponse.ts";
import {MemberRole} from "../model/MemberRole.ts";

/**
 * Fetches the books of a user
 */
export async function fetchUserBooks(): Promise<ApiResult<Book[]>> {
    const response = await authenticatedApiCall<BookResponse[]>(
        "/user/law-books/",
        undefined,
        "get"
    )

    return response.map(books => books.map(mapBook))
}

/**
 * Fetches a specific law-book
 * @param id The id
 */
export async function fetchBook(id: number): Promise<ApiResult<Book>> {
    const response = await authenticatedApiCall<BookResponse>(
        `/law-books/${id}/`,
        undefined,
        "get"
    )

    return response.map(mapBook)
}

/**
 * Fetches the entries of a specific book
 * @param id The id of the book
 */
export async function fetchEntriesInBook(id: number): Promise<ApiResult<Entry[]>> {
    const response = await authenticatedApiCall<EntryResponse[]>(
        `/law-books/${id}/law-entries/`,
        undefined,
        'get'
    )

    return response.map(entries => entries.map(mapEntry))
}

/**
 * Gets the sections of a specific entry
 * @param id The id of the section
 */
export async function fetchSectionsForEntry(id: number): Promise<ApiResult<Section[]>> {
    const response = await authenticatedApiCall<SectionResponse[]>(
        `/law-entries/${id}/law-sections/`,
        undefined,
        'get'
    )

    return response.map(entries => entries.map(mapSection))
}

/**
 * Fetches the sections of some given entries
 * @param ids The ids of the entries
 */
export async function fetchSectionsForEntries(ids: number[]): Promise<ApiResult<Map<number, Section[]>>> {
    const sectionsResponses = ids.map(id => {
        return authenticatedApiCall<SectionResponse[]>(
            `/law-entries/${id}/law-sections/`,
            undefined,
            'get'
        )
    })

    const sections = flattenApiResultList(await Promise.all(sectionsResponses))

    if (!sections.isSuccess || !sections.isHttpSuccess)
        return new ApiResult<Map<number, Section[]>>(sections.isSuccess, sections.httpStatus, sections.isHttpSuccess, undefined, sections.errorData)

    const map = new Map<number, Section[]>()

    for (let i = 0; i < ids.length; i++) {
        map.set(ids[i], sections.data![i])
    }

    return new ApiResult<Map<number, Section[]>>(true, sections.httpStatus, true, map, undefined)
}

/**
 * Changes the member role of a specific member of a book
 * @param userId The member id
 * @param bookId The book id
 * @param memberRole The new role
 */
export async function changeMemberRoleApiCall(userId: number, bookId: number, memberRole: MemberRole): Promise<ApiResult<void>> {
    return authenticatedApiCall<void>(
        `/law-books/${bookId}/roles/${userId}/`,
        {role: memberRole.valueOf()},
        'put'
    )
}

/**
 * Removes a user from a book
 * @param userId The member id
 * @param bookId The book id
 */
export async function removeUserFromBookApiCall(userId: number, bookId: number): Promise<ApiResult<void>> {
    return authenticatedApiCall<void>(
        `/law-books/${bookId}/members/${userId}/`,
        undefined,
        'delete'
    )
}

/**
 * Creates a new entry in a book
 * @param name The name of the entry
 * @param key The key of the entry
 * @param bookId The parent book id
 */
export async function createEntryApiCall(name: string, key: string, bookId: number): Promise<ApiResult<Entry>> {
    const response = await authenticatedApiCall<EntryResponse>(
        `/law-books/${bookId}/law-entries/`,
        {key: key, name: name},
        'post'
    )

    return response.map(mapEntry)
}

/**
 * Updates a specific entry
 * @param id The id of the entry
 * @param key The new key
 * @param name The new name
 */
export async function updateEntryApiCall(id: number, key?: string, name?: string): Promise<ApiResult<Entry>> {
    const response = await authenticatedApiCall<EntryResponse>(
        `/law-entries/${id}/`,
        {key: key, name: name},
        'patch'
    )

    return response.map(mapEntry)
}

/**
 * Deletes a specified entry
 * @param id The id
 */
export async function deleteEntryApiCall(id: number): Promise<ApiResult<Entry>> {
    const response = await authenticatedApiCall<EntryResponse>(
        `/law-entries/${id}/`,
        undefined,
        'delete'
    )

    return response.map(mapEntry)
}

/**
 * Updates a specific section
 * @param id The id of the entry
 * @param index The new index
 * @param name The new name
 * @param content The new content
 */
export async function updateSectionApiCall(id: number, index?: string, name?: string, content?: string): Promise<ApiResult<Section>> {
    const response = await authenticatedApiCall<SectionResponse>(
        `/law-sections/${id}/`,
        {index: index, name: name, content: content},
        'patch'
    )

    return response.map(mapSection)
}

/**
 * Creates a new section
 * @param entryId The id of the parent entry
 * @param index The index
 * @param name The name
 * @param content The content
 */
export async function createSectionApiCall(entryId: number, index: string, name: string, content: string): Promise<ApiResult<Section>> {
    const response = await authenticatedApiCall<SectionResponse>(
        `/law-entries/${entryId}/law-sections/`,
        {index: index, name: name, content: content},
        'post'
    )

    return response.map(mapSection)
}

/**
 * Deletes a specified section
 * @param id The id
 */
export async function deleteSectionApiCall(id: number): Promise<ApiResult<Section>> {
    const response = await authenticatedApiCall<SectionResponse>(
        `/law-sections/${id}/`,
        undefined,
        'delete'
    )

    return response.map(mapSection)
}