import { Request, Response } from 'express'
import { updateHours, getInternById } from '../services/internService';
import { sendSuccess } from '../handlers/successHandler';
import { handleError } from '../handlers/errorHandler';


export const updateHoursController = async (req: Request, res: Response) => {
    try {
      const { intern_id } = req.params;
      const {new_hours} = req.body;
      const updateHoursIntern = await updateHours(parseInt(intern_id,10), new_hours);
      if(!updateHoursIntern){
        return res.status(404).json({ success: false, message: 'Interns process not found' })
      }
      sendSuccess(res,updateHoursIntern,'Interns process retrieved successfully')
      return res.status(200).json({ success: true, data: updateHoursIntern });
    } catch (error) {
      if (error instanceof Error) {
        handleError(res, error);
      }
    }
  };

export const getInternsById = async (req: Request, res: Response) => {
    try{
        const { intern_id } = req.params;
        const intern = await getInternById(parseInt(intern_id,10));
        if (!intern) {
        return res.status(404).json({ success: false, message: 'Event not found' });
        }
        sendSuccess(res, intern, 'Event retrieved succesfully');
    }catch(error){
      if (error instanceof Error) {
        handleError(res, error);
      }
    }
}