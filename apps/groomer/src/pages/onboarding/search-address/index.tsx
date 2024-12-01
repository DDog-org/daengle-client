import { useRouter } from 'next/router';
import { AppBar, Layout } from '@daengle/design-system';
import { DaumPostcode, Address } from '@daengle/services/libs';
import { ROUTES } from '~/constants/commons/routes';
import { useGroomerInfoFormStore } from '~/stores/auth';
import { wrapper } from './index.styles';

export default function SearchAddress() {
  const router = useRouter();
  const { groomerInfoForm, setGroomerInfoForm } = useGroomerInfoFormStore();

  const handleSearchAddressComplete = (address: Address) => {
    const jibunAddress = `${address.sido} ${address.sigungu} ${address.bname}`;
    setGroomerInfoForm({ address: jibunAddress, detailAddress: address.buildingName });
    router.push(ROUTES.ONBOARDING);
  };

  return (
    <Layout>
      <AppBar onBackClick={router.back} />
      <section css={wrapper}>
        <DaumPostcode onComplete={handleSearchAddressComplete} />
      </section>
    </Layout>
  );
}