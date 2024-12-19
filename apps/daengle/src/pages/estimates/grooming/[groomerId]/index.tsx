import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { AppBar, CTAButton, Layout, Text, TextField, theme } from '@daengle/design-system';
import { ROUTES } from '~/constants/commons';
import {
  usePostUserEstimateGroomingMutation,
  usePostUserEstimateGroomerUserInfoMutation,
} from '~/queries';
import { PostUserEstimateGroomerUserInfoResponse } from '~/models/estimate';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { PetInfo } from '~/interfaces/estimate';
import { DatePicker, EstimateSelect } from '~/components/estimate';
import { RegisterPetProfile } from '@daengle/services/components';
import { SelectPet } from '~/components/mypage';

export default function EstimateCreate() {
  const router = useRouter();
  const [address, setAddress] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
  const [petInfos, setPetInfos] = useState<PetInfo[] | null>(null);
  const [selectedPetId, setSelectedPetId] = useState<number>(0);
  const [desiredStyle, setDesiredStyle] = useState<string>('');
  const [requirements, setRequirements] = useState<string>('');
  const [ButtonActive, setButtonActive] = useState<boolean>(false);

  const groomerId = Number(router.query.groomerId);

  const reservedDate = `${selectedDate?.format('YYYY-MM-DD')} ${selectedTime?.format('HH:mm:ss')}`;

  useEffect(() => {
    // 정보 불러오기
    handlePostUserEstimateGroomerUserInfo();
  }, []);

  useEffect(() => {
    // 모든 필드 값이 유효한지 확인
    const isFormValid =
      selectedPetId !== 0 &&
      address !== '' &&
      selectedDate !== null &&
      selectedTime !== null &&
      desiredStyle !== '' &&
      requirements !== '';

    setButtonActive(isFormValid);
  }, [selectedPetId, address, selectedDate, selectedTime, desiredStyle, requirements]);

  const { mutateAsync: postUserEstimateGroomerUserInfo } =
    usePostUserEstimateGroomerUserInfoMutation();
  const { mutate: postUserEstimateGroomingRequestBody } = usePostUserEstimateGroomingMutation();

  const handlePostUserEstimateGroomerUserInfo = async () => {
    const response: PostUserEstimateGroomerUserInfoResponse = await postUserEstimateGroomerUserInfo(
      {
        groomerId,
      }
    );

    if (response?.address) setAddress(response.address);
    if (response?.petInfos) setPetInfos(response.petInfos);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };
  const handleTimeChange = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
  };

  const handlePetSelect = (petId: number) => {
    if (petInfos) {
      if (selectedPetId === petId) setSelectedPetId(0);
      else setSelectedPetId(petId);
    }
  };

  const handleDesiredStyleSelect = (style: string) => {
    setDesiredStyle((prevStyle) => (prevStyle === style ? '' : style));
  };

  const handleRequirementsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequirements(e.target.value);
  };

  // 데이터 전달
  const handleSubmit = () => {
    const requestBody = {
      groomerId: groomerId,
      petId: selectedPetId,
      address: address,
      reservedDate: reservedDate,
      desiredStyle: desiredStyle,
      requirements: requirements,
    };

    postUserEstimateGroomingRequestBody(requestBody, {
      onSuccess: () => {
        router.push(ROUTES.ESTIMATES_FORM_COMPLETE);
      },
    });
  };

  return (
    <Layout>
      <AppBar
        onBackClick={router.back}
        onHomeClick={() => router.push(ROUTES.HOME)}
        backgroundColor="white"
      />
      <div css={wrapper}>
        <Text tag="h1" typo="title1" color="black">
          견적 요청서
        </Text>
        <section css={section}>
          <Text tag="h2" typo="subtitle3" color="black">
            지역
          </Text>
          <Text typo="title2" color="black">
            {address}
          </Text>
        </section>
        <section css={section}>
          <Text tag="h2" typo="subtitle3" color="black">
            시술 희망 날짜 및 시간
          </Text>
          {/* <DatePicker onDateChange={handleDateChange} onTimeChange={handleTimeChange} /> */}
        </section>
        <section css={section}>
          <Text tag="h2" typo="subtitle3" color="black">
            어떤 아이를 가꿀 예정이신가요?
          </Text>
          {petInfos && petInfos.length > 0 ? (
            <SelectPet
              petInfos={petInfos.map((pet) => ({
                ...pet,
                petName: pet.name,
                petImage: pet.imageUrl ?? '',
              }))}
              selectedPetId={selectedPetId}
              handlePetSelect={handlePetSelect}
              handlePetCreateClick={() => router.push(ROUTES.MYPAGE_PET_PROFILE_CREATE)}
            />
          ) : (
            <RegisterPetProfile onClick={() => router.push(ROUTES.MYPAGE)} />
          )}
        </section>
        <section css={section}>
          <Text tag="h2" typo="subtitle3" color="black">
            원하는 미용
          </Text>
          <div css={selectBox}>
            <EstimateSelect
              title="전체 클리핑"
              componentName="GroomingFullClipping"
              onClick={() => handleDesiredStyleSelect('전체 클리핑')}
              isSelected={desiredStyle === '전체 클리핑'}
            />
            <EstimateSelect
              title="전체 클리핑 + 얼굴 컷"
              componentName="GroomingFaceCut"
              onClick={() => handleDesiredStyleSelect('전체 클리핑 + 얼굴 컷')}
              isSelected={desiredStyle === '전체 클리핑 + 얼굴 컷'}
            />
          </div>
          <div css={selectBox}>
            <EstimateSelect
              title="전체 가위컷"
              componentName="GroomingFullScissorCut"
              onClick={() => handleDesiredStyleSelect('전체 가위컷')}
              isSelected={desiredStyle === '전체 가위컷'}
            />
            <EstimateSelect
              title="스포팅 + 얼굴 컷"
              componentName="GroomingSpotting"
              onClick={() => handleDesiredStyleSelect('스포팅 + 얼굴 컷')}
              isSelected={desiredStyle === '스포팅 + 얼굴 컷'}
            />
          </div>
        </section>
        <section css={section}>
          <TextField
            label="요청사항"
            required
            placeholder="요청사항을 입력해 주세요"
            value={requirements}
            onChange={handleRequirementsChange}
          />
        </section>
        <CTAButton onClick={handleSubmit} disabled={!ButtonActive}>
          요청하기
        </CTAButton>
      </div>
    </Layout>
  );
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 100%;
  padding: 18px 18px 104px;
`;

const section = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const registerPet = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  width: 100%;
  height: 109px;
  border: 1px solid ${theme.colors.gray200};
  border-radius: 10px;
`;

const circle = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border: 1px solid ${theme.colors.gray200};
  border-radius: 20px;

  cursor: pointer;

  :hover {
    background-color: ${theme.colors.gray100};

    transition: 0.3s;
  }
`;

const listBox = css`
  overflow: auto;

  width: 100%;
`;

const petList = css`
  display: flex;
  gap: 14px;
`;

const petProfile = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  cursor: pointer;
`;

const profileImage = ({ isSelected }: { isSelected: boolean }) => css`
  width: 86px;
  height: 86px;
  border: 4px solid ${isSelected ? theme.colors.blue200 : theme.colors.gray200};
  border-radius: 50px;

  background-color: ${theme.colors.gray200};

  transition: border 0.2s ease;
`;

const petName = css`
  transition: 0.2s ease;
`;

const selectBox = css`
  display: flex;
  gap: 13px;
`;

const selectItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 35px;

  width: 100%;
  height: 195px;
  padding: 17px;
  border: 1px solid ${theme.colors.gray200};
  border-radius: 10px;

  cursor: pointer;

  :hover {
    background-color: ${theme.colors.gray100};

    transition: 0.3s;
  }
`;

const textField = css`
  width: 100%;
  height: 135px;
  padding: 18px;
  border-radius: 10px;

  background-color: ${theme.colors.gray100};
  text-align: justify;

  ::placeholder {
    color: ${theme.colors.gray300};
    size: ${theme.typo.body9};
  }
`;
