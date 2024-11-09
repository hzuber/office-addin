// CaseCheckbox.tsx

import React from "react";
import { Checkbox } from "../../components/ui/checkbox";

interface CaseCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const CaseCheckbox: React.FC<CaseCheckboxProps> = ({ isChecked, onChange }) => (
  <Checkbox variant={"subtle"} checked={isChecked} onCheckedChange={() => onChange()}>
    Case-sensitive search
  </Checkbox>
);

export default CaseCheckbox;
