import Header from '~/components/profile/header';
import {
  profileImageWrapper,
  profileEditButtonBox,
  inputWrapper,
  editButtonBox,
  nickNameWrapper,
  duplicateButtonBox,
} from './index.styles';
import { Input, Layout, RoundButton, Text } from '@daengle/design-system';
import Image from 'next/image';

function profile() {
  return (
    <Layout>
      <Header />
      <Text typo={'semibold01'} children={'사용자 정보 등록'} />
      <div css={profileImageWrapper}>
        <Image src="/icons/profile_image.svg" alt="프로필 이미지" width={116} height={116} />
        <button css={profileEditButtonBox}>
          <span>프로필 사진 변경하기</span>
        </button>
      </div>
      <div>
        <section css={inputWrapper}>
          <div css={nickNameWrapper}>
            <Input label={'닉네임'} />
            <button css={duplicateButtonBox}>중복검사</button>
          </div>
          <Input label={'이름'} disabled={true} />
          <Input label={'휴대폰번호'} disabled={true} />
          <Input label={'이메일'} disabled={true} />
        </section>
      </div>
      <footer css={editButtonBox}>
        <RoundButton variant={'primary'} size={'XL'} children={'수정하기'}></RoundButton>
      </footer>
    </Layout>
  );
}

export default profile;
