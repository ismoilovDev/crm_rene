import { vvb_head_of_branches } from "../utils/const";

function Adding_VVB(id) {
  if (vvb_head_of_branches?.includes(id)) {
    return true;
  }
  return false;
}

export default Adding_VVB;