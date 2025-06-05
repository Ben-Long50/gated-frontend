import { FieldState, FormApi } from '@tanstack/react-form';
import FormLinkModal from './FormLinkModal';
import { useState } from 'react';
import BtnRect from '../buttons/BtnRect';
import ArrowHeader2 from '../ArrowHeader2';
import { Item } from 'src/types/item';
import ItemCard from '../ItemCard';
import Items from '../Items';

const VehicleLinkField = ({
  form,
  vehicleList,
}: {
  form: FormApi;
  vehicleList?: Item[];
}) => {
  const [vehiclesOpen, setVehiclesOpen] = useState(false);

  const toggleVehicles = () => setVehiclesOpen(!vehiclesOpen);

  return (
    <>
      <form.Subscribe selector={(state: FieldState) => state.values.vehicles}>
        {(vehicles: Item[]) => (
          <>
            {vehicles.length > 0 && <ArrowHeader2 title="Linked Vehicles" />}
            <form.Field name="vehicles">
              {(field) => (
                <>
                  <FormLinkModal
                    key="vehicle"
                    field={field}
                    modalOpen={vehiclesOpen}
                    toggleModal={toggleVehicles}
                  >
                    {({ toggleFormLink }) => (
                      <Items
                        title="Link Vehicle"
                        itemList={vehicleList}
                        forcedMode="form"
                        toggleFormLink={toggleFormLink}
                      />
                    )}
                  </FormLinkModal>
                  {vehicles.map((vehicle: Item) => {
                    return (
                      <button
                        key={vehicle.id}
                        onClick={() => {
                          field.handleChange(
                            field.state.value.filter(
                              (item: Item) => item.id !== vehicle.id,
                            ),
                          );
                        }}
                      >
                        <ItemCard item={vehicle} mode="form" />
                      </button>
                    );
                  })}
                </>
              )}
            </form.Field>
          </>
        )}
      </form.Subscribe>
      <BtnRect
        className="w-1/3 min-w-48 self-end"
        ariaLabel="Open link vehicle modal"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleVehicles();
        }}
      >
        Link Vehicles
      </BtnRect>
    </>
  );
};

export default VehicleLinkField;
