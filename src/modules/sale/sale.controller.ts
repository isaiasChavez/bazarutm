import { Request, Response } from 'express'
import {ServerResponse} from '../../types';
import {typesUser} from '../../types';
import SaleService from './sale.service';
class SaleController {
  private saleService: SaleService;
  constructor () {
    this.saleService = new SaleService();
  }
  public createSale = async (req: Request, res: Response): Promise<void> => {
    try {

      const data = req.body
      
      this.saleService.createSale()

      const response:ServerResponse ={
        status: 400,
        data:null,
        msg:"ok"
      }

      res.status(400).json(response)
    } catch (e) {
      res.status(500).json({
        msg:"Error!"
      })

    }
  }
}

export default SaleController
