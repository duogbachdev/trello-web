import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

const BoardContent = ({ board }) => {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)


  const [orderedColumnsState, setOrderedColumnsState] = useState([])
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnsState(orderedColumns)
  }, [board])
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd', event)
    const { active, over } = event

    // Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return

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
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        display: 'flex',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumnsState}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent