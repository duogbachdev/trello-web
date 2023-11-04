import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
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

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={ board }/>
      <BoardContent board={ board }/>
    </Container>
  )
}

export default Board