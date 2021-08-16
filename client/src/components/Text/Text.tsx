import styled from 'styled-components';

interface TextProps {
  size?: string; // small, medium, large
  color?: string; // any CSS color
}
const StyledText = styled.div<TextProps>`
  font-size: 17px; // Default font size is medium
  ${(props) => {
    if (props.size === 'small') {
      return `
        font-size: 13px;
        color: ${props.color};
    `;
    } else if (props.size === 'medium') {
      return `
        font-size: 17px;
        color: ${props.color};
    `;
    } else if (props.size === 'large') {
      return `
        font-size: 25px;
        color: ${props.color};
    `;
    }
  }}
`;

export default StyledText;
