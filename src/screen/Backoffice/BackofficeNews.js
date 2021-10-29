import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { sendRequest } from '../../utils/sendRequest'
import { alertSuccess, alertConfirm } from '../../utils/alerts'
import BackOfficeTable from '../../components/Backoffice/BackOfficeTable'

const NewsListEdit = () => {
  let history = useHistory()
  const [allNews, setAllNews] = useState([])
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 5

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    const res = await sendRequest('get', `/news`)

    setPageCount(Math.ceil(res.count / limit))
    setAllNews(res.rows)
    setItemsToShow(res.rows.slice(0, limit))
  }

  const handleDelete = id => {
    alertConfirm(
      'Seguro deseas borrar esta novedad?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/news/${id}`)
        await alertSuccess('Novedad borrada con éxito')
        fetchNews()
      }
    )
  }

  const handleEdit = id => {
    history.push(`/backoffice/novedades/${id}`)
  }

  const tableHead = ['Nombre', 'Imagen', 'Creada', 'Acciones']

  return (
    <BackOfficeTable
      allItems={allNews}
      itemsToShow={itemsToShow}
      pageCount={pageCount}
      limit={limit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      setItemsToShow={setItemsToShow}
      title='Novedades'
      tableHead={tableHead}
      formRoute='novedades'
    />
  )
}

export default NewsListEdit
