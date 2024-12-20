import {
  AppBar,
  ChipToggleButton,
  CTAButton,
  ImageInput,
  Input,
  Layout,
  Text,
  theme,
  useToast,
} from '@daengle/design-system';
import { useS3 } from '@daengle/services/hooks';
import { formatPhoneNumberWithRegionNumber } from '@daengle/services/utils';
import { css } from '@emotion/react';
import router from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TimePickerComponent from '~/components/mypage/time-picker';
import { DAY_OFF } from '~/constants/mypage';
import { useValidateMyPageForm } from '~/hooks/mypage/use-validate-mypage-form';
import { VetProfileForm } from '~/interfaces/auth';
import { useGetVetModifyPageQuery, usePatchVetInfoMutation } from '~/queries/auth';
import dayjs, { Dayjs } from 'dayjs';

export default function vetProfile() {
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(null);
  const [selectedDaysOff, setSelectedDaysOff] = useState<string[]>([]);

  const { data: getVetModifyPage } = useGetVetModifyPageQuery();
  const { mutateAsync: patchVetInfo } = usePatchVetInfoMutation();

  const validation = useValidateMyPageForm();
  const { uploadToS3 } = useS3({ targetFolderPath: 'vet/licenses' });

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<VetProfileForm>({
    defaultValues: {
      phoneNumber: getVetModifyPage?.phoneNumber,
      closedDays: getVetModifyPage?.closedDays,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (getVetModifyPage) {
      setSelectedDaysOff(getVetModifyPage.closedDays || null);
      setValue('phoneNumber', getVetModifyPage.phoneNumber || '');
      setSelectedStartTime(
        getVetModifyPage.startTime ? dayjs(getVetModifyPage.startTime, 'HH:mm') : null
      );
      setSelectedEndTime(
        getVetModifyPage.endTime ? dayjs(getVetModifyPage.endTime, 'HH:mm') : null
      );
    }
  }, [getVetModifyPage, setValue]);

  const handleStartTimeChange = (newValue: Dayjs | null) => {
    setSelectedStartTime(newValue);
  };
  const handleEndTimeChange = (newValue: Dayjs | null) => {
    setSelectedEndTime(newValue);
  };

  const handleDaysOffToggle = (day: string) => {
    setSelectedDaysOff((prev) =>
      prev?.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  const onSubmit = async (data: VetProfileForm) => {
    const imageUrls = await uploadToS3(data.imageUrls);
    if (!imageUrls?.length) return;

    if (!selectedStartTime || !selectedEndTime) {
      alert('시작 시간과 종료 시간을 모두 선택해야 수정할 수 있습니다.');
      return;
    }

    const startTimeString = selectedStartTime?.format('HH:mm');
    const endTimeString = selectedEndTime?.format('HH:mm');

    await patchVetInfo({
      ...data,
      imageUrls,
      startTime: startTimeString,
      endTime: endTimeString,
      closedDays: selectedDaysOff,
    });

    router.push('/mypage');
    showToast({ title: '프로필이 성공적으로 수정되었습니다' });
  };

  return (
    <Layout isAppBarExist={true}>
      <AppBar onBackClick={router.back} backgroundColor={theme.colors.white} />
      <div css={wrapper}>
        <Text tag="h1" typo="title1" color="black">
          병원 프로필 관리
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul css={inputWrapper}>
            <section css={profileImageWrapper}>
              <Text tag="h2" typo="subtitle3">
                이미지 첨부
              </Text>
              <ImageInput
                maxLength={10}
                {...register('imageUrls', { ...validation.imageUrls })}
                onChange={(files) => setValue('imageUrls', files, { shouldValidate: true })}
              />
            </section>

            <li css={readOnlyTextBox}>
              <Text tag="h2" typo="subtitle3">
                병원명
              </Text>
              <Text typo="body3" color="gray400">
                {getVetModifyPage?.name}
              </Text>
            </li>

            <li css={readOnlyTextBox}>
              <Text tag="h2" typo="subtitle3">
                영업시간
              </Text>
              <TimePickerComponent
                onStartTimeChange={handleStartTimeChange}
                onEndTimeChange={handleEndTimeChange}
                startTime={selectedStartTime}
                endTime={selectedEndTime}
              />
            </li>

            <li css={readOnlyTextBox}>
              <Text tag="h2" typo="subtitle3">
                휴무일
              </Text>

              <div css={chipButton}>
                {DAY_OFF.map((item) => {
                  return (
                    <ChipToggleButton
                      type="button"
                      key={item.value}
                      size="circle"
                      isPartnerSelected={selectedDaysOff.includes(item.value)}
                      onClick={() => handleDaysOffToggle(item.value)}
                    >
                      {item.label}
                    </ChipToggleButton>
                  );
                })}
              </div>
            </li>

            <li css={readOnlyTextBox}>
              <Input
                label="전화번호"
                placeholder="병원 전화번호를 입력해 주세요"
                service="partner"
                maxLength={13}
                {...register('phoneNumber', { ...validation.phoneNumber })}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValue('phoneNumber', formatPhoneNumberWithRegionNumber(e.target.value))
                }
                errorMessage={errors.phoneNumber?.message}
              />
            </li>
            <li css={readOnlyTextBox}>
              <Text tag="h2" typo="subtitle3">
                위치
              </Text>
              <Text typo="body3" color="gray400">
                {getVetModifyPage?.address} {getVetModifyPage?.detailAddress}
              </Text>
            </li>
            <li css={readOnlyTextBox}>
              <Text tag="h2" typo="subtitle3">
                소개
              </Text>
              <Controller
                name="introduction"
                control={control}
                render={({ field }) => (
                  <>
                    <textarea
                      css={detailInput}
                      placeholder="소개글을 작성해주세요"
                      defaultValue={getVetModifyPage?.introduction}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
            </li>
          </ul>
          <CTAButton type="submit" service="partner">
            수정하기
          </CTAButton>
        </form>
      </div>
    </Layout>
  );
}
export const wrapper = css`
  display: flex;
  flex-direction: column;

  padding: 18px;
`;
const profileImageWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;

  margin: 40px 0 0;
`;
const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 32px;

  margin: 0 0 104px;
  padding: 0;
`;
const readOnlyTextBox = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const detailInput = css`
  height: 136px;
  padding: 14px;
  border-radius: 10px;

  background-color: ${theme.colors.gray100};

  ::placeholder {
    color: ${theme.colors.gray200};
    font-size: ${theme.typo.body9};
  }
`;
const chipButton = css`
  display: flex;
  gap: 7px;
`;
