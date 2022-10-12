import { Blocks } from 'react-loader-spinner';
import { LoaderDiv } from 'services/Common.styled';

export const Loader = () => {
  return (
    <LoaderDiv>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </LoaderDiv>
  );
};
