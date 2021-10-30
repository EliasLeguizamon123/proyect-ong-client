import React, { useState, useEffect } from 'react'
import ModalMessage from '../../components/BackContactTable/ModalMessage'
import BackOfficeTable from '../../components/Backoffice/BackOfficeTable'
import { alertConfirm, alertSuccess } from '../../utils/alerts'
import { sendRequest } from '../../utils/sendRequest'

export default function BackContactPage () {
  const [totalData, setTotalData] = useState([])
  const [items, setItems] = useState([])
  const [pageTotal, setPageTotal] = useState(0)
  const limit = 8
  const [messageData, setMessageData] = useState()
  const handleViewMessage = element => {
    setMessageData(element)
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await sendRequest('get', `/contacts`)
      setTotalData(res.rows)
      setPageTotal(Math.ceil(res.count / limit))
      setItems(res.rows.slice(0, limit))
    }

    fetchData()
  }, [pageTotal])

  const tableHead = ['Nombre', 'Correo Electronico', 'Telefono', 'Mensaje']
  const handleDelete = id => {
    alertConfirm(
      'Seguro deseas borrar esta novedad?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/contacts/${id}`)
        await alertSuccess('Novedad borrada con éxito')
      }
    )
  }

  return (
    <>
      <BackOfficeTable
        allItems={totalData}
        itemsToShow={items}
        pageCount={pageTotal}
        limit={limit}
        handleDelete={handleDelete}
        handleEdit={handleViewMessage}
        setItemsToShow={setItems}
        title='Contactos'
        tableHead={tableHead}
        contacts
      />

      {messageData && <ModalMessage messageData={messageData} />}
    </>
  )
}
