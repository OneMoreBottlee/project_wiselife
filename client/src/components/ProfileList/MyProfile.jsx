import ChartBar from './ChartBar';
import ProfileImage from './ProfileImage';
import { GiMedallist } from 'react-icons/gi';
import * as S from '../../style/MyProfilePageStyle/MyProfilePageStyle';

function MyProfile() {
  return (
    <S.MyProfileComponent>
      <header className="profile-info">
        <ProfileImage />
        <div>
          <S.ProfileList>
            <p>닉네임</p>
            <p>인기도0 ❤️</p>
          </S.ProfileList>
          <div className="profile-list">
            <p>
              <GiMedallist />
            </p>
            <p>챌린지성공률: 72%</p>
          </div>
          <input
            className="readonly-box"
            placeholder="자기소개를 입력해 주세요."
            readOnly
          />
        </div>
        <S.ProfileBar>
          <div className="buttonLists">
            <S.ProfileEditButton>환급받기</S.ProfileEditButton>
            <S.ProfileEditButton>edit</S.ProfileEditButton>
          </div>
          <ChartBar />
        </S.ProfileBar>
      </header>
    </S.MyProfileComponent>
  );
}

export default MyProfile;
