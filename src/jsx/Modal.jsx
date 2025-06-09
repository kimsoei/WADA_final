import { startOfISOWeek } from "date-fns";
import styled from "styled-components";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const ModalCon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.gray[400]};
    border-radius: 4px;
    overflow: hidden;
    z-index: 9999;
`

const EditCon = styled.div`
    padding: 12px 28px;
    background-color: ${({ theme }) => theme.colors.gray[50]};
    color: ${({ theme }) => theme.colors.gray[800]};

    & > p{
        font-size: 14px;
    }

    cursor: pointer;
`

const DeleteCon = styled.div`

    padding: 12px 28px;
    background-color: ${({ theme }) => theme.colors.gray[50]};
    color: ${({ theme }) => theme.colors.gray[800]};

    & > p{
        font-size: 14px;
    }

    cursor: pointer;
`

function Modal({id, post}){

    const navigate = useNavigate();

    const handleDelete = () =>{
        db.collection('post').doc(id).delete().then(function(){alert('삭제되었습니다.'); navigate("/post");})
    }

    const handleEdit = () =>{
        navigate(`/post/write/${id}`, {
            state: {
                id: id,
                data: post
            }
        });
    }

    return(
        <ModalCon>
            <EditCon onClick={handleEdit}>
                <p>수정하기</p>
            </EditCon>
             <DeleteCon onClick={handleDelete}>
                <p>삭제하기</p>
            </DeleteCon>
        </ModalCon>
    )
}

export default Modal