import { mdiChevronDown, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import ThemeContainer from './ThemeContainer';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import Tag from './Tag';
import ProfitsIcon from './icons/ProfitsIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import MagCapacityIcon from './icons/MagCapacityIcon';
import { Link } from 'react-router-dom';
import CloudinaryImage from './CloudinaryImage';
import { AuthContext } from '../contexts/AuthContext';
import { WeaponWithKeywords } from 'src/types/weapon';
import WeaponCard from './WeaponCard';
import SizeIcon from './icons/SizeIcon';
import VehicleSpeedIcon from './icons/VehicleSpeedIcon';
import AgilityIcon from './icons/AgilityIcon';
import HullIcon from './icons/HullIcon';
import ArmorIcon from './icons/ArmorIcon';
import CargoIcon from './icons/CargoIcon';
import PassIcon from './icons/PassIcon';
import VehicleWeaponIcon from './icons/VehicleWeaponIcon';
import HangarIcon from './icons/HangarIcon';
import SubweaponCard from './SubweaponCard';
import { Modification } from 'src/types/vehicle';
import SubmodificationCard from './SubmodificationCard';

const VehicleCard = ({ vehicle }, props) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [detailHeight, setDetailHeight] = useState(1000);
  const [descriptionHeight, setDescriptionHeight] = useState(1000);
  const [toolTip, setToolTip] = useState(null);

  useEffect(() => {
    if (toolTip) {
      document.addEventListener('click', () => setToolTip(null));
    } else {
      document.removeEventListener('click', () => setToolTip(null));
    }

    return () => {
      document.removeEventListener('click', () => setToolTip(null));
    };
  }, [toolTip]);

  const detailRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.offsetHeight);
    }
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.offsetHeight);
    }
  }, [detailRef.current, descriptionRef.current]);

  return (
    <ThemeContainer
      chamfer="24"
      className="w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
      borderColor={accentPrimary}
    >
      <div
        className={`${props.className} bg-primary timing relative flex cursor-pointer flex-col p-4 clip-6`}
        onClick={async (e) => {
          e.preventDefault();
          if (!toolTip) {
            setDetailsOpen(!detailsOpen);
            setDescriptionOpen(!descriptionOpen);
          }
        }}
      >
        {layoutSize === 'small' || layoutSize === 'xsmall' ? (
          <>
            <div className="relative flex h-full flex-col gap-4 sm:gap-8">
              <div className="flex w-full items-start justify-between gap-8">
                <div className="flex items-center justify-start gap-4">
                  <h2> {vehicle.name}</h2>
                  {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
                    <Link to={`${vehicle.id}/update`}>
                      <button className="text-accent hover:underline">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
                <div className="flex items-center justify-end gap-4">
                  <ProfitsIcon className="size-6 shrink-0" />
                  {vehicle.price ? (
                    <p>{vehicle.price + 'p'}</p>
                  ) : (
                    <Icon
                      className="text-secondary"
                      path={mdiClose}
                      size={1.5}
                    />
                  )}
                </div>
              </div>
              <div
                className={`flex ${detailsOpen ? 'flex-col' : 'flex-row'} items-start justify-start gap-6`}
              >
                {vehicle.picture && (
                  <CloudinaryImage
                    className={`${detailsOpen ? 'max-w-full' : 'max-w-48'} aspect-square shrink clip-6`}
                    url={vehicle.picture?.imageUrl}
                    alt={vehicle.name + ' ' + 'image'}
                  />
                )}
                <div
                  className={`timing grid ${vehicle.picture && !detailsOpen ? 'grid-flow-row grid-cols-2' : 'grid-flow-col grid-rows-2 pb-4'} items-start justify-start gap-4 sm:gap-8 sm:gap-y-4`}
                >
                  {vehicle.stats.size && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <SizeIcon className="size-8" />
                        <p>{vehicle.stats.size}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.speed && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <VehicleSpeedIcon className="size-8" />
                        <p>{vehicle.stats.speed}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.agility && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <AgilityIcon className="size-8" />
                        <p>{vehicle.stats.agility}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.hull && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <HullIcon className="size-8" />
                        <p>{vehicle.stats.hull}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.armor && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <ArmorIcon className="size-8" />
                        <p>{vehicle.stats.armor}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.cargo && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <CargoIcon className="size-8" />
                        <p>{vehicle.stats.cargo}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.hangar && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <HangarIcon className="size-8" />
                        <p>{vehicle.stats.hangar}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.pass && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <PassIcon className="size-8" />
                        <p>{vehicle.stats.pass}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.weapon && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <VehicleWeaponIcon className="size-8" />
                        <p>{vehicle.stats.weapon}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <span
                className={`absolute bottom-0 right-0 transition duration-300 ${detailsOpen && '-rotate-180'}`}
              >
                <Icon
                  path={mdiChevronDown}
                  size={1.1}
                  className={`text-secondary`}
                ></Icon>
              </span>
            </div>
            <div className="overflow-hidden">
              <div
                ref={detailRef}
                className={`timing text-secondary flex flex-col gap-6 p-0.5`}
                style={
                  detailsOpen
                    ? {
                        marginTop: 0,
                      }
                    : {
                        marginTop: -detailHeight - 4,
                      }
                }
              >
                <p>{vehicle.description}</p>
                {vehicle.weapons.length > 0 && (
                  <ThemeContainer chamfer="16" borderColor={accentPrimary}>
                    <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                      Mounted weapons
                    </p>
                    <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                      {vehicle.weapons?.map(
                        (
                          weapon: {
                            weapon: WeaponWithKeywords;
                            quantity: number;
                          },
                          index: number,
                        ) => {
                          return (
                            <>
                              <SubweaponCard
                                key={weapon.weapon.id}
                                weapon={weapon.weapon}
                                quantity={weapon.quantity}
                                toolTip={toolTip}
                                setToolTip={setToolTip}
                              />
                              {index < vehicle.weapons.length - 1 && (
                                <hr className="w-full border-yellow-300 border-opacity-50" />
                              )}
                            </>
                          );
                        },
                      )}
                    </div>
                  </ThemeContainer>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="relative flex flex-col">
            <div className="flex h-full gap-8">
              {vehicle.picture && (
                <CloudinaryImage
                  className={`${detailsOpen ? 'max-w-96' : 'max-w-60'} aspect-square shrink clip-6`}
                  url={vehicle.picture?.imageUrl}
                  alt={vehicle.name + ' ' + 'image'}
                />
              )}
              <div className="flex h-full grow flex-col items-start justify-between gap-6">
                <div className="flex w-full items-start justify-between gap-8">
                  <div className="flex items-center justify-start gap-4">
                    <h2> {vehicle.name}</h2>
                    {(user?.role === 'ADMIN' ||
                      user?.role === 'SUPERADMIN') && (
                      <Link to={`${vehicle.id}/update`}>
                        <button className="text-accent hover:underline">
                          Edit
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <ProfitsIcon className="size-6 shrink-0" />
                    {vehicle.price ? (
                      <p>{vehicle.price + 'p'}</p>
                    ) : (
                      <Icon
                        className="text-secondary"
                        path={mdiClose}
                        size={1.5}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-start gap-8 gap-y-4">
                  {vehicle.stats.size && (
                    <div className="flex flex-col items-center gap-1">
                      <p>SZE</p>
                      <div className="flex items-center gap-2">
                        <SizeIcon className="size-8" />
                        <p>{vehicle.stats.size}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.speed && (
                    <div className="flex flex-col items-center gap-1">
                      <p>SPD</p>
                      <div className="flex items-center gap-2">
                        <VehicleSpeedIcon className="size-8" />
                        <p>{vehicle.stats.speed}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.agility && (
                    <div className="flex flex-col items-center gap-1">
                      <p>AGL</p>
                      <div className="flex items-center gap-2">
                        <AgilityIcon className="size-8" />
                        <p>{vehicle.stats.agility}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.hull && (
                    <div className="flex flex-col items-center gap-1">
                      <p>HULL</p>
                      <div className="flex items-center gap-2">
                        <HullIcon className="size-8" />
                        <p>{vehicle.stats.hull}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.armor && (
                    <div className="flex flex-col items-center gap-1">
                      <p>AV</p>
                      <div className="flex items-center gap-2">
                        <ArmorIcon className="size-8" />
                        <p>{vehicle.stats.armor}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.cargo && (
                    <div className="flex flex-col items-center gap-1">
                      <p>CRG</p>
                      <div className="flex items-center gap-2">
                        <CargoIcon className="size-8" />
                        <p>{vehicle.stats.cargo}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.hangar && (
                    <div className="flex flex-col items-center gap-1">
                      <p>HGR</p>
                      <div className="flex items-center gap-2">
                        <HangarIcon className="size-8" />
                        <p>{vehicle.stats.hangar}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.pass && (
                    <div className="flex flex-col items-center gap-1">
                      <p>PASS</p>
                      <div className="flex items-center gap-2">
                        <PassIcon className="size-8" />
                        <p>{vehicle.stats.pass}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.stats.weapon && (
                    <div className="flex flex-col items-center gap-1">
                      <p>WPN</p>
                      <div className="flex items-center gap-2">
                        <VehicleWeaponIcon className="size-8" />
                        <p>{vehicle.stats.weapon}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className={`timing overflow-hidden`}>
                  <p
                    ref={descriptionRef}
                    className={`timing text-secondary flex flex-col gap-8 pr-8`}
                    style={
                      descriptionOpen
                        ? {
                            marginTop: 0,
                          }
                        : {
                            marginTop: -descriptionHeight - 4,
                          }
                    }
                  >
                    {vehicle.description}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${detailsOpen && 'pt-8'} timing overflow-hidden`}>
              <div
                ref={detailRef}
                className={`${detailsOpen && 'py-1'} timing text-secondary flex flex-col gap-8 pl-1 pr-8`}
                style={
                  detailsOpen
                    ? {
                        marginTop: 0,
                      }
                    : {
                        marginTop: -detailHeight - 4,
                      }
                }
              >
                {vehicle.weapons.length > 0 && (
                  <ThemeContainer chamfer="16" borderColor={accentPrimary}>
                    <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                      Mounted weapons
                    </p>
                    <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                      {vehicle.weapons?.map(
                        (
                          weapon: {
                            weapon: WeaponWithKeywords;
                            quantity: number;
                          },
                          index: number,
                        ) => {
                          return (
                            <>
                              <SubweaponCard
                                key={weapon.weapon.id}
                                weapon={weapon.weapon}
                                quantity={weapon.quantity}
                                toolTip={toolTip}
                                setToolTip={setToolTip}
                              />
                              {index < vehicle.weapons.length - 1 && (
                                <hr className="w-full border-yellow-300 border-opacity-50" />
                              )}
                            </>
                          );
                        },
                      )}
                    </div>
                  </ThemeContainer>
                )}
                {vehicle.modifications.length > 0 && (
                  <ThemeContainer chamfer="16" borderColor={accentPrimary}>
                    <p className="text-accent absolute -top-3 left-5 z-20 text-base">
                      Modifications
                    </p>
                    <div className="bg-primary flex flex-col gap-4 p-4 clip-4">
                      {vehicle.modifications?.map(
                        (modification: Modification, index: number) => {
                          return (
                            <>
                              <SubmodificationCard
                                key={modification.id}
                                modification={modification}
                              />
                              {index < vehicle.modifications.length - 1 && (
                                <hr className="w-full border-yellow-300 border-opacity-50" />
                              )}
                            </>
                          );
                        },
                      )}
                    </div>
                  </ThemeContainer>
                )}
              </div>
            </div>
            <span
              className={`absolute bottom-0 right-0 transition duration-300 ${detailsOpen && '-rotate-180'}`}
            >
              <Icon
                path={mdiChevronDown}
                size={1.1}
                className={`text-secondary`}
              ></Icon>
            </span>
          </div>
        )}
      </div>
    </ThemeContainer>
  );
};

export default VehicleCard;
