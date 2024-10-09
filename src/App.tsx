import {createTheme, StyledEngineProvider, ThemeProvider} from "@mui/material";
import AuthScreen from "./auth/AuthScreen.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import AuthProvider from "./core/AuthProvider.tsx";
import Authenticated from "./core/routing/Authenticated.tsx";
import PageWrapper from "./core/routing/PageWrapper.tsx";
import HomeScreen from "./home/HomeScreen.tsx";
import BookDetailScreen from "./law/book-detail/BookDetailScreen.tsx";
import i18next from "i18next";

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                fontFamily: `"Inter", "Sans-Serif", "sans-serif"`
            }
        }
    },
    cssVariables: true
})

const BOOK_ID_NAME = "bookId"

function App() {
    i18next.changeLanguage("de")
    return (
        <StyledEngineProvider injectFirst={true}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AuthProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route
                                    path={`/law-books/:${BOOK_ID_NAME}/*`}
                                    element={
                                        <Authenticated>
                                            <PageWrapper>
                                                <BookDetailScreen/>
                                            </PageWrapper>
                                        </Authenticated>
                                    }
                                />
                                <Route path="/" element={
                                    <Authenticated>
                                        <PageWrapper>
                                            <HomeScreen/>
                                        </PageWrapper>
                                    </Authenticated>
                                }/>
                                <Route path="/auth/*" element={<AuthScreen/>}/>
                            </Routes>
                        </BrowserRouter>
                    </AuthProvider>
                </LocalizationProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App
