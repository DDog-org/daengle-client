import {
  AppBar,
  ChipRadio,
  ChipToggleButton,
  CTAButton,
  Input,
  Layout,
  Select,
  Text,
} from '@daengle/design-system';
import {
  titleBox,
  petProfileWrapper,
  petProfileEditWrapper,
  petProfileImageBox,
  line,
  profileImageWrapper,
  profileImageBox,
  profileEditButtonBox,
  inputWrapper,
  formBox,
  toggleButtonBox,
  chipToggleButtonBox,
  selectChipButtonBox,
  detailformBox,
  chipButtonBox,
  detailInput,
  weightWrapper,
  wrapper,
} from './index.styles';
import Image from 'next/image';
import { PetProfileEditType } from '~/pages/mypage/interfaces';
import { Controller, useForm } from 'react-hook-form';
import useValidatePetEdit from '~/pages/mypage/hooks/use-validate-pet-form';
import {
  BIRTH_YEAR_OPTIONS,
  PET_DISLIKEPART,
  PET_GENDER,
  PET_IS_NEUTERED,
  PET_SIGNIFICANTTAG,
  PET_WEIGHT,
} from '~/pages/mypage/constants';
import { useGetBreedListQuery, usePatchUserPetInfoMutation } from '~/queries';
import { useEffect, useState } from 'react';

export default function DogEditProfile() {
  const { data: breeds } = useGetBreedListQuery();
  const { mutateAsync: patchUserPetInfo } = usePatchUserPetInfoMutation();

  const validation = useValidatePetEdit();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<PetProfileEditType>({
    mode: 'onChange',
    defaultValues: {
      significantTags: [],
      dislikeParts: [],
    },
  });

  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onSubmit = async (data: PetProfileEditType) => {
    if (!isValid) return;

    const payload = {
      id: 1,
      image: '',
      name: watch('name'),
      birth: Number(watch('birth')),
      gender: watch('gender'),
      breed: watch('breed'),
      isNeutered: watch('isNeutered'),
      weight: watch('weight'),
      groomingExperience: watch('groomingExperience'),
      isBite: watch('isBite'),
      dislikeParts: watch('dislikeParts'),
      significantTags: watch('significantTags'),
      significant: '',
    };

    console.log('보낼 데이터:', payload);
    try {
      const response = await patchUserPetInfo(payload);
      console.log('API 응답:', response);
      alert('프로필이 성공적으로 저장되었습니다!');
    } catch (error) {
      console.error('API 호출 중 에러:', error);
      alert('프로필 저장 중 에러가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    // console.log('싫어하는 부위=>', selectedParts);
    // console.log('특이사항=>', selectedTags);
    console.log('isValid 상태:', isValid);
    console.log('유효성 검사 오류:', errors);
  }, [isValid, errors]);

  return (
    <Layout isAppBarExist={true}>
      <AppBar />
      <div css={wrapper}>
        <div css={titleBox}>
          <Text typo="title1">반려견 프로필 수정</Text>
        </div>
        <div css={petProfileWrapper}>
          <Text typo="subtitle1">내 아이</Text>
          <div css={petProfileEditWrapper}>
            <div css={petProfileImageBox}>
              <Image
                src="/icons/pet-profile/edit_image.jpeg"
                alt="펫 필터링 이미지"
                width={70}
                height={70}
              />
            </div>
            <Text typo="body5" color="blue200">
              가이
            </Text>
          </div>
        </div>
        <div css={line} />
        <div css={profileImageWrapper}>
          <div css={profileImageBox}>
            <Image
              src="/icons/pet-profile/edit_image.jpeg"
              alt="펫 프로필 이미지"
              width={116}
              height={116}
            />
          </div>
          <button css={profileEditButtonBox}>
            <Text typo="body4" color="gray400">
              프로필 사진 변경하기
            </Text>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div css={inputWrapper}>
            <Input
              label="이름"
              placeholder="이름을 입력해 주세요"
              maxLength={10}
              {...register('name', { ...validation.name })}
              errorMessage={errors.name?.message}
            />
            <section css={formBox}>
              <Text typo="subtitle3" color="black">
                탄생년도
              </Text>
              <Select
                options={BIRTH_YEAR_OPTIONS}
                placeholder="탄생년도"
                value={watch('birth')}
                {...register('birth', { ...validation.birth })}
                onChange={(e) =>
                  setValue('birth', Number(e.target.value), { shouldValidate: true })
                }
              />
            </section>
            <section css={formBox}>
              <Text typo="subtitle3">성별</Text>
              <section css={toggleButtonBox}>
                <Controller
                  name="gender"
                  control={control}
                  rules={validation.gender}
                  render={({ field }) => (
                    <>
                      {PET_GENDER.map((gender) => (
                        <ChipRadio
                          key={gender.value}
                          name={field.name}
                          value={gender.value}
                          label={gender.label}
                          size="full"
                          isSelected={field.value === gender.value}
                          onChange={() => field.onChange(gender.value)}
                        />
                      ))}
                    </>
                  )}
                />
              </section>
            </section>
            <section css={formBox}>
              <Text typo="subtitle3">중성화</Text>
              <section css={toggleButtonBox}>
                <Controller
                  name="isNeutered"
                  control={control}
                  rules={validation.isNeutered}
                  render={({ field }) => (
                    <>
                      {PET_IS_NEUTERED.map((item) => (
                        <ChipRadio
                          key={item.label}
                          name={field.name}
                          value={item.value}
                          label={item.label}
                          size="full"
                          isSelected={field.value === item.value}
                          onChange={() => field.onChange(item.value)}
                        />
                      ))}
                    </>
                  )}
                />
              </section>
            </section>
            <section css={formBox}>
              <Text typo="subtitle3" color="black">
                품종
              </Text>
              <Select
                options={
                  breeds?.map((breed) => ({ value: breed.breed, label: breed.breedName })) ?? []
                }
                placeholder="품종"
                {...register('breed', { ...validation.breed })}
                value={watch('breed')?.toString()}
              />
            </section>
            <section css={formBox}>
              <Text typo="subtitle3">몸무게</Text>
              <section css={chipToggleButtonBox}>
                <Controller
                  name="weight"
                  control={control}
                  rules={{ required: '몸무게를 선택해 주세요' }}
                  render={({ field }) => (
                    <>
                      {PET_WEIGHT.map((item) => (
                        <div css={weightWrapper} key={item.label}>
                          <ChipRadio
                            key={item.value}
                            name={field.name}
                            value={item.value}
                            label={item.label}
                            size="full"
                            isSelected={field.value === item.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                          <Text typo="body12" color="gray200">
                            {item.description}
                          </Text>
                        </div>
                      ))}
                    </>
                  )}
                />
              </section>
            </section>
            <section css={formBox}>
              <Text typo="subtitle3">미용 경험</Text>
              <section css={toggleButtonBox}>
                <Controller
                  name="groomingExperience"
                  control={control}
                  rules={validation.groomingExperience}
                  render={({ field }) => (
                    <>
                      {PET_IS_NEUTERED.map((item) => (
                        <ChipRadio
                          key={item.label}
                          name={field.name}
                          value={item.value}
                          label={item.label}
                          size="full"
                          isSelected={field.value === item.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      ))}
                    </>
                  )}
                />
              </section>
            </section>
            <section css={formBox}>
              <Text typo="subtitle3">입질</Text>
              <section css={toggleButtonBox}>
                <Controller
                  name="isBite"
                  control={control}
                  rules={validation.isBite}
                  render={({ field }) => (
                    <>
                      {PET_IS_NEUTERED.map((item) => (
                        <ChipRadio
                          key={item.label}
                          name={field.name}
                          value={item.value}
                          label={item.label}
                          size="full"
                          isSelected={field.value === item.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      ))}
                    </>
                  )}
                />
              </section>
            </section>
            <section css={formBox}>
              <Text typo="subtitle3">싫어하는 부위</Text>
              <section css={selectChipButtonBox}>
                <>
                  <Controller
                    name="dislikeParts"
                    control={control}
                    render={({ field }) => (
                      <>
                        {PET_DISLIKEPART.map((item) => {
                          return (
                            <ChipToggleButton
                              key={item.value}
                              size="fixed"
                              isSelected={selectedParts.includes(item.value)}
                              itemValue={item.value}
                              setSelectedParts={(updatedTags: string[]) => {
                                const newParts = field.value?.includes(item.value)
                                  ? field.value.filter((t: string) => t !== item.value) // 선택 해제
                                  : [...(field.value || []), item.value]; // 선택 추가

                                field.onChange(newParts); // React Hook Form에 값 전달
                              }}
                            >
                              {item.label}
                            </ChipToggleButton>
                          );
                        })}
                      </>
                    )}
                  />
                </>
              </section>
            </section>
            <section css={formBox}>
              <section css={detailformBox}>
                <Text typo="subtitle3">특이사항</Text>
                <section css={chipButtonBox}>
                  <>
                    <Controller
                      name="significantTags"
                      control={control}
                      rules={{ required: '특이사항을 선택해 주세요' }}
                      defaultValue={[]}
                      render={({ field }) => (
                        <>
                          {PET_SIGNIFICANTTAG.map((item) => {
                            return (
                              <ChipToggleButton
                                key={item.value}
                                size="full"
                                isSelected={selectedTags.includes(item.value)}
                                itemValue={item.value}
                                setSelectedTags={(updatedTags: string[]) => {
                                  const newTags = field.value?.includes(item.value)
                                    ? field.value.filter((t: string) => t !== item.value)
                                    : [...(field.value || []), item.value];

                                  field.onChange(newTags);
                                }}
                              >
                                {item.label}
                              </ChipToggleButton>
                            );
                          })}
                        </>
                      )}
                    />
                  </>
                </section>
                <textarea css={detailInput} placeholder="특이사항이 있다면 입력해주세요" />
              </section>
            </section>
          </div>
          <CTAButton type="submit" secondaryButtonLabel="삭제하기" disabled={!isValid}>
            수정하기
          </CTAButton>
        </form>
      </div>
    </Layout>
  );
}
