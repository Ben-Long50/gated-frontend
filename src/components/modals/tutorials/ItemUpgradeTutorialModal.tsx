import BtnRect from 'src/components/buttons/BtnRect';
import Divider from 'src/components/Divider';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

const ItemUpgradeTutorialModal = () => {
  const navigate = useNavigate();

  return (
    <Modal>
      <h1 className="text-center">Item Modification System</h1>
      <Divider />
      <div>
        <p>
          Welcome to Electric Death Online's item modification system. Using
          this system, you can upgrade your weapons, armor and other items by
          increasing the item's stats and adjusting the item's traits by either
          upgrading the values on current traits or adding new ones.
          <br />
          <br />
          Each grade level (denoted by the number of star icons on the item)
          awards you 5 Grade Points (GP) to spend on upgrades. Each stat and
          trait option costs a different number of grade points to upgrade
          depending on how impactful that upgrade is to the overall power of the
          item. For example, adding a point of damage to a weapon costs 10GP
          while adding a point of Mag Capacity only costs 2GP.
          <br />
          <br />
          Increasing the grade of your item is not free. Naturally, the higher
          the price of the base item, the higher the price of each grade level
          applied. Not only that, but grade levels become increasingly more
          expensive to purchase for each level applied. Things can get expensive
          real fast. Such is the cost of having a powerful item perfectly suited
          to your build.
          <br />
          <br />
          Once the purchase of an item modification is confirmed, you cannot
          undo your chosen GP distribution, so be sure the chosen upgrades are
          the ones you want to carry on the item forever.
          <br />
          <br />
          To apply and purchase upgrades, follow this list:
          <br />
          <br />
        </p>
        <ol>
          <li>
            Use the plus and minus buttons next to "Grade" to set the number of
            grade levels you want to purchase for the item. GP corresponding to
            the set grade level will be shown below.
          </li>
          <li>
            Use the plus and minus buttons next to each stat to spend your
            available GP on permanent stat bonuses.
          </li>
          <li>
            When all your GP is allocated, you can view the final price of the
            chosen upgrades at the bottom of the form.
          </li>
          <li>
            Click the "Modify" button to confirm your item's upgrades. Profits
            will automatically be deducted from your character for the purchase.
          </li>
        </ol>
      </div>

      <BtnRect
        className="mt-4 w-full"
        type="button"
        ariaLabel="Close tutorial"
        onClick={(e) => {
          e.preventDefault();
          navigate('..');
        }}
      >
        Close
      </BtnRect>
    </Modal>
  );
};

export default ItemUpgradeTutorialModal;
