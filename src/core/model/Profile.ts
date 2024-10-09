import {Dayjs} from "dayjs";
import Gender from "./Gender.ts";

/**
 * Model for the profile
 */
export default interface Profile {

    /**
     * The first name
     */
    firstName: string,

    /**
     * The last name
     */
    lastName: string,

    /**
     * The birthday
     */
    birthday: Dayjs,

    /**
     * The gender
     */
    gender: Gender

}