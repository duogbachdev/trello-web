import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis'
const Board = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    // lấy chuẩn boardId từ url về dùng react-router-dom
    const boardId = '65460c112cf663602a9e5771'
    // Call api
    fetchBoardDetailsAPI(boardId)
      .then(board => {
        setBoard(board)
      })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    console.log('createdColumn', createdColumn)

    //cập nhật state board
  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    console.log('createdCard', createdCard)

    //cập nhật state board
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={ board }/>
      <BoardContent board={ board } createNewColumn={createNewColumn} createNewCard={createNewCard}/>
    </Container>
  )
}

export default Board