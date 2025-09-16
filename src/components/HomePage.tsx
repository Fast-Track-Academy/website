import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <Header>
        <Title>🚀 Fast Track Academy</Title>
        <Subtitle>Revolutionizing Education Through AI & Technology</Subtitle>
      </Header>
      
      <HeroSection>
        <WelcomeMessage>
          <h2>Welcome Back, Alex! 👋</h2>
          <p>Ready to continue your learning journey?</p>
        </WelcomeMessage>
        
        <ActionButton to="/dashboard">
          Enter Classroom 🎓
        </ActionButton>
      </HeroSection>
      
      <QuickStats>
        <StatCard>
          <StatIcon>📚</StatIcon>
          <StatText>
            <h3>Active Courses</h3>
            <p>5 in progress</p>
          </StatText>
        </StatCard>
        
        <StatCard>
          <StatIcon>🏆</StatIcon>
          <StatText>
            <h3>Achievements</h3>
            <p>12 earned</p>
          </StatText>
        </StatCard>
        
        <StatCard>
          <StatIcon>🤖</StatIcon>
          <StatText>
            <h3>AI Sessions</h3>
            <p>24 this week</p>
          </StatText>
        </StatCard>
      </QuickStats>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const WelcomeMessage = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const ActionButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(45deg, #ff6b6b, #ffa726);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
`;

const StatText = styled.div`
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
`;

export default HomePage;