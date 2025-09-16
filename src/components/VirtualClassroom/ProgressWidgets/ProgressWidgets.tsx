import React from 'react';
import styled from 'styled-components';

interface Subject {
  name: string;
  progress: number;
  icon: string;
  modules: number;
  completedModules: number;
}

const ProgressWidgets: React.FC = () => {
  const subjects: Subject[] = [
    {
      name: "Mathematics",
      progress: 75,
      icon: "🧮",
      modules: 12,
      completedModules: 9
    },
    {
      name: "Programming",
      progress: 60,
      icon: "💻",
      modules: 15,
      completedModules: 9
    },
    {
      name: "Science",
      progress: 85,
      icon: "🔬",
      modules: 10,
      completedModules: 8
    },
    {
      name: "Digital Art",
      progress: 40,
      icon: "🎨",
      modules: 8,
      completedModules: 3
    }
  ];

  const recentActivities = [
    {
      subject: "Mathematics",
      activity: "Completed Algebra Quiz",
      time: "2 hours ago",
      icon: "✅"
    },
    {
      subject: "Programming",
      activity: "Built React Component",
      time: "1 day ago",
      icon: "🚀"
    },
    {
      subject: "Science",
      activity: "Chemistry Lab Report",
      time: "2 days ago",
      icon: "📝"
    }
  ];

  return (
    <ProgressContainer>
      <SubjectsGrid>
        {subjects.map((subject, index) => (
          <SubjectCard key={index}>
            <SubjectHeader>
              <SubjectIcon>{subject.icon}</SubjectIcon>
              <SubjectInfo>
                <SubjectName>{subject.name}</SubjectName>
                <ModuleCount>
                  {subject.completedModules}/{subject.modules} modules
                </ModuleCount>
              </SubjectInfo>
            </SubjectHeader>
            
            <ProgressBar>
              <ProgressFill progress={subject.progress} />
              <ProgressText>{subject.progress}%</ProgressText>
            </ProgressBar>
          </SubjectCard>
        ))}
      </SubjectsGrid>

      <RecentActivity>
        <ActivityTitle>📈 Recent Activity</ActivityTitle>
        <ActivityList>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityContent>
                <ActivitySubject>{activity.subject}</ActivitySubject>
                <ActivityDescription>{activity.activity}</ActivityDescription>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const SubjectCard = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 1.5rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: #4ecdc4;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const SubjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SubjectIcon = styled.div`
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubjectInfo = styled.div`
  flex: 1;
`;

const SubjectName = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #333;
`;

const ModuleCount = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

const ProgressBar = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 15px;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'progress'
})<{ progress: number }>`
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.6s ease;
  border-radius: 10px;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
`;

const RecentActivity = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 1.5rem;
`;

const ActivityTitle = styled.h4`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #333;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem;
  background: white;
  border-radius: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const ActivityIcon = styled.div`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #ff6b6b, #ffa726);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivitySubject = styled.div`
  font-weight: bold;
  color: #4ecdc4;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ActivityDescription = styled.div`
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  color: #666;
  font-size: 0.8rem;
`;

export default ProgressWidgets;