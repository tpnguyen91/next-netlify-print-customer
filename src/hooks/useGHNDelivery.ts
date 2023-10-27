const now = new Date()
const body = {
  shop_id: 1382315,
  status: ['ready_to_pick', 'picking', 'money_collect_picking'],
  // status: [
  //   'picked',
  //   'sorting',
  //   'storing',
  //   'transporting',
  //   'delivering',
  //   'delivery_fail',
  //   'money_collect_delivering'
  // ],
  payment_type_id: [1, 2, 4, 5],
  from_time: Number.parseFloat(
    (
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime() /
      1000
    ).toFixed(0)
  ),
  to_time: Number.parseFloat((now.getTime() / 1000).toFixed(0)),
  offset: 0,
  limit: 100,
  from_cod_amount: 0,
  to_cod_amount: 0,
  ignore_shop_id: false,
  shop_ids: null,
  is_search_exactly: false,
  is_print: null,
  is_cod_failed_collected: null,
  is_document_pod: null,
  source: '5sao'
}

const useGHNDelivery = () => {
  const fetchListWaitingPickup = async () => {
    try {
      const res = await fetch(
        `https://fe-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/search`,
        {
          method: 'POST',
          headers: {
            token: 'f8bb196b-666c-11ee-a59f-a260851ba65c',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      )
      const data = await res.json()
      return Promise.resolve(data.data)
    } catch (err) {
      return Promise.resolve([])
    }
  }

  return {
    fetchListWaitingPickup
  }
}

export default useGHNDelivery
