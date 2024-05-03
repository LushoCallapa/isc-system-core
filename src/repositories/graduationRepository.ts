import GraduationProcess from '../models/graduationProcess';
import db from './pg-connection';

const tableName = 'graduation_process';

export const getGraduationProcessById = async (id: number) => {
  try {
    const graduationProcess = await db(`${tableName} as gp`)
      .join('users as student', 'gp.student_id', 'student.id')
      .leftJoin('users as tutor', 'gp.tutor_id', 'tutor.id')
      .leftJoin('users as reviewer', 'gp.reviewer_id', 'reviewer.id')
      .join('modalities', 'gp.modality_id', 'modalities.id')
      .select(
        'student.name as student_name',
        'tutor.name as tutor_name',
        'reviewer.name as reviewer_name',
        'modalities.name as modality_name',
        'gp.*'
      )
      .where('gp.id', id)
      .first();
    return graduationProcess;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.getGraduationProcessById:', error);
    throw new Error('Error fetching Graduation Process');
  }
};

export const updateGraduationProcess = async (
  id: number,
  updatedData: Partial<GraduationProcess>
) => {
  try {
    const updatedRows = await db(tableName).where({ id }).update(updatedData);
    if (updatedRows === 0) {
      throw new Error('Graduation process not found or no change made');
    }
    return await db(tableName).where({ id }).first();
  } catch (error) {
    console.error('Error in GraduationProcessRepository.updateGraduationProcess:', error);
    throw new Error('Error updating Graduation Process');
  }
};

export const createGraduationProcess = async (data: GraduationProcess) => {
  try {
    const [newGraduationProcess] = await db(tableName).insert(data).returning('*');
    return newGraduationProcess;
  } catch (error) {
    console.error('Error in GraduationProcessRepository.createGraduationProcess:', error);
    throw new Error('Error creating Graduation Process');
  }
};

export const getGraduationProcesses = async () => {
  try {
    const students = await db('graduation_process as gp')
      .select(
        'u.name as student_name',
        'm.name as modality',
        'tutor.name as tutor_name',
        'reviewer.name as reviewer_name',
        'gp.period as period',
        'gp.id'
      )
      .join('users as u', 'u.id', '=', 'gp.student_id')
      .join('modalities as m', 'm.id', '=', 'gp.modality_id')
      .leftJoin('users as tutor', 'tutor.id', '=', 'gp.tutor_id')
      .leftJoin('users as reviewer', 'reviewer.id', '=', 'gp.reviewer_id');
    return students;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
