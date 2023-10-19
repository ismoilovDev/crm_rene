import { vvb_cashier_of_branches } from "../utils/const";

function AddingVVBkassa(id) {
  if (vvb_cashier_of_branches?.includes(id)) {
    return true;
  }
  return false;
}

export default AddingVVBkassa;