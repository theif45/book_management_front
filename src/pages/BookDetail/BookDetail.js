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

const header = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const BookDetail = () => {
    // useParams는 해당 주소의 :bookId의 값을 가져옴
    const { bookId } = useParams();
    // useQuery로 비동기 처리인 axios.get 요청을 관리
    const getBook = useQuery(["getBook"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            },
        };
        const response = await axios.get(`http://localhost:8080/book/${bookId}`, option);
        return response;
    });

    const getLikeCount = useQuery(["getLikeCount"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            },
        };
        const response = await axios.get(`http://localhost:8080/book/${bookId}/like`, option);
        return response;
    });
    // response를 가져오는 동안 isLoading이 true가 됨
    if (getBook.isLoading) {
        return <div>Loading...</div>;
    }
    // loading이 완료되면 해당 JSX가 rendering됨
    // getBook은 useQuery의 정보를 가지고 있으며 그 안의 data에서 요청한 값을 가져옴
    return (
        <div css={mainContainer}>
            <Sidebar />
            <header css={header}>
                <h1>{getBook.data.data.bookName}</h1>
                <p>
                    분류: {getBook.data.data.categoryName} / 저자명: {getBook.data.data.authorName}/ 출판사: {getBook.data.data.publisherName}/ 추천:{" "}
                    {getLikeCount.isLoading ? "조회중..." : getLikeCount.data.data}
                </p>
            </header>
            <main>
                <div>
                    <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.categoryName} />
                </div>
                <div></div>
                <div>
                    <button></button>
                </div>
            </main>
        </div>
    );
};

export default BookDetail;
