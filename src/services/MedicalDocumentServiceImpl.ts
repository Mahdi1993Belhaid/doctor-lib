import { MedicalDocument } from '../models/MedicalDocument';

export class MedicalDocumentServiceImpl {
  private data: MedicalDocument[] = [];
  private dataUrl = '/medicalDocuments.json';
  private storageKey = 'medicalDocuments';

  constructor() {
    this.loadInitialData();
  }

  private async loadInitialData() {
    // Check if data exists in localStorage
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.data = JSON.parse(storedData);
      console.log('Loaded data from localStorage:', this.data);
      return;
    }

    // If no data in localStorage, load from JSON file
    try {
      const response = await fetch(this.dataUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      this.data = await response.json();
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      console.log('Initial data loaded from JSON file:', this.data);
    } catch (error) {
      console.error('Error loading initial data:', error);
      throw error;
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    console.log('Data saved to localStorage:', this.data);
  }

  async getAll(): Promise<MedicalDocument[]> {
    await this.loadInitialData();
    return [...this.data];
  }

  async get(id: string): Promise<MedicalDocument> {
    await this.loadInitialData();
    const document = this.data.find(doc => doc.id === id);
    if (!document) {
      throw new Error(`Document with id ${id} not found`);
    }
    return { ...document };
  }

  async save(document: MedicalDocument): Promise<MedicalDocument> {
    await this.loadInitialData();
    if (document.id) {
      // Update existing document
      const index = this.data.findIndex(doc => doc.id === document.id);
      if (index === -1) {
        throw new Error(`Document with id ${document.id} not found`);
      }
      this.data[index] = { ...document };
    } else {
      // Add new document
      document.id = Date.now().toString(); // Generate a simple ID
      this.data.push({ ...document });
    }
    this.saveToLocalStorage();
    console.log('Data after save:', this.data);
    return { ...document };
  }

  async delete(id: string): Promise<void> {
    await this.loadInitialData();
    const index = this.data.findIndex(doc => doc.id === id);
    if (index === -1) {
      throw new Error(`Document with id ${id} not found`);
    }
    this.data.splice(index, 1);
    this.saveToLocalStorage();
    console.log('Data after delete:', this.data);
  }
}