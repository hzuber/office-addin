// ClearButton.tsx

import React from "react";
import { IconButton } from "@chakra-ui/react";
import { IoIosClose } from "react-icons/io";

interface ClearButtonProps {
  onClear: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => (
  <IconButton variant={"surface"} size={"xs"} aria-label="Cancel search" onClick={onClear}>
    <IoIosClose />
  </IconButton>
);

export default ClearButton;
