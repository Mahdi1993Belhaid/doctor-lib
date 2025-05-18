import {MedicalDocument} from '../models/MedicalDocument';
export interface MedicalDocumentService {
    save(medicalDocument: MedicalDocument): Promise<MedicalDocument>;
   
    get(id: string): Promise<MedicalDocument | null>;
    getAll(): Promise<MedicalDocument[]>;
   
  }