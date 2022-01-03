import { Category } from "./../categoria/categoria.entity";
import { CreatePublicationDTO } from "./publication.dto";
import { ServiceReponse, ServerResponse, StatusProductEnum } from "../../types";
import { Publication } from "./publication.entity";
import AssetService from "../asset/asset.service";
import { Asset } from "../asset/asset.entity";
import { Service } from "../interfaces/service.interface";
import { Producto } from "../product/product.entity";
import { StatusProduct } from "../product/statusproduct/statusproduct.entity";
import UserService from "../user/user.service";
import { User } from "../user/user.entity";
import { Request } from "express";
import { createQueryBuilder } from "typeorm";

class PublicationService extends Service {
  private statusOk;
  private assetService: AssetService = new AssetService();
  private userService: UserService = new UserService();

  constructor() {
    super();
    this.statusOk = {
      status: this.HTTPResponses.Ok,
      msg: "ok",
    };
  }

  async create(dto: CreatePublicationDTO): Promise<ServiceReponse> {
    try {
      console.log({ dto });
      const user: User = dto.body.user;

      console.log({ user });

      const statusProduct: StatusProduct = await StatusProduct.findOne({
        where: {
          name: dto.statusProduct,
        },
      });

      const category: Category = await Category.findOne({
        where: {
          name: dto.category,
        },
      });

      const producto: Producto = Producto.create({
        statusProduct,
      });
      await Producto.save(producto);

      const publication = Publication.create({
        category,
        coverPage: "",
        description: dto.description,
        title: dto.title,
        price: dto.price,
        producto,
        user,
      });

      await Publication.save(publication);

      return {
        msg: "ok",
        status: this.HTTPResponses.OkCreated,
      };
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("create", error),
      };
    }
  }

  async getOne(uuid: string): Promise<ServerResponse> {
    try {
      console.log({uuid})

      const publication = await Publication.createQueryBuilder("publication")
      .leftJoinAndSelect("publication.producto", "producto")
      .leftJoinAndSelect("producto.statusProduct", "statusProduct")
      .where("publication.id = 4")    
    .getOne();
    if (!publication) {
      return {
        msg: "There is not publication",
        status: this.HTTPResponses.OkNoContent,
      };
    } 
    const response = {...publication} as any  
    response.status = publication.producto.statusProduct.name
    delete response.producto
    delete response.id

    console.log({response})
/* 

     /*  const assets: Asset[] = await this.assetService.getAssetsPublication(
        publication
      ); */

      return {
        msg: "Ok",
        status: this.HTTPResponses.Ok,
        data: response
        ,
      };
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("getOne", error),
      };
    }
  }

  async getAll(): Promise<ServiceReponse> {
    try {
      const publications: Publication[] = await Publication.find({
        where: {
          isActive: true,
        },
        relations: ["category"],
        select: ["title", "coverPage", "description", "isActive"],
      });

      if (publications.length === 0) {
        return {
          msg: "There is not values",
          status: this.HTTPResponses.OkNoContent,
        };
      }

      return this.statusOk;
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("getAll", error),
      };
    }
  }

  async getAllOfUser(req: Request): Promise<ServerResponse> {
    try {
      const user = req.body.user;

      const publications: Publication[] = await Publication.find({
        where: {
          user,
        },
        relations: ["category"],
        select: [
          "title",
          "coverPage",
          "description",
          "isActive",
          "price",
          "uuid",
        ],
      });

      if (publications.length === 0) {
        return {
          msg: "There is not values",
          status: this.HTTPResponses.OkNoContent,
        };
      }
      this;

      return {
        ...this.statusOk,
        data: publications,
      };
    } catch (error) {
      return {
        status: this.HTTPResponses.InternalError,
        msg: this.eH.genericHandler("getAll", error),
      };
    }
  }
}

export default PublicationService;
