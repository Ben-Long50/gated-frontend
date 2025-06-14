import { KeywordReference } from 'src/types/keyword';
import { useContext, useState } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';
import useModalStore from 'src/stores/modalStore';
import { useLocation, useNavigate } from 'react-router-dom';

const KeywordTag = ({ keyword }: { keyword: KeywordReference }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [hover, setHover] = useState(false);

  const colorValue = accentPrimary.concat('80');

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const openDescriptionModal = () => {
    setBackgroundPath(location.pathname);
    navigate(`traits/${keyword.id}`);
  };

  const keywordName = keyword?.value
    ? keyword?.keyword?.name.replace(/X/g, keyword?.value?.toString())
    : keyword?.keyword?.name;

  return (
    <div
      className={`bg-primary hover:bg-tertiary timing shadow-color relative rounded border px-2 text-base shadow-md`}
      style={{ borderColor: hover ? accentPrimary : colorValue }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openDescriptionModal();
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="whitespace-nowrap text-base">{keywordName}</p>
    </div>
  );
};

export default KeywordTag;
