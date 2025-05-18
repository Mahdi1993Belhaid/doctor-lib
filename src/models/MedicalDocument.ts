export interface Child {
    fullName: string;
    birthDate: Date | null;
    examinationDate: Date | null;
    testsAppliedToChild: string;
  }
  
  export interface Father {
    fatherName: string;
    fatherJob: string;
    fatherAge: number;
    fatherQualifications: string;
    fatherHealthState: string;
  }
  
  export interface Mother {
    motherName: string;
    motherJob: string;
    motherAge: number;
    motherQualifications: string;
    motherHealthState: string;
  }
  
  export interface Family {
    parentRelation: string;
    phoneNumber: string;
    completeAddress: string;
    wilaya: string;
    email: string;
    numberOfFamily: number;
    numberOfSiblings: number;
    childOrder: number;
    childLiveWith: string;
    familyRelation: string;
  }
  
  export interface Relative {
    familyRelationshipType: string;
    sex: string;
    age: number;
    job: string;
  }
  
  export interface Birth {
    typeOfBirth: string;
    durationOfPregnancy: number;
    maternalHealthCondition: string;
    maternalIssues: string;
    babyWeight: number;
  }
  
  export interface ChildDisease {
    medicalDocument: File | null;
    stateDescription: string;
    specialistFullName: string;
    phoneNumber: string;
    wilaya: string;
    services: string;
    doctors: string;
  }
  
  export interface PsychomotorDevelopment {
    isRunAbility: boolean;
    isStairsClimbing: boolean;
    isOpenCloseDoor: boolean;
    isSelfNaming: boolean;
    isSelfEating: boolean;
    isRecognizeBodyParts: boolean;
    isDailyCleanliness: boolean;
    evolution: string;
  }
  
  export interface Examination {
    fromMonth: number;
    toMonth: number;
    monthVisit: number;
    executerName: string;
    dateBilant: Date | null;
    size: number;
    weight: number;
    headDimension: number;
    description: string;
    examination: string;
  }
  
  export interface Operation {
    doctorName: string;
    surgicalDiagnosis: string;
    locationOfSurgery: string;
    dateOfSurgery: Date | null;
    healPeriod: number;
  }
  
  export interface Vaccination {
    year: number;
    age: number;
    vaccine: string;
  }
  
  export interface Psychoanalysis {
    psychologistName: string;
    isFamilyCaseExist: boolean;
    familyRelation: string;
    examination: string;
    specialistRecommendations: string;
  }
  
  export interface MedicalDocument {
    id?: string;
    documentPicture: File | null;
    firstName: string;
    lastName: string;
    sex: string;
    address: string;
    birthDate: Date | null;
    treatmentCenter: string;
    documentNumber: string;
    nameOfCaseStudy: string;
    examinationDate: Date | null;
    transferSource: string;
    reasonForExamination: string;
    formCompletedByName: string;
    isFormDataReconfirmedBySpecialist: boolean;
    relationshipWithChild: string;
    child: Child;
    father: Father;
    mother: Mother;
    family: Family;
    relative: Relative;
    birth: Birth;
    childDiseases: ChildDisease[];
    psychomotorDevelopment: PsychomotorDevelopment;
    examination: Examination;
    operations: Operation[];
    vaccinations: Vaccination[];
    psychoanalysis: Psychoanalysis;
  }
  
  export function createDefaultMedicalDocument(): MedicalDocument {
    return {
      id: undefined,
      documentPicture: null,
      firstName: '',
      lastName: '',
      sex: '',
      address: '',
      birthDate: null,
      treatmentCenter: '',
      documentNumber: '',
      nameOfCaseStudy: '',
      examinationDate: null,
      transferSource: '',
      reasonForExamination: '',
      formCompletedByName: '',
      isFormDataReconfirmedBySpecialist: false,
      relationshipWithChild: '',
      child: {
        fullName: '',
        birthDate: null,
        examinationDate: null,
        testsAppliedToChild: '',
      },
      father: {
        fatherName: '',
        fatherJob: '',
        fatherAge: 0,
        fatherQualifications: '',
        fatherHealthState: '',
      },
      mother: {
        motherName: '',
        motherJob: '',
        motherAge: 0,
        motherQualifications: '',
        motherHealthState: '',
      },
      family: {
        parentRelation: '',
        phoneNumber: '',
        completeAddress: '',
        wilaya: '',
        email: '',
        numberOfFamily: 0,
        numberOfSiblings: 0,
        childOrder: 0,
        childLiveWith: '',
        familyRelation: '',
      },
      relative: {
        familyRelationshipType: '',
        sex: '',
        age: 0,
        job: '',
      },
      birth: {
        typeOfBirth: '',
        durationOfPregnancy: 0,
        maternalHealthCondition: '',
        maternalIssues: '',
        babyWeight: 0,
      },
      childDiseases: [],
      psychomotorDevelopment: {
        isRunAbility: false,
        isStairsClimbing: false,
        isOpenCloseDoor: false,
        isSelfNaming: false,
        isSelfEating: false,
        isRecognizeBodyParts: false,
        isDailyCleanliness: false,
        evolution: '',
      },
      examination: {
        fromMonth: 0,
        toMonth: 0,
        monthVisit: 0,
        executerName: '',
        dateBilant: null,
        size: 0,
        weight: 0,
        headDimension: 0,
        description: '',
        examination: '',
      },
      operations: [],
      vaccinations: [],
      psychoanalysis: {
        psychologistName: '',
        isFamilyCaseExist: false,
        familyRelation: '',
        examination: '',
        specialistRecommendations: '',
      },
    };
  }