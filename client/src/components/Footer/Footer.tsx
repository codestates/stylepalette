import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Text from '../Text/Text';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: solid 1px white;
  background-color: black;
  width: 100%;
  height: 6rem;
  bottom: 0;
`;

const LogoWrapper = styled.span`
  padding-left: 2em;
  @media (max-width: 767px) {
    display: none;
  }
`;

const LogoSpan = styled.span`
  color: white;
  font-size: 1.2rem;
`;

const CopyRightWrapper = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  padding-left: 12px;
  max-width: 300px;
`;

const GithubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1em;
  @media (max-width: 768px) {
    /* flex-direction: row; */
    font-size: 12px;
  }
`;

const GithubLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    opacity: 70%;
  }
`;

const TeamMember = styled.div`
  padding: 3px;
  color: white;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <LogoWrapper>
        <LogoSpan>StylePalette</LogoSpan>
      </LogoWrapper>
      <CopyRightWrapper>
        <Text size="small">COPYRIGHT © 2021 STYLEPALETTE ALL RIGHTS RESERVED</Text>
      </CopyRightWrapper>
      <MobileWrapper>
        <LogoSpan>StylePalette</LogoSpan>
        <Text size="small">COPYRIGHT © 2021 STYLEPALETTE ALL RIGHTS RESERVED</Text>
      </MobileWrapper>
      <GithubWrapper>
        <TeamMember>
          <GithubLink to={{ pathname: 'http://github.com/ggh0223' }} target="_blank">
            김규현 git
          </GithubLink>
        </TeamMember>
        <TeamMember>
          <GithubLink to={{ pathname: 'http://github.com/nayeonseo' }} target="_blank">
            서나연 git
          </GithubLink>
        </TeamMember>
        <TeamMember>
          <GithubLink to={{ pathname: 'http://github.com/wjswlgh96' }} target="_blank">
            전지호 git
          </GithubLink>
        </TeamMember>
      </GithubWrapper>
    </FooterContainer>
  );
}
