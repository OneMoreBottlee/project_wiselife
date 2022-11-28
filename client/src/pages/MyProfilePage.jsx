import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import * as S from '../style/MyProfilePageStyle/MyProfilePageStyle';

import MyProfile from '../components/ProfileList/MyProfile';
import ProfileBoxLists from '../components/ProfileList/ProfileBoxLists/ProfileBoxLists';

function MyProfilePage() {
  const [myProfileLists, setMyProfileLists] = useState([
    {
      memberDescription: '',
      memberName: '', // 사용할 모든 데이터? usestate안에 채워야 하는지? 다 쓰지 않아도 데이터를 불러 오는데 문제 없음
      memberBadge: '',
      memberImagePath: '',
      memberChallengePercentage: '',
      memberExpObjRate: '',
      participatingChallenges: [
        {
          memberChallengeId: '',
          challengeId: '',
          challengeTitle: '',
          memberSuccessDay: '',
          objectPeriod: '',
          memberChallengeSuccessRate: '',
          memberReward: '',
          closed: '',
        },
      ],
      endChallenges: [
        {
          memberChallengeId: '',
          challengeId: '',
          challengeTitle: '',
          memberSuccessDay: '',
          objDay: '',
          memberChallengeSuccessRate: '',
          memberReward: '',
          closed: '',
        },
      ],
    },
  ]);

  const params = useParams();
  const name = params.name;

  // get요청
  const getProfile = async () => {
    try {
      axios
        .get(`/member/${name}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
            Authorization:
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.FlS9lUOnWzAi9UFkZOT2UqT4FYmGiiRsST2wfPJErEiQLYYsJw9jSMwYaEwrM1DceWXltVQ5r8o0_OWjFGJa8w',
          },
        })
        .then((response) => {
          const myProfile = response.data;
          console.log('my', myProfile);
          setMyProfileLists(myProfile.data);
        });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  console.log('aoaoao', myProfileLists.participatingChallenges); // 왜 안받아져오는지 데이터 부르는게 잘못된건가?

  return (
    <S.MyProfilePageComponent>
      <MyProfile
        memberImagePath={myProfileLists.memberImagePath}
        memberName={myProfileLists.memberName}
        memberDescription={myProfileLists.memberDescription}
        memberBadge={myProfileLists.memberBadge}
        memberExpObjRate={myProfileLists.memberExpObjRate}
      />
      <ProfileBoxLists
        participatingChallenges={myProfileLists.map((data) => {
          return data.participatingChallenges;
        })}
        endChallenges={myProfileLists.endChallenges}
      />
    </S.MyProfilePageComponent>
  );
}

export default MyProfilePage;
//axios.get => async await로 바꿔오기 숙제
