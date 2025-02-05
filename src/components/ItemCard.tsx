import {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LayoutContext } from '../contexts/LayoutContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import { Link } from 'react-router-dom';
import ItemRarity from './ItemRarity';
import CardPrice from './CardPrice';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { Modification, VehicleWithWeapons } from 'src/types/vehicle';
import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import CloudinaryImage from './CloudinaryImage';
import SubweaponCard from './SubweaponCard';
import { Action } from 'src/types/action';
import SubactionCard from './SubactionCard';
import SubarmorCard from './SubarmorCard';
import SubmodificationCard from './SubmodificationCard';
import BodyIcon from './icons/BodyIcon';
import BtnRect from './buttons/BtnRect';
import { motion } from 'motion/react';

const ItemCard = ({
  item,
  category,
  mode,
  controls,
  children,
}: {
  item:
    | WeaponWithKeywords
    | ArmorWithKeywords
    | CyberneticWithKeywords
    | VehicleWithWeapons;
  category: string;
  mode: string;
  controls?: ReactNode;
  children: ReactNode;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailHeight, setDetailHeight] = useState(1000);
  const [integrationHeight, setIntegrationHeight] = useState(1000);
  const [toolTip, setToolTip] = useState(0);

  useEffect(() => {
    if (toolTip) {
      document.addEventListener('click', () => setToolTip(0));
    } else {
      document.removeEventListener('click', () => setToolTip(0));
    }

    return () => {
      document.removeEventListener('click', () => setToolTip(0));
    };
  }, [toolTip]);

  const detailRef = useRef(null);
  const integrationRef = useRef(null);

  useEffect(() => {
    if (detailRef.current) {
      const rect = detailRef.current.offsetHeight;
      setDetailHeight(rect);
    }
    if (integrationRef.current) {
      const rect = integrationRef.current.offsetHeight;
      setIntegrationHeight(rect);
    }
  }, [detailRef.current]);

  return (
    <motion.div
      initial={{ scaleY: 0, transformOrigin: 'top' }}
      animate={{ scaleY: 1 }}
      transition={{
        duration: 0.25,
        ease: [0, 0.75, 0.5, 1],
      }}
      className="w-full"
    >
      <ThemeContainer
        chamfer="24"
        className="w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
        borderColor={accentPrimary}
      >
        <div
          className="bg-primary timing relative flex cursor-pointer flex-col p-2 clip-6 sm:p-4"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!toolTip) {
              setDetailsOpen(!detailsOpen);
            } else {
              setToolTip(0);
            }
          }}
        >
          {layoutSize === 'small' || layoutSize === 'xsmall' ? (
            <>
              <div className="flex h-full flex-col gap-4 sm:gap-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                      <h2 className="pl-2">{item.name}</h2>
                      {category === 'weapons' && item.vehicleId && (
                        <h4 className="text-error italic">
                          (Currently equipped)
                        </h4>
                      )}
                    </div>
                    {item.cyberneticType && (
                      <p className="text-tertiary italic">
                        (
                        {item.cyberneticType[0].toUpperCase() +
                          item.cyberneticType.slice(1)}
                        )
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-start justify-end gap-x-4 gap-y-1">
                    {mode === 'codex' && (
                      <div className="flex items-center justify-end gap-4">
                        <CardPrice
                          price={item?.price}
                          category={category}
                          itemId={item?.id}
                        />
                      </div>
                    )}
                    {((mode === 'codex' && user?.role === 'ADMIN') ||
                      (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
                      <Link to={`/glam/codex/item/${item.id}/update`}>
                        <button className="text-accent hover:underline">
                          Edit
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
                <ItemRarity rarity={item?.rarity} grade={item?.grade} />
                {item?.keywords && item.keywords.length > 0 && (
                  <div className="col-span-2 flex w-full flex-wrap items-center gap-1 justify-self-start">
                    {item.keywords.map(
                      (
                        item: { keyword: Keyword; value?: number },
                        index: number,
                      ) => {
                        return (
                          <Tag
                            id={item.keyword.id + index}
                            key={item.keyword.id}
                            label={
                              item.value
                                ? item.keyword.name + ' ' + item.value
                                : item.keyword.name
                            }
                            description={item.keyword.description}
                            toolTip={toolTip}
                            setToolTip={setToolTip}
                          />
                        );
                      },
                    )}
                  </div>
                )}
                <div
                  className={`flex ${detailsOpen ? 'flex-col' : 'flex-row'} items-start justify-start gap-x-4 gap-y-6`}
                >
                  {item.picture && (
                    <CloudinaryImage
                      rarity={item.rarity}
                      url={item.picture?.imageUrl}
                      alt={item.name + ' ' + 'image'}
                      detailsOpen={detailsOpen}
                    />
                  )}
                  <div
                    className={`${!detailsOpen && 'scrollbar-secondary max-h-48 overflow-y-auto pr-6'} flex w-full flex-col gap-4`}
                  >
                    {item.body && (
                      <div className="mr-4 flex flex-wrap items-center gap-2">
                        <BodyIcon className="size-8" />
                        {item.body.map((body, index) => {
                          return (
                            <p key={body}>
                              {body}
                              <span>{index < item.body.length - 1 && ','}</span>
                            </p>
                          );
                        })}
                      </div>
                    )}
                    <div
                      className={`timing grid h-full w-full grid-cols-[repeat(auto-fill,minmax(100px,max-content))] place-items-center justify-start gap-2`}
                    >
                      {children}
                    </div>
                    {mode === 'equipment' && controls}
                  </div>
                </div>
              </div>
              {mode !== 'equipment' && (
                <div className="overflow-hidden">
                  <motion.div
                    ref={detailRef}
                    className="pt-6"
                    initial={{ marginTop: -detailHeight - 4 }}
                    animate={{
                      marginTop: detailsOpen ? 0 : -detailHeight - 4,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-secondary pr-6">{item.description}</p>
                  </motion.div>
                </div>
              )}
            </>
          ) : (
            <div className="relative flex h-full gap-8">
              {item.picture && (
                <CloudinaryImage
                  rarity={item.rarity}
                  url={item.picture?.imageUrl}
                  alt={item.name + ' ' + 'image'}
                  detailsOpen={detailsOpen}
                />
              )}
              <div className="w-full">
                <div className="grid w-full grow grid-cols-[1fr_auto] items-start gap-6">
                  <div>
                    <div className="flex items-center gap-4">
                      <h2 className={`${!item.picture && 'pl-4'}`}>
                        {item.name}
                      </h2>
                      {category === 'weapons' && item.vehicleId && (
                        <h4 className="text-error italic">
                          (Currently equipped)
                        </h4>
                      )}
                    </div>

                    {item.cyberneticType && (
                      <p className="text-tertiary italic">
                        (
                        {item.cyberneticType[0].toUpperCase() +
                          item.cyberneticType.slice(1)}
                        )
                      </p>
                    )}
                  </div>
                  <div
                    className={`${mode === 'codex' && 'row-span-2'} timing col-start-2 row-start-1 flex flex-col items-end justify-end gap-x-8 gap-y-4`}
                  >
                    {mode === 'codex' && (
                      <div className="flex items-center justify-end gap-4">
                        <CardPrice
                          price={item?.price}
                          category={category}
                          itemId={item?.id}
                        />
                        {(user?.role === 'ADMIN' ||
                          user?.role === 'SUPERADMIN') && (
                          <Link
                            to={`/glam/codex/${category}/${item.id}/update`}
                          >
                            <button className="text-accent hover:underline">
                              Edit
                            </button>
                          </Link>
                        )}
                      </div>
                    )}
                    <ItemRarity
                      className="place-self-end"
                      rarity={item?.rarity}
                      grade={item?.grade}
                    />
                  </div>
                  {(item.body || item.keywords) && (
                    <div className="col-span-2 col-start-1 row-start-2 flex flex-wrap items-center gap-1">
                      {item.body && (
                        <div className="flex flex-col items-center gap-1">
                          <div className="mr-4 flex flex-wrap items-center gap-2">
                            <BodyIcon className="size-8" />
                            {item.body.map((body, index) => {
                              return (
                                <p key={body}>
                                  {body}
                                  <span>
                                    {index < item.body.length - 1 && ','}
                                  </span>
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {item?.keywords &&
                        item.keywords.length > 0 &&
                        item.keywords?.map(
                          (
                            item: { keyword: Keyword; value?: number },
                            index: number,
                          ) => {
                            return (
                              <Tag
                                id={item.keyword?.id + index}
                                key={item.keyword?.id}
                                label={
                                  item.value
                                    ? item.keyword?.name + ' ' + item.value
                                    : item.keyword?.name
                                }
                                description={item.keyword?.description}
                                toolTip={toolTip}
                                setToolTip={setToolTip}
                              />
                            );
                          },
                        )}
                    </div>
                  )}
                  <div className="timing col-span-2 grid h-full w-full grid-cols-[repeat(auto-fill,minmax(110px,auto))] place-items-center gap-4">
                    {children}
                  </div>
                  {mode === 'equipment' && controls}
                </div>
                {mode !== 'equipment' && (
                  <div className="overflow-hidden">
                    <motion.p
                      ref={detailRef}
                      className="text-secondary pr-8"
                      initial={{ marginTop: -detailHeight - 4 }}
                      animate={{
                        marginTop: detailsOpen ? 24 : -detailHeight - 4,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={`overflow-hidden`}>
            <motion.div
              ref={integrationRef}
              className="flex flex-col gap-5 p-0.5 pr-8"
              initial={{ marginTop: -integrationHeight - 36 }}
              animate={{
                marginTop: detailsOpen
                  ? integrationRef.current?.children.length > 0
                    ? 16
                    : 0
                  : -integrationHeight - 36,
              }}
              transition={{ duration: 0.2 }}
            >
              {item.weapons && item.weapons?.length > 0 && (
                <ThemeContainer
                  className="mt-2"
                  chamfer="16"
                  borderColor={accentPrimary}
                >
                  <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                    Integrated weapons
                  </p>
                  <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                    {item.weapons?.map(
                      (weapon: WeaponWithKeywords, index: number) => {
                        return (
                          <div
                            key={weapon?.id}
                            className="flex h-full grow flex-col items-start justify-between gap-4"
                          >
                            <SubweaponCard
                              vehicleId={item.id}
                              weapon={weapon}
                              toolTip={toolTip}
                              setToolTip={setToolTip}
                            />
                            {index < item.weapons?.length - 1 && (
                              <hr className="w-full border-yellow-300 border-opacity-50" />
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </ThemeContainer>
              )}
              {item.armor && item.armor?.length > 0 && (
                <ThemeContainer
                  className="mt-2"
                  chamfer="16"
                  borderColor={accentPrimary}
                >
                  <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                    Integrated armor
                  </p>
                  <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                    {item.armor.map(
                      (armor: ArmorWithKeywords, index: number) => {
                        return (
                          <>
                            <SubarmorCard
                              key={armor.id}
                              armor={armor}
                              toolTip={toolTip}
                              setToolTip={setToolTip}
                            />
                            {index < item.armor.length - 1 && (
                              <hr className="w-full border-yellow-300 border-opacity-50" />
                            )}
                          </>
                        );
                      },
                    )}
                  </div>
                </ThemeContainer>
              )}
              {item.actions && item.actions?.length > 0 && (
                <ThemeContainer
                  className="mt-2"
                  chamfer="16"
                  borderColor={accentPrimary}
                >
                  <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                    Unique actions
                  </p>
                  <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                    {item.actions?.map((action: Action, index: number) => {
                      return (
                        <>
                          <SubactionCard key={action.id} action={action} />
                          {index < item.actions.length - 1 && (
                            <hr
                              key={index}
                              className="w-full border-yellow-300 border-opacity-50"
                            />
                          )}
                        </>
                      );
                    })}
                  </div>
                </ThemeContainer>
              )}
              {item.modifications?.length > 0 && (
                <ThemeContainer chamfer="16" borderColor={accentPrimary}>
                  <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                    Modifications
                  </p>
                  <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                    {item.modifications?.map(
                      (modification: Modification, index: number) => {
                        return (
                          <>
                            <SubmodificationCard
                              key={modification.id}
                              modification={modification}
                            />
                            {index < item.modifications.length - 1 && (
                              <hr className="w-full border-yellow-300 border-opacity-50" />
                            )}
                          </>
                        );
                      },
                    )}
                  </div>
                </ThemeContainer>
              )}
              {mode === 'inventory' && (
                <Link className="w-1/3 self-start" to={`${item.id}/modify`}>
                  <BtnRect>Modify</BtnRect>
                </Link>
              )}
            </motion.div>
          </div>
          <span
            className={`absolute bottom-4 right-4 transition duration-300 ${detailsOpen && '-rotate-180'}`}
          >
            <Icon
              path={mdiChevronDown}
              size={1.1}
              className={`text-secondary`}
            ></Icon>
          </span>
        </div>
      </ThemeContainer>
    </motion.div>
  );
};

export default ItemCard;
