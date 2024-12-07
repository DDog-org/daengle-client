import {
  wrapper,
  profileImageWrapper,
  profileEditButtonBox,
  inputWrapper,
  nickNameWrapper,
  duplicateButtonBox,
  readOnlyTextBox,
} from './index.styles';
import { AppBar, Input, Layout, RoundButton, Text } from '@daengle/design-system';
import Image from 'next/image';
import { useGetUserProfileInfoQuery } from '~/queries';

export default function EditProfile() {
  const { data: userProfileInfo } = useGetUserProfileInfoQuery();

  return (
    <Layout isAppBarExist={false}>
      <AppBar />
      <div css={wrapper}>
        <Text typo="title1">사용자 정보 등록</Text>
        <div css={profileImageWrapper}>
          <Image src="/icons/profile_image.svg" alt="프로필 이미지" width={116} height={116} />
          <button css={profileEditButtonBox}>
            <span>프로필 사진 변경하기</span>
          </button>
        </div>
        <div>
          <section css={inputWrapper}>
            <div css={nickNameWrapper}>
              <Input label="닉네임" errorMessage="이미 존재하는 닉네임입니다." />
              <button css={duplicateButtonBox}>중복검사</button>
            </div>
            <div css={readOnlyTextBox}>
              <Text typo="subtitle3">이름</Text>
              <Text typo="body3" color="gray400">
                {userProfileInfo?.username}
              </Text>
            </div>
            <div css={readOnlyTextBox}>
              <Text typo="subtitle3">휴대폰번호</Text>
              <Text typo="body3" color="gray400">
                {userProfileInfo?.phoneNumber}
              </Text>
            </div>
            <div css={readOnlyTextBox}>
              <Text typo="subtitle3">이메일</Text>
              <Text typo="body3" color="gray400">
                {userProfileInfo?.email}
              </Text>
            </div>
          </section>
        </div>
        <footer>
          <RoundButton variant="primary" size="L" fullWidth={true}>
            수정하기
          </RoundButton>
        </footer>
      </div>
    </Layout>
  );
}
