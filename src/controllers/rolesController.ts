import { Request, Response } from 'express';
import { handleError } from '../handlers/errorHandler';
import { sendSuccess } from '../handlers/successHandler';
import * as RolesInteractor from '../interactors/rolesInteractor';
import Rol from '../models/rol';

export const getRoles = async (req: Request, res: Response) => {
  const rolName = req.body.name;
  try {
    const roles = await RolesInteractor.getRoles(rolName);
    if (!roles) {
      return res.status(404).json({ success: false, message: 'role not found' });
    }
    sendSuccess(res, roles, 'Roles retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const createRol = async (req: Request, res: Response) => {
  const newRol: Rol = req.body;
  try {
    const rol = await RolesInteractor.createRol(newRol);
    if (!rol) {
      return res.status(404).json({ success: false, message: 'can not create rol' });
    }
    sendSuccess(res, rol, 'Roles retrieved successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const editRol = async (req: Request, res: Response) => {
  const rolToEdit: Rol = req.body;
  const id: number = parseInt(req.params.id);
  try {
    const editedRol = await RolesInteractor.editRol(rolToEdit, id);
    if (!editedRol) {
      return res.status(404).json({ success: false, message: 'can not edit rol' });
    }
    sendSuccess(res, editedRol, 'Roles edited successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};

export const disableRol = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const disabledRol = await RolesInteractor.disableRol(id);
    if (!disabledRol) {
      return res.status(404).json({ success: false, message: 'can not delet rol' });
    }
    sendSuccess(res, disabledRol, 'Roles deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, error);
    }
  }
};
