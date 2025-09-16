import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProgressWidgets from '../ProgressWidgets/ProgressWidgets';
import AiBot from '../AiBot/AiBot';

const VirtualClassroomDashboard: React.FC = () => {
  const [showAiChat, setShowAiChat] = useState(false);

  const studentData = {
    name: "Alex",
    avatar: "🧑‍🎓",
    level: 15,
    xp: 2450,
    nextLevelXp: 3000
  };

  return (
    <DashboardContainer>
      <Header>
        <BackButton to="/">← Home</BackButton>
        <h1>Virtual Classroom Dashboard</h1>
      </Header>

      <MainContent>
        <LeftPanel>
          <StudentCard>
            <AvatarSection>
              <StudentAvatar>{studentData.avatar}</StudentAvatar>
              <StudentInfo>
                <h2>Welcome, {studentData.name}!</h2>
                <Level>Level {studentData.level}</Level>
                <XpBar>
                  <XpFill width={(studentData.xp / studentData.nextLevelXp) * 100} />
                  <XpText>{studentData.xp} / {studentData.nextLevelXp} XP</XpText>
                </XpBar>
              </StudentInfo>
            </AvatarSection>
          </StudentCard>

          <QuickActions>
            <ActionButton primary to="/classroom">
              🎯 Enter Virtual Classroom
            </ActionButton>
            <ActionButtonClickable onClick={() => setShowAiChat(!showAiChat)}>
              🤖 Chat with AI Tutor
            </ActionButtonClickable>
          </QuickActions>

          <ProgressSection>
            <SectionTitle>📊 Your Progress</SectionTitle>
            <ProgressWidgets />
          </ProgressSection>
        </LeftPanel>

        <RightPanel>
          <AchievementsSection>
            <SectionTitle>🏆 Recent Achievements</SectionTitle>
            <AchievementsList>
              <Achievement>
                <span>🥇</span>
                <div>
                  <h4>Math Wizard</h4>
                  <p>Completed 10 algebra problems</p>
                </div>
              </Achievement>
              <Achievement>
                <span>🎨</span>
                <div>
                  <h4>Creative Coder</h4>
                  <p>Built your first React app</p>
                </div>
              </Achievement>
              <Achievement>
                <span>🚀</span>
                <div>
                  <h4>Fast Learner</h4>
                  <p>Completed 5 lessons this week</p>
                </div>
              </Achievement>
            </AchievementsList>
          </AchievementsSection>

          <MonetizationSection>
            <SectionTitle>💰 Content Creation Stats</SectionTitle>
            <StatsGrid>
              <StatCard>
                <StatIcon>📺</StatIcon>
                <StatInfo>
                  <h4>YouTube Channel</h4>
                  <p>$12.50 this week</p>
                  <small>+25% from last week</small>
                </StatInfo>
              </StatCard>
              <StatCard>
                <StatIcon>📱</StatIcon>
                <StatInfo>
                  <h4>TikTok</h4>
                  <p>2,340 views</p>
                  <small>3 videos posted</small>
                </StatInfo>
              </StatCard>
              <StatCard>
                <StatIcon>📝</StatIcon>
                <StatInfo>
                  <h4>Blog Posts</h4>
                  <p>156 reads</p>
                  <small>2 posts this week</small>
                </StatInfo>
              </StatCard>
            </StatsGrid>
          </MonetizationSection>
        </RightPanel>
      </MainContent>

      {showAiChat && (
        <AiBotContainer>
          <AiBot onClose={() => setShowAiChat(false)} />
        </AiBotContainer>
      )}
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  padding: 1rem;
  position: relative;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  color: white;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
`;

const BackButton = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.2);
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.3);
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StudentCard = styled.div`
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 2rem;
  color: #333;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StudentAvatar = styled.div`
  font-size: 4rem;
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ff6b6b, #ffa726);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StudentInfo = styled.div`
  flex: 1;

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.8rem;
  }
`;

const Level = styled.div`
  background: #4ecdc4;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const XpBar = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 20px;
  position: relative;
  overflow: hidden;
`;

const XpFill = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'width'
})<{ width: number }>`
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  height: 100%;
  width: ${props => props.width}%;
  transition: width 0.3s ease;
`;

const XpText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)<{ primary?: boolean }>`
  display: inline-block;
  background: ${props => props.primary 
    ? 'linear-gradient(45deg, #ff6b6b, #ffa726)'
    : 'linear-gradient(45deg, #4ecdc4, #44a08d)'
  };
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const ActionButtonClickable = styled.button`
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const ProgressSection = styled.section`
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 2rem;
  color: #333;
`;

const SectionTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
`;

const AchievementsSection = styled.section`
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 2rem;
  color: #333;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Achievement = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;

  span {
    font-size: 2rem;
  }

  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
`;

const MonetizationSection = styled.section`
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 2rem;
  color: #333;
`;

const StatsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
`;

const StatIcon = styled.div`
  font-size: 2rem;
`;

const StatInfo = styled.div`
  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
  }

  p {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    font-weight: bold;
    color: #4ecdc4;
  }

  small {
    color: #666;
    font-size: 0.8rem;
  }
`;

const AiBotContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

export default VirtualClassroomDashboard;