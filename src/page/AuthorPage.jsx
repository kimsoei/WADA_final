import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Header from "../jsx/Header";
import BottomNavigation from "../jsx/BottomNavigation";
import ApplicantWrap from "../jsx/ApplicantWrap ";
import styled from "styled-components";

const PostContentWrap = styled.div`
    width: 100%;
    height: calc(875px - 52px - 58px);
    overflow-y: scroll;
    z-index: -1;
    &::-webkit-scrollbar {
        display: none;
    }
    
`;

const AuthorTitle = styled.h3`
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    background-color: #fff;
    padding: 24px 0 0 20px;
    margin-top: 24px;
`

export default function AuthorPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        db.collection("post")
        .doc(id)
        .get()
        .then((doc) => {
            if (doc.exists) {
            setPost({ id: doc.id, ...doc.data() });
            }
        });
    }, [id]);

    useEffect(() => {
        const mockData = [
        { name: "김지원", imageUrl: "https://i.postimg.cc/SNDGP9x1/image.png" },
        { name: "박하늘", imageUrl: "" },
        ];
        setApplicants(mockData);
    }, []);

    return (
        <>
        <Header type="back" title="모집자 확인" />
        <PostContentWrap>
        <AuthorTitle>지원 현황</AuthorTitle>

        {post ? (
            <ApplicantWrap positions={post.positions} applicants={applicants} />
        ) : (
            <p style={{ padding: "20px" }}>로딩 중...</p>
        )}

        </PostContentWrap>
        <BottomNavigation />
        </>
    );
}
