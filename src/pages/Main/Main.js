/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import BookCard from "../../components/UI/BookCard/BookCard";
import { useQuery } from "react-query";
import axios from "axios";

const mainContainer = css`
    padding: 10px;
`;
const header = css`
    display: flex;
    justify-content: space-between;
    height: 100px;
`;
const main = css`
    display: flex;
    flex-wrap: wrap;
    height: 750px;
    overflow-y: auto;
`;

const Main = () => {
    const [searchParam, setSearchParam] = useState({
        page: 1,
        categoryId: 0,
        searchValue: "",
    });
    const [refresh, setRefresh] = useState(false);
    const [books, setBooks] = useState([]);
    const lastBookRef = useRef();

    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("last book intersecting");
                    setRefresh(true);
                }
            });
        };
        const observer = new IntersectionObserver(observerService, { threshold: 1 });
        observer.observe(lastBookRef.current);
    }, []);

    const option = {
        params: searchParam,
        headers: {
            Authorization: localStorage.getItem("accessToken"),
        },
    };

    const searchBooks = useQuery(
        ["searchBooks"],
        async () => {
            const response = await axios.get("http://localhost:8080/books", option);
            return response;
        },
        {
            onSuccess: (response) => {
                if (refresh) {
                    setRefresh(false);
                }
                setBooks([...books, ...response.data]);
                setSearchParam({ ...searchParam, page: searchParam.page + 1 });
            },
            enabled: refresh,
        }
    );

    return (
        <div css={mainContainer}>
            <Sidebar />
            <header css={header}>
                <div>도서검색</div>
                <div>
                    <input type="search" />
                </div>
            </header>
            <main css={main}>
                {books.length > 0 ? books.map((book) => <BookCard key={book.bookId} book={book} />) : ""}
                <div ref={lastBookRef}></div>
            </main>
        </div>
    );
};

export default Main;
