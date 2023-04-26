/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const mainContainer = css`
    padding: 10px;
`;

const BookDetail = () => {
    const { bookId } = useParams();
    const getBook = useQuery(["getBook"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            },
        };
        const response = await axios.get(`https://localhost:8080/book/${bookId}`, option);
        return response;
    });

    if (getBook.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div css={mainContainer}>
            <Sidebar />
            <header>
                <h2>{getBook.data.data.bookName}</h2>
                <p>
                    분류: {getBook.data.data.CategoryName} / 저자명: {getBook.data.data.authorName} / 출판사: {getBook.data.data.publisherName}
                </p>
            </header>
            <main>
                <div>
                    <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.CategoryName} />
                </div>
            </main>
        </div>
    );
};

export default BookDetail;
