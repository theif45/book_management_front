/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import RentalList from "../../components/UI/BookDetail/RentalList/RentalList";

const mainContainer = css`
    padding: 10px;
`;

const header = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;

const title = css`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const main = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 10px;
`;

const imgbox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    height: 400px;
    overflow: hidden;
`;

const img = css`
    height: 100%;
`;

const likeButton = css`
    border: none;
    width: 30px;
    height: 30px;
    font-size: 20px;
    background-color: white;
    cursor: pointer;
`;

const BookDetail = () => {
    // useParams는 해당 주소의 :bookId의 값을 가져옴
    const { bookId } = useParams();
    const queryClient = useQueryClient();
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

    const getLikeStatus = useQuery(["getLikeStatus"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            },
            params: {
                userId: queryClient.getQueryData("principal").data.userId,
            },
        };
        const response = await axios.get(`http://localhost:8080/book/${bookId}/like/status`, option);
        return response;
    });

    // get 제외 모든 요청
    const setLike = useMutation(
        async () => {
            const option = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            return await axios.post(
                `http://localhost:8080/book/${bookId}/like`,
                JSON.stringify({
                    userId: queryClient.getQueryData("principal").data.userId,
                }),
                option
            );
        },
        {
            onSuccess: () => {
                //invalidateQueries는 캐시가 유지되는 시간을 만료하고 그 빈 공간을 해당 key의 usequery로 채우기 때문에 새로고침을 하지 않아도 바로 적용됨
                queryClient.invalidateQueries(["getLikeCount"]);
                queryClient.invalidateQueries(["getLikeStatus"]);
            },
        }
    );

    const disLike = useMutation(
        async () => {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
                params: {
                    userId: queryClient.getQueryData("principal").data.userId,
                },
            };
            return await axios.delete(`http://localhost:8080/book/${bookId}/like`, option);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["getLikeCount"]);
                queryClient.invalidateQueries(["getLikeStatus"]);
            },
        }
    );

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
                <h1 css={title}>{getBook.data.data.bookName}</h1>
                <p>
                    분류: {getBook.data.data.categoryName} / 저자명: {getBook.data.data.authorName}/ 출판사:{" "}
                    {getBook.data.data.publisherName}/ 추천:{" "}
                    {getLikeCount.isLoading ? "조회중..." : getLikeCount.data.data}
                </p>
            </header>
            <main css={main}>
                <div css={imgbox}>
                    <img css={img} src={getBook.data.data.coverImgUrl} alt={getBook.data.data.categoryName} />
                </div>
                <div>
                    <RentalList bookId={bookId} />
                </div>
                <div>
                    {getLikeStatus.isLoading ? (
                        ""
                    ) : getLikeStatus.data.data === 0 ? (
                        <button
                            css={likeButton}
                            onClick={() => {
                                setLike.mutate();
                            }}
                        >
                            <AiOutlineLike />
                        </button>
                    ) : (
                        <button
                            css={likeButton}
                            onClick={() => {
                                disLike.mutate();
                            }}
                        >
                            <AiFillLike />
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BookDetail;
