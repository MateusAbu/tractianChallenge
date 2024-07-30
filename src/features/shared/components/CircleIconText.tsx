import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #2188FF;
  color: white;
  font-weight: bold;
  margin-right: 8px;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-size: large;
  color: #77818C;
  display: flex;
  align-items: center;
`;

interface CircleTextProps {
  text: string;
}

const CircleIconText: React.FC<CircleTextProps> = ({ text }) => {
  return (
    <TextContainer>
      <Circle>{text.charAt(0).toUpperCase()}</Circle>
      <Text>{text}</Text>
    </TextContainer>
  );
};

export default CircleIconText;
