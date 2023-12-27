import { useSelector } from 'react-redux'
import { memoIdSelector, memoNameSelector, memoNumberSelector, memoPwSelector } from '../../redux/Selector/memoSelectors'
import styled from 'styled-components';

const ProfilePage = () => {

    const idSelector = useSelector(memoIdSelector);
    const pwSelector = useSelector(memoPwSelector);
    const nameSelector = useSelector(memoNameSelector)
    const numberSelector = useSelector(memoNumberSelector)



    return (
        <Container>
            <div className="profile-name" >
                <span>NAME </span>:
                {nameSelector}
            </div >
            <div className="profile-pw">
                <span>PW </span>:
                {pwSelector}
            </div>
            <div className="profile-number">
                <span>NUMBER </span>:
                {numberSelector}
            </div>
            <div className="profile-id">
                <span>ID </span>:
                {idSelector}
            </div>
        </Container >

    )
};

const Container = styled.div`
position: relative;
left: 250px;
top: 250px;`

export default ProfilePage
