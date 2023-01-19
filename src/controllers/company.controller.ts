import bcrypt from "bcryptjs";
import { Request, response, Response } from "express";
import prisma from "../database";
import getLocation from "../modules/geocoder";
import MESSAGE from "../constants/messages";


class CompanyController {

  public async index(req: Request, res: Response) {
    const companies = await prisma.company.findMany();

    res.json({ message: MESSAGE.SUCCESS.COMPANY_INDEX, companies }).status(200);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return res.status(404).json({ error: MESSAGE.ERROR.COMPANY_INVALID });
    }

    return res.json(company).status(200);
  }

  public async create(req: Request, res: Response) {
    const {
      companyName,
      site,
      responsibleName,
      responsiblePhone,
      companyEmail,
      address,
      phone,
      typesOfMaterialYouRecycle,
      removeTheMaterialAtAnotherAddress,
      loginEmail,
      password,
    } = req.body;

    const newPassword = bcrypt.hashSync(password, 10);

    const location = await getLocation(
      `${address.street} ${address.zip} ${address.city} ${address.state}`
    );
    var addressLocation = address;
    addressLocation["location"] = location;

    const company = await prisma.company.create({
      data: {
        companyName,
        site,
        responsibleName,
        responsiblePhone,
        companyEmail,
        address: addressLocation,
        phone,
        typesOfMaterialYouRecycle,
        removeTheMaterialAtAnotherAddress,
        loginEmail,
        password: newPassword,
      },
    });

    return res.json(company).status(201);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      companyName,
      site,
      responsibleName,
      responsiblePhone,
      companyEmail,
      address,
      phone,
      typesOfMaterialYouRecycle,
      removeTheMaterialAtAnotherAddress,
      loginEmail,
      password,
    } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);

    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return res.status(404).json({
        error: MESSAGE.ERROR.COMPANY_INVALID,
      });
    }

    const location = await getLocation(
      `${address.street} ${address.zip} ${address.city} ${address.state}`
    );
    var addressLocation = address;
    addressLocation["location"] = location;

    const updatedCompany = await prisma.company.update({
      data: {
        companyName,
        site,
        responsibleName,
        responsiblePhone,
        companyEmail,
        address: addressLocation,
        phone,
        typesOfMaterialYouRecycle,
        removeTheMaterialAtAnotherAddress,
        loginEmail,
        password,
      },
      where: { id },
    });

    res.json(updatedCompany).status(200);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return res.status(404).json({ error: MESSAGE.ERROR.COMPANY_INVALID });
    }

    await prisma.company.delete({
      where: {
        id,
      },
    });

    return res.sendStatus(204);
  }
}

export default CompanyController;
