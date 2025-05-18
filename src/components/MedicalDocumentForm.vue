<template>
    <div class="p-4">
      <h2 class="h4 fw-bold mb-4">{{ $t('form.medicalRecord') }} {{ medicalDocument.id ? `(ID: ${medicalDocument.id})` : '(New)' }}</h2>
  
      <!-- Stepper -->
      <div class="stepper mb-4">
        <div class="steps d-flex justify-content-between">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step"
            :class="{ active: currentStep === index + 1, completed: currentStep > index + 1 }"
          >
            <span class="step-number">{{ index + 1 }}</span>
            <span class="step-label">{{ $t(step.label) }}</span>
          </div>
        </div>
      </div>
  
      <!-- Step Content -->
      <transition name="fade" mode="out-in">
        <div v-if="medicalDocument.id || !isLoading" class="card p-3 mb-3" :key="currentStep">
          <div v-if="currentStep === 1">
            <h3 class="h5 mb-3">{{ $t('form.basicInfo') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <div class="image-preview mb-3">
                  <img v-if="documentPicturePreview" :src="documentPicturePreview" alt="Document Picture Preview" class="img-fluid" />
                  <div v-else class="placeholder">No image uploaded</div>
                </div>
                <label class="form-label">{{ $t('form.documentPicture') }}</label>
                <input type="file" class="form-control" accept="image/*" @change="handleDocumentPictureUpload($event)" />
              </div>
              <div class="col-md-8">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.firstName') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.firstName" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.lastName') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.lastName" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.sex') }}</label>
                    <select class="form-select" v-model="medicalDocument.sex">
                      <option value="">{{ $t('form.choose') }}</option>
                      <option value="ذكر">{{ $t('form.male') }}</option>
                      <option value="أنثى">{{ $t('form.female') }}</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.address') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.address" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.birthDate') }}</label>
                    <input type="date" class="form-control" :value="formatDate(medicalDocument.birthDate)" @input="updateDate($event, 'birthDate')" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.treatmentCenter') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.treatmentCenter" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.documentNumber') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.documentNumber" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.caseStudyName') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.nameOfCaseStudy" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.examinationDate') }}</label>
                    <input type="date" class="form-control" :value="formatDate(medicalDocument.examinationDate)" @input="updateDate($event, 'examinationDate')" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.transferSource') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.transferSource" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.reasonForExamination') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.reasonForExamination" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.formCompletedBy') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.formCompletedByName" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.reconfirmedBySpecialist') }}</label>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" v-model="medicalDocument.isFormDataReconfirmedBySpecialist" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">{{ $t('form.relationshipWithChild') }}</label>
                    <input type="text" class="form-control" v-model="medicalDocument.relationshipWithChild" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="currentStep === 2">
            <h3 class="h5 mb-3">{{ $t('form.childInfo') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.fullName') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.child.fullName" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.birthDate') }}</label>
                <input type="date" class="form-control" :value="formatDate(medicalDocument.child.birthDate)" @input="updateChildDate($event, 'birthDate')" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.examinationDate') }}</label>
                <input type="date" class="form-control" :value="formatDate(medicalDocument.child.examinationDate)" @input="updateChildDate($event, 'examinationDate')" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.testsApplied') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.child.testsAppliedToChild" />
              </div>
            </div>
          </div>
          <div v-if="currentStep === 3">
            <h3 class="h5 mb-3">{{ $t('form.fatherInfo') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.fatherName') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.father.fatherName" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.fatherJob') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.father.fatherJob" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.fatherAge') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.father.fatherAge" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.fatherQualifications') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.father.fatherQualifications" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.fatherHealth') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.father.fatherHealthState" />
              </div>
            </div>
          </div>
          <div v-if="currentStep === 4">
            <h3 class="h5 mb-3">{{ $t('form.motherInfo') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.motherName') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.mother.motherName" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.motherJob') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.mother.motherJob" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.motherAge') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.mother.motherAge" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.motherQualifications') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.mother.motherQualifications" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.motherHealth') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.mother.motherHealthState" />
              </div>
            </div>
          </div>
          <div v-if="currentStep === 5">
            <h3 class="h5 mb-3">{{ $t('form.familyInfo') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.parentRelation') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.family.parentRelation" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.phoneNumber') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.family.phoneNumber" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.completeAddress') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.family.completeAddress" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.wilaya') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.family.wilaya" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.email') }}</label>
                <input type="email" class="form-control" v-model="medicalDocument.family.email" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.numberOfFamily') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.family.numberOfFamily" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.numberOfSiblings') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.family.numberOfSiblings" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.childOrder') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.family.childOrder" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.childLiveWith') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.family.childLiveWith" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.familyRelation') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.family.familyRelation" />
              </div>
            </div>
          </div>
          <div v-if="currentStep === 6">
            <h3 class="h5 mb-3">{{ $t('form.relativeInfo') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.familyRelationshipType') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.relative.familyRelationshipType" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.relativeSex') }}</label>
                <select class="form-select" v-model="medicalDocument.relative.sex">
                  <option value="">{{ $t('form.choose') }}</option>
                  <option value="ذكر">{{ $t('form.male') }}</option>
                  <option value="أنثى">{{ $t('form.female') }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.relativeAge') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.relative.age" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.relativeJob') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.relative.job" />
              </div>
            </div>
          </div>
          <div v-if="currentStep === 7">
            <h3 class="h5 mb-3">{{ $t('form.birthInfo') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.typeOfBirth') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.birth.typeOfBirth" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.pregnancyDuration') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.birth.durationOfPregnancy" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.maternalHealth') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.birth.maternalHealthCondition" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.maternalIssues') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.birth.maternalIssues" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.babyWeight') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.birth.babyWeight" step="0.1" />
              </div>
            </div>
          </div>
          <div v-if="currentStep === 8">
            <h3 class="h5 mb-3">{{ $t('form.childDiseases') }}</h3>
            <div v-for="(disease, index) in medicalDocument.childDiseases" :key="index" class="row g-3 mb-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.stateDescription') }}</label>
                <input type="text" class="form-control" v-model="disease.stateDescription" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.specialistFullName') }}</label>
                <input type="text" class="form-control" v-model="disease.specialistFullName" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.phoneNumber') }}</label>
                <input type="text" class="form-control" v-model="disease.phoneNumber" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.wilaya') }}</label>
                <input type="text" class="form-control" v-model="disease.wilaya" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.services') }}</label>
                <input type="text" class="form-control" v-model="disease.services" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.doctors') }}</label>
                <input type="text" class="form-control" v-model="disease.doctors" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.medicalDocument') }}</label>
                <input type="file" class="form-control" @change="handleFileUpload($event, index)" />
                <div v-if="disease.medicalDocument" class="mt-2">
                  <small>Uploaded: {{ disease.medicalDocument.name }}</small>
                </div>
              </div>
              <div class="col-md-4">
                <button class="btn btn-danger" @click="removeChildDisease(index)">{{ $t('form.remove') }}</button>
              </div>
            </div>
            <button class="btn btn-primary" @click="addChildDisease">{{ $t('form.addDisease') }}</button>
          </div>
          <div v-if="currentStep === 9">
            <h3 class="h5 mb-3">{{ $t('form.psychomotorDevelopment') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.runAbility') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="medicalDocument.psychomotorDevelopment.isRunAbility" />
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.stairsClimbing') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="medicalDocument.psychomotorDevelopment.isStairsClimbing" />
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.openCloseDoor') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="medicalDocument.psychomotorDevelopment.isOpenCloseDoor" />
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.selfNaming') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="medicalDocument.psychomotorDevelopment.isSelfNaming" />
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.selfEating') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="medicalDocument.psychomotorDevelopment.isSelfEating" />
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.recognizeBodyParts') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="medicalDocument.psychomotorDevelopment.isRecognizeBodyParts" />
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.dailyCleanliness') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="medicalDocument.psychomotorDevelopment.isDailyCleanliness" />
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.evolution') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.psychomotorDevelopment.evolution" />
              </div>
            </div>
          </div>
          <div v-if="currentStep === 10">
            <h3 class="h5 mb-3">{{ $t('form.examination') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.fromMonth') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.examination.fromMonth" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.toMonth') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.examination.toMonth" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.monthVisit') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.examination.monthVisit" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.executerName') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.examination.executerName" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.dateBilant') }}</label>
                <input type="date" class="form-control" :value="formatDate(medicalDocument.examination.dateBilant)" @input="updateExaminationDate($event, 'dateBilant')" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.size') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.examination.size" step="0.1" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.weight') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.examination.weight" step="0.1" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.headDimension') }}</label>
                <input type="number" class="form-control" v-model.number="medicalDocument.examination.headDimension" step="0.1" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.description') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.examination.description" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.examination') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.examination.examination" />
              </div>
            </div>
          </div>
          <div v-if="currentStep === 11">
            <h3 class="h5 mb-3">{{ $t('form.operations') }}</h3>
            <div v-for="(operation, index) in medicalDocument.operations" :key="index" class="row g-3 mb-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.doctorName') }}</label>
                <input type="text" class="form-control" v-model="operation.doctorName" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.surgicalDiagnosis') }}</label>
                <input type="text" class="form-control" v-model="operation.surgicalDiagnosis" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.locationOfSurgery') }}</label>
                <input type="text" class="form-control" v-model="operation.locationOfSurgery" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.dateOfSurgery') }}</label>
                <input type="date" class="form-control" :value="formatDate(operation.dateOfSurgery)" @input="updateOperationDate($event, index, 'dateOfSurgery')" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.healPeriod') }}</label>
                <input type="number" class="form-control" v-model.number="operation.healPeriod" />
              </div>
              <div class="col-md-4">
                <button class="btn btn-danger" @click="removeOperation(index)">{{ $t('form.remove') }}</button>
              </div>
            </div>
            <button class="btn btn-primary" @click="addOperation">{{ $t('form.addOperation') }}</button>
          </div>
          <div v-if="currentStep === 12">
            <h3 class="h5 mb-3">{{ $t('form.vaccinations') }}</h3>
            <div v-for="(vaccination, index) in medicalDocument.vaccinations" :key="index" class="row g-3 mb-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.year') }}</label>
                <input type="number" class="form-control" v-model.number="vaccination.year" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.age') }}</label>
                <input type="number" class="form-control" v-model.number="vaccination.age" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.vaccine') }}</label>
                <input type="text" class="form-control" v-model="vaccination.vaccine" />
              </div>
              <div class="col-md-4">
                <button class="btn btn-danger" @click="removeVaccination(index)">{{ $t('form.remove') }}</button>
              </div>
            </div>
            <button class="btn btn-primary" @click="addVaccination">{{ $t('form.addVaccination') }}</button>
          </div>
          <div v-if="currentStep === 13">
            <h3 class="h5 mb-3">{{ $t('form.psychoanalysis') }}</h3>
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.psychologistName') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.psychoanalysis.psychologistName" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.isFamilyCaseExist') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="medicalDocument.psychoanalysis.isFamilyCaseExist" />
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.familyRelation') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.psychoanalysis.familyRelation" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.examination') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.psychoanalysis.examination" />
              </div>
              <div class="col-md-4">
                <label class="form-label">{{ $t('form.description') }}</label>
                <input type="text" class="form-control" v-model="medicalDocument.psychoanalysis.specialistRecommendations" />
              </div>
            </div>
          </div>
        </div>
      </transition>
  
      <!-- Navigation Buttons -->
      <div class="d-flex justify-content-between mt-4" v-if="medicalDocument.id || !isLoading">
        <button class="btn btn-secondary" @click="prevStep" :disabled="currentStep === 1">
          {{ $t('form.previous') }}
        </button>
        <button
          v-if="currentStep < steps.length"
          class="btn btn-primary"
          @click="nextStep"
        >
          {{ $t('form.next') }}
        </button>
        <button
          v-if="currentStep === steps.length"
          class="btn btn-primary"
          @click="saveDocument"
        >
          {{ $t('form.submit') }}
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { MedicalDocument, createDefaultMedicalDocument } from '../models/MedicalDocument';
  import { MedicalDocumentServiceImpl } from '../services/MedicalDocumentServiceImpl';
  
  export default defineComponent({
    name: 'MedicalDocumentForm',
    props: {
      id: {
        type: String,
        required: false,
      },
    },
    setup(props) {
      const { t } = useI18n();
      const router = useRouter();
      const medicalDocument = reactive<MedicalDocument>(createDefaultMedicalDocument());
      const medicalDocumentService = new MedicalDocumentServiceImpl();
      const currentStep = ref(1);
      const documentPicturePreview = ref<string | null>(null);
      const isLoading = ref(false);
  
      const steps = [
        { label: 'form.basicInfo' },
        { label: 'form.childInfo' },
        { label: 'form.fatherInfo' },
        { label: 'form.motherInfo' },
        { label: 'form.familyInfo' },
        { label: 'form.relativeInfo' },
        { label: 'form.birthInfo' },
        { label: 'form.childDiseases' },
        { label: 'form.psychomotorDevelopment' },
        { label: 'form.examination' },
        { label: 'form.operations' },
        { label: 'form.vaccinations' },
        { label: 'form.psychoanalysis' },
      ];
  
      const updatePreview = () => {
        console.log('Updating preview, documentPicture:', medicalDocument.documentPicture, 'Type:', typeof medicalDocument.documentPicture, 'Instanceof File:', medicalDocument.documentPicture instanceof File, 'Instanceof Blob:', medicalDocument.documentPicture instanceof Blob);
        if (medicalDocument.documentPicture instanceof Blob) {
          if (documentPicturePreview.value) {
            URL.revokeObjectURL(documentPicturePreview.value);
          }
          documentPicturePreview.value = URL.createObjectURL(medicalDocument.documentPicture);
        } else {
          documentPicturePreview.value = null;
          console.warn('documentPicture is not a Blob, setting preview to null');
        }
      };
  
      const formatDate = (date: Date | null): string => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
      };
  
      const convertDates = (doc: MedicalDocument) => {
        if (doc.birthDate) doc.birthDate = new Date(doc.birthDate);
        if (doc.examinationDate) doc.examinationDate = new Date(doc.examinationDate);
        if (doc.child.birthDate) doc.child.birthDate = new Date(doc.child.birthDate);
        if (doc.child.examinationDate) doc.child.examinationDate = new Date(doc.child.examinationDate);
        if (doc.examination.dateBilant) doc.examination.dateBilant = new Date(doc.examination.dateBilant);
        doc.operations.forEach(op => {
          if (op.dateOfSurgery) op.dateOfSurgery = new Date(op.dateOfSurgery);
        });
      };
  
      const updateDate = (event: Event, field: keyof MedicalDocument): void => {
        const input = event.target as HTMLInputElement;
        medicalDocument[field] = input.value ? new Date(input.value) : null;
      };
  
      const updateChildDate = (event: Event, field: keyof MedicalDocument['child']): void => {
        const input = event.target as HTMLInputElement;
        medicalDocument.child[field] = input.value ? new Date(input.value) : null;
      };
  
      const updateExaminationDate = (event: Event, field: keyof MedicalDocument['examination']): void => {
        const input = event.target as HTMLInputElement;
        medicalDocument.examination[field] = input.value ? new Date(input.value) : null;
      };
  
      const updateOperationDate = (event: Event, index: number, field: keyof MedicalDocument['operations'][number]): void => {
        const input = event.target as HTMLInputElement;
        medicalDocument.operations[index][field] = input.value ? new Date(input.value) : null;
      };
  
      const handleFileUpload = (event: Event, index: number): void => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          medicalDocument.childDiseases[index].medicalDocument = input.files[0];
        }
      };
  
      const handleDocumentPictureUpload = (event: Event): void => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          medicalDocument.documentPicture = input.files[0];
          updatePreview();
        }
      };
  
      const addChildDisease = (): void => {
        medicalDocument.childDiseases.push({
          medicalDocument: null,
          stateDescription: '',
          specialistFullName: '',
          phoneNumber: '',
          wilaya: '',
          services: '',
          doctors: '',
        });
      };
  
      const removeChildDisease = (index: number): void => {
        medicalDocument.childDiseases.splice(index, 1);
      };
  
      const addOperation = (): void => {
        medicalDocument.operations.push({
          doctorName: '',
          surgicalDiagnosis: '',
          locationOfSurgery: '',
          dateOfSurgery: null,
          healPeriod: 0,
        });
      };
  
      const removeOperation = (index: number): void => {
        medicalDocument.operations.splice(index, 1);
      };
  
      const addVaccination = (): void => {
        medicalDocument.vaccinations.push({
          year: 0,
          age: 0,
          vaccine: '',
        });
      };
  
      const removeVaccination = (index: number): void => {
        medicalDocument.vaccinations.splice(index, 1);
      };
  
      const nextStep = (): void => {
        if (currentStep.value < steps.length) {
          currentStep.value++;
        }
      };
  
      const prevStep = (): void => {
        if (currentStep.value > 1) {
          currentStep.value--;
        }
      };
  
      const saveDocument = async () => {
        try {
          const originalDocumentPicture = medicalDocument.documentPicture;
          console.log('Saving document before save, documentPicture:', originalDocumentPicture, 'Type:', typeof originalDocumentPicture, 'Instanceof File:', originalDocumentPicture instanceof File);
          const savedDocument = await medicalDocumentService.save(medicalDocument);
          console.log('Saved document from service:', savedDocument);
          Object.assign(medicalDocument, savedDocument);
          medicalDocument.documentPicture = originalDocumentPicture;
          console.log('After restore, documentPicture:', medicalDocument.documentPicture, 'Type:', typeof medicalDocument.documentPicture, 'Instanceof File:', medicalDocument.documentPicture instanceof File);
          if (medicalDocument.documentPicture instanceof Blob) {
            updatePreview();
          } else {
            updatePreview();
            console.warn('No valid documentPicture after save, preview not updated');
          }
          alert(t('form.update') + ' ' + t('form.medicalRecord') + ' successfully' + (medicalDocument.id ? ` (ID: ${medicalDocument.id})` : ''));
          router.isReady().then(() => {
            router.push({ name: 'DisplayCases' });
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          alert(`Failed to save medical document: ${errorMessage}`);
          console.error('Save error details:', error);
        }
      };
  
      onMounted(async () => {
        const id = props.id as string | undefined;
        console.log('Prop id (raw):', id, 'Type:', typeof id);
        if (id && id !== 'undefined' && id.trim() !== '') {
          isLoading.value = true;
          try {
            const loadedDocument = await medicalDocumentService.get(id);
            console.log('Loaded document from service:', loadedDocument);
            if (!loadedDocument || !loadedDocument.id) {
              console.warn('Invalid or empty document loaded for id:', id);
              throw new Error('No valid document data');
            }
            convertDates(loadedDocument);
            Object.assign(medicalDocument, loadedDocument);
            updatePreview();
            currentStep.value = 1;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`Failed to load medical document: ${errorMessage}`);
            console.error('Load error details:', error);
          } finally {
            isLoading.value = false;
          }
        } else {
          console.log('No valid id provided, initializing new document');
          Object.assign(medicalDocument, createDefaultMedicalDocument());
          updatePreview();
          currentStep.value = 1;
        }
      });
  
      return {
        medicalDocument,
        currentStep,
        steps,
        formatDate,
        updateDate,
        updateChildDate,
        updateExaminationDate,
        updateOperationDate,
        handleFileUpload,
        handleDocumentPictureUpload,
        addChildDisease,
        removeChildDisease,
        addOperation,
        removeOperation,
        addVaccination,
        removeVaccination,
        nextStep,
        prevStep,
        saveDocument,
        t,
        documentPicturePreview,
        isLoading,
      };
    },
  });
  </script>
  
  <style scoped>
  .stepper {
    width: 100%;
  }
  
  .steps {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  
  .steps::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #dee2e6;
    z-index: 1;
  }
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #dee2e6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }
  
  .step.active .step-number {
    background-color: #007bff;
    color: white;
  }
  
  .step.completed .step-number {
    background-color: #28a745;
    color: white;
  }
  
  .step-label {
    font-size: 0.9rem;
    text-align: center;
  }
  
  .image-preview {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
  }
  
  .image-preview .placeholder {
    color: #6c757d;
    text-align: center;
    padding: 20px;
    border: 1px dashed #dee2e6;
    border-radius: 4px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>