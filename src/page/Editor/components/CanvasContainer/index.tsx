import { FC, HTMLAttributes } from "react"
import { DropTargetMonitor, useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid } from "uuid"

import { CanvasStyle } from "./style"
import { Category, DslType, ItemTypes } from "../../dragConfig/dragType"
import { PanelDrag } from "../WidgetPickerEditor/DemoWidget"
import { DropInfo } from "../../dragConfig/interface"
import { DslFrame } from "../../dragConfig/dsl"
import { DslActionName } from "../../store/dsl-action"
import { AppState } from "../../store/states/app-state"
import { DslState } from "../../store/states/dsl-state"
import { applyDslLayout } from "./demo/compose"
import { dslActions } from "@/reducers/CanvasContainer/dslReducer"

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CanvasContainer: FC<CanvasContainerProps> = (props) => {
  const { className } = props
  const dispatch = useDispatch()
  const { root } = useSelector<AppState, DslState>((state) => state.dslState)

  const [collectProps, drop] = useDrop<PanelDrag, DropInfo, Object>(
    () => ({
      accept: [
        ItemTypes.FRAME,
        ItemTypes.STACK,
        ItemTypes.ICON,
        ItemTypes.TEXT,
      ],
      drop: (item, monitor: DropTargetMonitor) => {
        console.log(item, monitor, "drop in container")
        if (monitor.getDropResult<DropInfo>()?.hasDropped == true) {
          return monitor.getDropResult<DropInfo>()!!
        }
        switch (item.type) {
          case ItemTypes.FRAME: {
            console.log("drop into root")
            dispatch(
              dslActions.dslActionHandler({
                type: DslActionName.AddFrame,
                dslFrame: {
                  dslKey: "dsl" + uuid(),
                  background: "#EEEEEE",
                  version: "0.0.1",
                  nodeChildren: [],
                  type: DslType["DslFrame"],
                  category: Category.Layout,
                  height: "100%",
                  width: "100%",
                  left: "auto",
                  right: "auto",
                  top: "auto",
                  bottom: "auto",
                  parentKey: "root",
                  position: "absolute",
                } as DslFrame,
              }),
            )
            return {
              parent: root,
              hasDropped: true,
            } as DropInfo
          }
        }
        return {
          parent: root,
          hasDropped: false,
        } as DropInfo
      },
    }),
    [],
  )

  return (
    <div className={className} css={CanvasStyle} ref={drop}>
      {root ? applyDslLayout(root) : <div>CanvasContainer</div>}
    </div>
  )
}

CanvasContainer.displayName = "CanvasContainer"
