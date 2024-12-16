import { useContext, useState } from 'react';
import InputField from './InputField';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './BtnRect';
import AttributeCard from './AttributeCard';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import useCreatePerkMutation from '../hooks/useCreatePerkMutation/useCreatePerkMutation';

const PerkForm = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requirements: {
      attributes: {
        cybernetica: {
          points: 0,
          skills: { chromebits: 0, hardwired: 0, motorized: 0, networked: 0 },
        },
        esoterica: {
          points: 0,
          skills: { gestalt: 0, godhead: 0, mysticism: 0, outerworld: 0 },
        },
        peace: {
          points: 0,
          skills: { barter: 0, erudition: 0, rhetoric: 0, treatment: 0 },
        },
        violence: {
          points: 0,
          skills: { assault: 0, shooting: 0, subterfuge: 0, threshold: 0 },
        },
      },
    },
  });

  const createPerk = useCreatePerkMutation(apiUrl, authToken);

  const handleSubmit = () => {
    createPerk.mutate(formData);
  };

  const handleAttributeIncrement = (attribute) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      updatedFormData.requirements.attributes = {
        ...prevFormData.requirements.attributes,
        [attribute]: {
          ...prevFormData.requirements.attributes[attribute],
          points: prevFormData.requirements.attributes[attribute].points + 1,
        },
      };
      return updatedFormData;
    });
  };

  const handleAttributeDecrement = (attribute) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      updatedFormData.requirements.attributes = {
        ...prevFormData.requirements.attributes,
        [attribute]: {
          ...prevFormData.requirements.attributes[attribute],
          points: prevFormData.requirements.attributes[attribute].points - 1,
        },
      };
      return updatedFormData;
    });
  };

  const handleSkillIncrement = (attribute, skill) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      updatedFormData.requirements.attributes = {
        ...prevFormData.requirements.attributes,
        [attribute]: {
          ...prevFormData.requirements.attributes[attribute],
          skills: {
            ...prevFormData.requirements.attributes[attribute].skills,
            [skill]:
              prevFormData.requirements.attributes[attribute].skills[skill] + 1,
          },
        },
      };
      return updatedFormData;
    });
  };

  const handleSkillDecrement = (attribute, skill) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      updatedFormData.requirements.attributes = {
        ...prevFormData.requirements.attributes,
        [attribute]: {
          ...prevFormData.requirements.attributes[attribute],
          skills: {
            ...prevFormData.requirements.attributes[attribute].skills,
            [skill]:
              prevFormData.requirements.attributes[attribute].skills[skill] - 1,
          },
        },
      };
      return updatedFormData;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <ThemeContainer
      chamfer="16"
      className="bg-primary flex w-full min-w-96 grow flex-col justify-around gap-8 p-8 clip-4"
      borderColor={accentPrimary}
    >
      <h1 className="text-primary">Create Perk</h1>
      <InputField
        type="text"
        name="name"
        label="Perk name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextAreaField
        name="description"
        label="Perk description"
        value={formData.description}
        onChange={handleChange}
      />
      <h2>Requirements</h2>
      <div className="flex w-full grow flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-10">
        {Object.entries(formData.requirements.attributes).map(
          ([attribute, { points, skills }]) => (
            <AttributeCard
              key={attribute}
              category={attribute}
              points={points}
              skills={skills}
              handleAttributeIncrement={handleAttributeIncrement}
              handleAttributeDecrement={handleAttributeDecrement}
              handleSkillIncrement={handleSkillIncrement}
              handleSkillDecrement={handleSkillDecrement}
            />
          ),
        )}
      </div>

      <BtnRect className="w-full" onClick={handleSubmit}>
        Create
      </BtnRect>
    </ThemeContainer>
  );
};

export default PerkForm;
