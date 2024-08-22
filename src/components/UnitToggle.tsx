import React from 'react';

interface UnitToggleProps {
  unit: string;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <button onClick={onToggle} className="button">
      Temp. in {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
    </button>
  );
};

export default UnitToggle;
