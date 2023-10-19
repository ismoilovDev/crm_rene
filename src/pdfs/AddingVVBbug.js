import { vvb_accountant_of_branches } from "../utils/const";

function AddingVVBbug(id) {
  if (vvb_accountant_of_branches?.includes(id)) {
    return true;
  }
  return false;
}

export default AddingVVBbug;