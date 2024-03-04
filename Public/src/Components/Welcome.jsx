import React from 'react';
import styled from 'styled-components';
import robot from '../assests/robot.gif';

function Welcome({ currentUser }) {
  if (!currentUser) {
    return null;
  }

  return (
    <Container>
      <img src={robot} alt="robotimg" />
      <div className="heading">
        <h1>
          Welcome<span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to start messaging</h3>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 30rem;
  }
  span {
    color: #4e00ff;
  }
`;

export default Welcome;
