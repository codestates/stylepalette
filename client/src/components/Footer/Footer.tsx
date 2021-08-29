import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Github } from '@styled-icons/boxicons-logos/Github';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: solid 1px white;
  background-color: #09214c;
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
  font-size: 1.6rem;
  font-family: 'Sacramento', cursive;
`;

const CopyRightWrapper = styled.div`
  color: white;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  color: white;
  padding-left: 12px;
  max-width: 300px;
`;

const GithubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1em;
  @media (max-width: 768px) {
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

const Git = styled(Github)`
  width: 1.5em;
  fill: white;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <LogoWrapper>
        <LogoSpan>StylePalette</LogoSpan>
      </LogoWrapper>
      <CopyRightWrapper>COPYRIGHT © 2021 STYLEPALETTE ALL RIGHTS RESERVED</CopyRightWrapper>
      <MobileWrapper>
        <LogoSpan>StylePalette</LogoSpan>
      </MobileWrapper>
      <GithubWrapper>
        <TeamMember>
          <GithubLink to={{ pathname: 'http://github.com/ggh0223' }} target="_blank">
            김규현 <Git />
          </GithubLink>
        </TeamMember>
        <TeamMember>
          <GithubLink to={{ pathname: 'http://github.com/nayeonseo' }} target="_blank">
            서나연 <Git />
          </GithubLink>
        </TeamMember>
        <TeamMember>
          <GithubLink to={{ pathname: 'http://github.com/wjswlgh96' }} target="_blank">
            전지호 <Git />
          </GithubLink>
        </TeamMember>
      </GithubWrapper>
    </FooterContainer>
  );
}
