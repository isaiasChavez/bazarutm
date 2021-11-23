interface ServiceReponse {
  status: number
  msg: string
}

class SaleService {
  statusOk
  constructor () {
    this.statusOk = {
        status: 400,
        msg: 'ok'
      }
  }

  async createSale (): Promise<ServiceReponse> {
    try {
   
    } catch (error) {
      console.log('Error creating sale')
      return {
        status: 500,
        msg: 'Error creating sale'
      }
    }
  }
  
}

export default SaleService