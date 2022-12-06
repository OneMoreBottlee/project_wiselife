import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Container,
  ChallengeViewCount,
  Recruitment,
  ChallengeDescriptionWrapper,
  ChallengeDescription,
  Certification,
  CertificationWrapper,
  CertificationDescription,
  CertificationImage,
  Image,
  Review,
  ButtonWrapper,
} from '../../style/ChallengeDetail/ChallengeDetailStyle';

import Swal from 'sweetalert2';
import Masonry from 'react-responsive-masonry';

export default function ChallengeDetail({ challengeData }) {
  // console.log('challengeData>>>', challengeData);
  const parmas = useParams();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState({ image: '', i: 0 });

  const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  //로컬스토리지값
  const authorizationToken = localStorage.getItem('authorizationToken');

  //url 파라미터값 받아오기
  const challengeId = Number(parmas.id);

  // 참여하기 클릭시 페이지 이동
  const NavigateMPaymentPage = async () => {
    localStorage.setItem('challengeId', challengeData.challengeId);
    if (challengeData.challengeFeePerPerson !== 0) {
      const response = await Swal.fire({
        icon: 'question',
        title: '재확인',
        text: `${challengeData.challengeTitle}에 도전 하시겠습니까?`,
        showCancelButton: true,
        confirmButtonText: '도전!',
        cancelButtonText: '다음에...',
      });
      if (response.isConfirmed) {
        try {
          await axios
            .post(
              `/challenges/participate/${challengeId}`,
              {
                data: '',
              },
              {
                headers: {
                  'ngrok-skip-browser-warning': 'none',
                  Authorization: authorizationToken,
                },
              }
            )
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: `${challengeData.challengeTitle}에 참가하셨습니다.`,
              });
              window.location.reload();
            });
          return navigate(`/detail/${challengeData.challengeId}`);
        } catch (error) {
          const errorMessage = error.response.data.error.message;
          console.log('error', errorMessage);

          if ('This challenge has max member' === errorMessage) {
            Swal.fire({
              icon: 'info',
              title: '챌린지 정원이 다 찼습니다.',
              text: '다음에 이용해주세요.',
            });
          }

          if ('You need to charge money' === errorMessage) {
            Swal.fire({
              icon: 'info',
              title: '포인트를 충전해주세요.',
            });
            navigate('/ordersheet');
          }

          if (error.response.data.status === 401) {
            try {
              const responseToken = await axios.get('/token', {
                headers: {
                  'ngrok-skip-browser-warning': 'none',
                  refresh: localStorage.getItem('refreshToken'),
                },
              });
              await localStorage.setItem(
                'authorizationToken',
                responseToken.headers.authorization
              );
              await localStorage.setItem(
                'test',
                responseToken.headers.authorization
              );
            } catch (error) {
              console.log('재요청 실패', error);
            }
          }
        }
      }
    } else {
      const response = await Swal.fire({
        icon: 'question',
        title: '재확인',
        text: `${challengeData.challengeTitle}에 도전 하시겠습니까?`,
        showCancelButton: true,
        confirmButtonText: '도전!',
        cancelButtonText: '다음에...',
      });
      if (response.isConfirmed) {
        try {
          await axios
            .post(
              `/challenges/participate/${challengeId}`,
              {
                data: '',
              },
              {
                headers: {
                  'ngrok-skip-browser-warning': 'none',
                  Authorization: authorizationToken,
                },
              }
            )
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: `${challengeData.challengeTitle}에 참가하셨습니다.`,
              });
              window.location.reload();
            });
          return navigate(`/detail/${challengeData.challengeId}`);
        } catch (error) {
          const errorMessage = error.response.data.error.message;
          console.log('error', errorMessage);

          if ('This challenge has max member' === errorMessage) {
            Swal.fire({
              icon: 'info',
              title: '챌린지 정원이 다 찼습니다.',
              text: '다음에 이용해주세요.',
            });
          }
          if (error.response.data.status === 401) {
            try {
              const responseToken = await axios.get('/token', {
                headers: {
                  'ngrok-skip-browser-warning': 'none',
                  refresh: localStorage.getItem('refreshToken'),
                },
              });
              await localStorage.setItem(
                'authorizationToken',
                responseToken.headers.authorization
              );
              await localStorage.setItem(
                'test',
                responseToken.headers.authorization
              );
            } catch (error) {
              console.log('재요청 실패', error);
            }
          }
        }
      }
    }
  };

  const viewImage = (image, i) => {
    setImageData({ image, i });
  };

  const imageAction = (action) => {
    let i = imageData.i;
    if (action === 'next-image') {
      setImageData({ image: imageData[i + 1], i: i + 1 });
    }
    if (action === 'previous-image') {
      setImageData({ image: imageData[i - 1], i: i - 1 });
    }
    if (!action) {
      setImageData({ image: '', i: 0 });
    }
  };

  const now = new Date();
  const startDate = new Date(challengeData.challengeStartDate);
  const distance = now.getTime() - startDate.getTime();
  const left = Math.abs(Math.floor(distance / (1000 * 60 * 60 * 24)));

  const startDateSplit = challengeData.challengeStartDate.split('-');
  // console.log('ssdfsfsd>>>>', startDateSplit);

  const day = Number(startDateSplit[2]) + 1;
  // console.log('day>>>>', day);
  const plusDayOne = new Date(
    `${startDateSplit[0]}-${startDateSplit[1]}-${day}`
  );
  // console.log('plusDayOne>>>>', plusDayOne);

  return (
    <>
      {imageData.image && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            background: 'black',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            zIndex: 10000,
          }}
        >
          <button
            onClick={() => imageAction()}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            X
          </button>
          <button onClick={() => imageAction('previous-image')}>이전</button>
          <img
            src={imageData.image}
            style={{ width: 'auto', maxWidth: '90%', maxHeight: '90%' }}
            alt="이미지크게보기"
          />
          <button onClick={() => imageAction('next-image')}>다음</button>
        </div>
      )}
      <Container>
        <ChallengeViewCount>{`조회수 ${challengeData.challengeViewCount}`}</ChallengeViewCount>
        <Recruitment>
          <img
            src={challengeData.challengeRepImagePath}
            alt="도전 할 항목의 이미지"
          />
          <div>
            {/* 챌린지 설명 */}
            <ChallengeDescriptionWrapper>
              <div
                style={{
                  display: 'flex',
                  marginBottom: '5%',
                  alignItems: 'center',
                }}
              >
                <div
                  className="challenge-name"
                  style={{ fontSize: '30px', marginRight: 'auto' }}
                >
                  {challengeData.challengeTitle}
                </div>
                {distance < 0 ? <div>챌린지 시작까지 {left}일</div> : null}
              </div>

              <ChallengeDescription>
                <div className="title">최소 / 최대 인원:</div>
                <div>{`${challengeData.challengeMinParty} / ${challengeData.challengeMaxParty} 명`}</div>
              </ChallengeDescription>
              <ChallengeDescription>
                <div className="title">신청 인원 / 정원:</div>
                <div>{`${challengeData.challengeCurrentParty} / ${challengeData.challengeMaxParty} 명`}</div>
              </ChallengeDescription>
              <ChallengeDescription>
                <div className="title2">챌린지 기간:</div>
                <div>{`${challengeData.challengeStartDate} ~ ${challengeData.challengeEndDate}`}</div>
              </ChallengeDescription>
              <ChallengeDescription>
                <div className="title2">챌린지 금액:</div>
                <div>
                  {challengeData.challengeFeePerPerson
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  &nbsp; 원
                </div>
              </ChallengeDescription>
              <ChallengeDescription>
                <div
                  style={{
                    width: '31%',
                  }}
                >
                  인증 시간:
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    fontSize: '20px',
                    width: '70%',
                    // border: '1px solid blue',
                    marginBottom: '5px',
                    marginTop: '5px',
                  }}
                >
                  {challengeData.challengeAuthAvailableTime.map(
                    (time, index) => {
                      return (
                        <>
                          <div>{time}</div>
                        </>
                      );
                    }
                  )}
                </div>
              </ChallengeDescription>

              {/* 참여버튼 */}
              {/* {new Date() < new Date(challengeData.challengeStartDate) &&
              authorizationToken !== null ? ( */}
              {new Date() < plusDayOne && authorizationToken !== null ? (
                <ButtonWrapper>
                  <button className="custom-btn btn-8">
                    <span onClick={NavigateMPaymentPage}>참여하기</span>
                  </button>
                </ButtonWrapper>
              ) : null}
            </ChallengeDescriptionWrapper>
          </div>
        </Recruitment>

        {/* 챌린지 설명 */}
        <Certification>
          <CertificationWrapper>
            <div className="title">챌린지 설명</div>
            <div className="pd-5">{challengeData.challengeDescription}</div>
          </CertificationWrapper>

          {/* 인증 방법 */}
          <CertificationDescription>
            <div className="title">인증 방법 / 인증 예시</div>
            <div className="pd-5">{challengeData.challengeAuthDescription}</div>
            {/* 인증예시 */}
            <CertificationImage>
              {challengeData.challengeExamImagePath?.map((image, index) => {
                return <Image key={index} src={image}></Image>;
              })}
            </CertificationImage>
          </CertificationDescription>
        </Certification>

        <Review>
          <div style={{ marginBottom: '1%' }}>후기 사진</div>

          {challengeData.challengeReviews === null ? (
            <div
              role="img"
              aria-label="writing hand"
              style={{
                border: '2px solid #eff1fe',
                width: '100%',
                height: '450px',
                marginTop: '1%',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '20px',
                alignItems: 'center',
              }}
            >
              {challengeData.challengeTitle} 챌린지에 대한 후기가 없습니다.😥
            </div>
          ) : (
            <Masonry columnsCount={3} gutter="10px">
              {challengeData.challengeReviews.map((image, i) => (
                <img
                  key={i}
                  src={image.challengeReviewImagePath}
                  style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                  alt="후기사진들"
                  onClick={() => viewImage(image, i)}
                />
              ))}
            </Masonry>
          )}
        </Review>
      </Container>
    </>
  );
}
