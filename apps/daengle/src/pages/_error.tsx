import * as Sentry from '@sentry/nextjs';
import Error, { ErrorProps } from 'next/error';
import { NextPageContext } from 'next';

interface CustomErrorComponentProps extends ErrorProps {}

const CustomErrorComponent = (props: CustomErrorComponentProps) => {
  return <Error statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  return Error.getInitialProps(contextData);
};

export default CustomErrorComponent;