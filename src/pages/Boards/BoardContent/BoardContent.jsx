import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board }) => {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)


  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  // Cùng một thời điểm chỉ có một phần tử đang được kéo ( columns or cards )
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board])

  // Tìm một cái Column theo CardId
  const findColumnByCardId = (cardId) => {
    return orderedColumnsState.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    // console.log('handleDragOver', event)

    // Không làm gì nếu đang kéo columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Còn nếu kéo card thì xử lý
    const { active, over } = event

    // Kiểm tra nếu không tồn tại over or active (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return

    // activeDraggingCardId là cái card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCardId là cái card đang tương tác
    const { id: overCardId } = over

    // Tìm 2 columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // Kéo qua 2 Columns khác nhau thì xử lý logic
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnsState(prevColumns => {
        // Tìm vị trí (index) của cái overCard trong column đích nơi mà (activeCard) sắp được thả
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
        // Clone mảng OrderedColumnState cũ ra cái mới để xử lý
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
        // Column cũ
        if (nextActiveColumn) {
          //
          nextActiveColumn.cards =nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        // Column mới
        if (nextOverColumn) {
          //
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        return nextColumns
      })
    }
  }

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      return
    }

    const { active, over } = event

    // Kiểm tra nếu không tồn tại over or active (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return

    if (active.id != over.id) {
      // lấy vị trí cũ từ active
      const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)
      // lấy vị trí mới từ over
      const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)

      // Dùng arrayMove để sắp xếp lại mảng Columns ban đầu
      const dndOrderedColumnsState = arrayMove(orderedColumnsState, oldIndex, newIndex)

      // Sau xử lý APIs
      // const dndOrderedColumnsIds = dndOrderedColumnsState.map(c => c._id)
      // console.log('dndOrderedColumnsState', dndOrderedColumnsState)
      // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

      setOrderedColumnsState(dndOrderedColumnsState)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  // console.log('activeDragItemId', activeDragItemId)
  // console.log('activeDragItemType', activeDragItemType)
  // console.log('activeDragItemData', activeDragItemData)
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        display: 'flex',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumnsState}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemId || !activeDragItemType) && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) &&
            <Column column={activeDragItemData}/>
          }
          {(!activeDragItemId || !activeDragItemType) && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) &&
            <Card card={activeDragItemData}/>
          }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent