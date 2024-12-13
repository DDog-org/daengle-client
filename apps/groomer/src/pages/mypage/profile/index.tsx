import { AppBar, CTAButton, ImageInputBox, Layout, Text } from '@daengle/design-system';
import { theme } from '@daengle/design-system';
import { useS3 } from '@daengle/services/hooks';
import { css } from '@emotion/react';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { GroomerModifyPageForm } from '~/interfaces/auth';
import { useGetGroomerModifyPageQuery } from '~/queries';

export default function EditProfile() {
  const { data: getGroomerModifyPage } = useGetGroomerModifyPageQuery();

  const { uploadToS3, deleteFromS3 } = useS3({ targetFolderPath: 'groomer/profile-images' });

  const {
    handleSubmit,
    watch,
    register,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<GroomerModifyPageForm>({
    mode: 'onChange',
    defaultValues: {
      image: null,
      introduction: '',
    },
  });
  const onSubmit = async (data: GroomerModifyPageForm) => {
    let imageString = '';

    if (getGroomerModifyPage?.image) {
      const fileName = getGroomerModifyPage.image.split('/').pop();
      if (fileName) {
        await deleteFromS3(fileName);
      }
    }

    if (data.image) {
      const uploadedImages = await uploadToS3([data.image]);
      if (uploadedImages && uploadedImages.length > 0) {
        imageString = uploadedImages[0] ?? '';
      }
    } else {
      imageString = getGroomerModifyPage?.image || '';
    }
  };
  return (
    <Layout isAppBarExist={true}>
      <AppBar onBackClick={router.back} backgroundColor={theme.colors.white} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={wrapper}>
          <Text typo="title1">프로필 관리</Text>

          <div css={profileImageWrapper}>
            <ImageInputBox
              onChange={(files) => setValue('image', files, { shouldValidate: true })}
              defaultValue={getGroomerModifyPage?.image || ''}
            />
          </div>
          <section css={inputWrapper}>
            <div css={readOnlyTextBox}>
              <Text typo="subtitle1" color="black">
                프로필 정보
              </Text>
            </div>
            <div css={readOnlyTextBox}>
              <Text typo="subtitle3">이름</Text>
              <Text typo="body3" color="gray400">
                {getGroomerModifyPage?.name}
              </Text>
            </div>
            <div css={readOnlyTextBox}>
              <Text typo="subtitle3">휴대폰번호</Text>
              <Text typo="body3" color="gray400">
                {getGroomerModifyPage?.phoneNumber}
              </Text>
            </div>
            <div css={readOnlyTextBox}>
              <Text typo="subtitle3">이메일</Text>
              <Text typo="body3" color="gray400">
                {getGroomerModifyPage?.email}
              </Text>
            </div>
            <div css={textareaWrapper}>
              <Text typo="subtitle3">소개</Text>
              <textarea css={detailInput} placeholder="안녕" />
            </div>
          </section>
        </div>
        <div css={line} />
        <div css={footerWrapper}>
          <div css={licenseWrapper}>
            <Text typo="subtitle3">자격증 관리</Text>
            <div css={licenseBox}>
              <div css={license}>
                <Text typo="body4" color="green200">
                  윤일 관리사 자격증
                </Text>
                <Text typo="body5" color="gray400">
                  2024.12.12
                </Text>
              </div>
              <div css={license}>
                <Text typo="body4" color="green200">
                  윤일 관리사 자격증
                </Text>
                <Text typo="body5" color="gray400">
                  2024.12.12
                </Text>
              </div>
            </div>
          </div>
          <CTAButton type="submit" service="partner">
            수정하기
          </CTAButton>
        </div>
      </form>
    </Layout>
  );
}

const wrapper = css`
  height: auto;
  padding: 18px;
`;
const footerWrapper = css`
  padding: 18px 18px 141px;
`;
const profileImageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 0 40px;
`;
const profileEditButtonBox = css`
  margin-top: 12px;
  font-size: 14px;
  color: ${theme.colors.gray400};
`;
const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const readOnlyTextBox = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const textareaWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const line = css`
  border: 3.5px solid ${theme.colors.gray100};
  width: 100%;
  background-color: ${theme.colors.gray100};
  margin: 32px 0;
`;

const detailInput = css`
  background-color: ${theme.colors.gray100};
  height: 136px;
  border-radius: 10px;
  padding: 14px;
  ::placeholder {
    color: ${theme.colors.black};
    font-size: ${theme.typo.body9};
  }
`;
const licenseWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const licenseBox = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const license = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  background-color: ${theme.colors.green100};
  border: 1px solid ${theme.colors.green200};
  border-radius: 12px;
  ::placeholder {
    color: ${theme.colors.black};
    font-size: ${theme.typo.body9};
  }
`;
