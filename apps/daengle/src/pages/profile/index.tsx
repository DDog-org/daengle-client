import Header from '~/components/profile/header';
import Footer from '~/components/profile/footer';
import {
  wrapper,
  container,
  profileImageWrapper,
  profileImageBox,
  profileEditButtonBox,
  title,
} from './index.styles';
import myProfile from '../../../public/icons/profile_image.svg';

function profile() {
  return (
    <div css={wrapper}>
      <div css={container}>
        <Header />
        <h3>사용자 프로필 수정</h3>
        <div css={profileImageWrapper}>
          <img css={profileImageBox} src={myProfile} />
          <span css={profileEditButtonBox}>프로필 사진 변경하기</span>
        </div>
        <div>
          <section>
            <div css={title}>닉네임</div>
            <div>
              <input type="text" />
            </div>
          </section>
          <section>
            <div css={title}>이름</div>
            <div>
              <input type="text" />
            </div>
          </section>
          <section>
            <div css={title}>휴대폰번호</div>
            <div>
              <input type="text" />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default profile;
