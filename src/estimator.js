
const durationNormalizer = (periodType, timeToElapse) => {
  if (periodType === 'days') {
    return timeToElapse;
  } if (periodType === 'weeks') {
    return timeToElapse * 7;
  }
  return timeToElapse * 30;
};

const covid19ImpactEstimator = ({ data }) => {
  // Challange 1:
  const currentlyInfectedForImpact = data.reportedCases * 10;
  const currentlyInfectedForsevereImpact = data.reportedCases * 50;
  const infectionsByRequestedTimeFI = currentlyInfectedForImpact * 512;
  const infectionsByRequestedTimeFSI = currentlyInfectedForsevereImpact * 512;
  // Challange II:
  const severeCasesByRequestedTimeForImpact = infectionsByRequestedTimeFI * 0.15;
  const severeCasesByRequestedTimeForSevereImpact = infectionsByRequestedTimeFSI * 0.15;
  const totalHospitalBedsAt95Percent = data.totalHospitalBeds * 0.95;
  const bedsAlreadyOccupied = totalHospitalBedsAt95Percent * 0.65;
  const availableBedsAfter65P = totalHospitalBedsAt95Percent - bedsAlreadyOccupied;
  const severeCasesByRequestedTimeFI35P = severeCasesByRequestedTimeForImpact * 0.35;
  const severeCasesByRequestedTimeFSI35 = severeCasesByRequestedTimeForSevereImpact * 0.35;
  const hospitalBedsByRequestedTimeFI = availableBedsAfter65P - severeCasesByRequestedTimeFI35P;
  const hospitalBedsByRequestedTimeFSI = availableBedsAfter65P - severeCasesByRequestedTimeFSI35;
  // challange III:
  const casesForICUByRequestedTimeForImpact = infectionsByRequestedTimeFI * 0.05;
  const casesForICUByRequestedTimeForServereImpact = infectionsByRequestedTimeFSI * 0.05;
  const casesForVentilatorsByRequestedTimeForImpact = infectionsByRequestedTimeFI * 0.02;
  const casesForVentilatorsByRequestedTimeForServereImpact = infectionsByRequestedTimeFSI;
  const dollarsInFlightforImpact = infectionsByRequestedTimeFI * data.region.avgDailyIncomeInUSD;
  const dollarsInFlightfFSI = infectionsByRequestedTimeFSI * data.region.avgDailyIncomeInUSD;

  return {
    impact: {
      currentlyInfected: currentlyInfectedForImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeFI,
      severeCasesByRequestedTime: severeCasesByRequestedTimeForImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeFI,
      casesForICUByRequestedTime: casesForICUByRequestedTimeForImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeForImpact,
      dollarsInFlight: dollarsInFlightforImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedForsevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeFSI,
      severeCasesByRequestedTime: severeCasesByRequestedTimeForSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeFSI,
      casesForICUByRequestedTime: casesForICUByRequestedTimeForServereImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeForServereImpact,
      dollarsInFlight: dollarsInFlightfFSI
    },
    periodType: data.periodType,
    timeToElapse: durationNormalizer(data.periodType, data.timeToElapse),
    reportedCases: data.reportedCases,
    population: data.population,
    totalHospitalBeds: data.totalHospitalBeds,
    region: {
      name: data.region.name,
      avgAge: data.region.avgAge,
      avgDailyIncomeInUSD: data.region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: data.region.avgDailyIncomePopulation
    }
  };
};

exports.covid19ImpactEstimator = covid19ImpactEstimator;
