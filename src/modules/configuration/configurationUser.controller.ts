import { Category } from "./../categoria/categoria.entity";
import { Request, Response } from "express";
import { ServerResponse } from "../../types";
import { validateOrReject } from "class-validator";
import { Controller } from "../interfaces/service.interface";
import ConfigurationUserService from "./configurationUser.service";
import { UpdateConfigurationUser } from "./configuration.dto";

class ConfigurationUserController extends Controller {
  private configurationService: ConfigurationUserService;

  private firsValueRes = { status: 400, data: null, msg: "ok" };
  constructor() {
    super();
    this.configurationService = new ConfigurationUserService();
  }


  public update = async (req: Request, res: Response): Promise<void> => {
      
    try {
      let response: ServerResponse = this.firsValueRes;

      const data = new UpdateConfigurationUser(req.body);

      console.log("ACTUALIZANDO CONFIGURACION",{data});
      
      await validateOrReject(data)
        .then(async () => {
          response = await this.configurationService.update(data, req);
        })
        .catch((e) => {
          response.msg = this.eH.validationHandler("update", e);
        });

      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler("update", e) });
    }
  };
  public get = async (req: Request, res: Response): Promise<void> => {
    try {
      let response: ServerResponse = this.firsValueRes;
      
      response = await this.configurationService.get(req);

      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ msg: this.eH.genericHandler("update", e) });
    }
  };
}

export default ConfigurationUserController;
