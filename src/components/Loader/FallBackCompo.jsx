import { memo } from "react"
import SkeletonRow from "./SkeletonRow"

export const FallBackCompo = memo(() => {
   return (
      <div className="fallback_loader"></div>
   )
})