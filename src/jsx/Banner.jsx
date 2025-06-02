import styled from 'styled-components';

const BaseBanner = styled.div`
    width: 100%;
    max-width: 362px;
    min-height: 72px;
    padding: 0px 12px;
    border-radius: ${({ theme }) => theme.radius.medium};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 12px;
`;

const DarkBanner = styled(BaseBanner)`
    background-color: ${({ theme }) => theme.colors.gray[800]};
    color: #fff;
`;

const LightBanner = styled(BaseBanner)`
    background-color: ${({ theme }) => theme.colors.banner};
    color: ${({ theme }) => theme.colors.gray[900]};
`;

const ConLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const TextWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const BannerTitle = styled.h4`
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
`;

const Description = styled.p`
    font-size: 12px;
    line-height: 150%;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;

function Banner({ type = 'dark', onClick }) {
    const ArrowIcon = '/arrow_right.svg';
    const defaultBanner = type === 'dark';

    const bannerData = defaultBanner
        ? {
            icon: '/BannerPencil.svg',
            title: '프로필 카드를 추가해볼까요?',
            description: '프로필을 작성해 나를 소개해 보세요',
        }
        : {
            icon: '/BannerLady.svg',
            title: '함께 할 파티원을 찾고 있나요?',
            description: '지금 모집글을 작성하여 찾아보세요',
        };

    const BannerWrap = defaultBanner ? DarkBanner : LightBanner;

    return (
        <BannerWrap onClick={onClick}>
            <ConLeft>
                <Icon src={bannerData.icon} />
                <TextWrap>
                    <BannerTitle>{bannerData.title}</BannerTitle>
                    <Description>{bannerData.description}</Description>
                </TextWrap>
            </ConLeft>
            <Icon src={ArrowIcon} />
        </BannerWrap>
    );
}

export default Banner;
