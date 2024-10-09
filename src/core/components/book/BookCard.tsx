import Book from "../../model/Book.ts";
import {Box, ButtonBase, Paper, Typography} from "@mui/material";
import './BookCard.css'

/**
 * Props for the book card
 */
type BookCardProps = {

    /**
     * The actual book
     */
    book: Book,

    /**
     * The on click handler
     */
    onClick: (book: Book) => void

}

/**
 * Component to display basic information about a law-book
 */
export default function BookCard(props: Readonly<BookCardProps>) {
    return (
        <ButtonBase className="book-card-ripple" onClick={() => props.onClick(props.book)}>
            <Paper className="book-card">
                <Box
                    className="key-container"

                    sx={{
                        background: colorForBookId(props.book.id)
                    }}
                >
                    <Typography className="key-display">
                        {props.book.key}
                    </Typography>
                </Box>

                <Box className="info-container">
                    <Typography className="info-title" variant={"body1"}>
                        {props.book.name}
                    </Typography>

                    <Typography className="info-description" variant={"body2"}>
                        {props.book.description}
                    </Typography>
                </Box>
            </Paper>
        </ButtonBase>
    )

}

const cardColors: string[] = ["#FFB5E8", "#AFF8D8", "#FFABAB", "#DCD3FF", "#F6A6FF", "#ACE7FF"]

/**
 * Creates a color for the specific book id to ensure that a book is always assigned the same color
 * @param id The id of the book
 */
function colorForBookId(id: number): string {
    return cardColors[id % cardColors.length]
}