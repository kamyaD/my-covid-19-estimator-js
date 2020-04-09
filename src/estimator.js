const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
  
const covid19ImpactEstimator = ({ data }) => {
  // Challange 1:
  const currentlyInfectedForImpact = data.reportedCases * 10;
  const currentlyInfectedForsevereImpact = data.reportedCases * 50;
  const infectionsByRequestedTimeForImpact = currentlyInfectedForImpact * 512;
  const infectionsByRequestedTimeForSevereImpact = currentlyInfectedForsevereImpact * 512;
  
  // Challange II:
  const severeCasesByRequestedTimeForImpact = infectionsByRequestedTimeForImpact * 0.15;
  const severeCasesByRequestedTimeForSevereImpact = infectionsByRequestedTimeForSevereImpact * 0.15;
  const totalHospitalBedsAt95Percent = data.totalHospitalBeds * 0.95;
  const bedsAlreadyOccupied = totalHospitalBedsAt95Percent * 0.65;
  
  const availableBedsAfter65PercentOccupied = totalHospitalBedsAt95Percent - bedsAlreadyOccupied;
  const severeCasesByRequestedTimeForImpactAt35Percent = severeCasesByRequestedTimeForImpact * 0.35;
  const severeCasesByRequestedTimeForSevereImpactAt35Percent = severeCasesByRequestedTimeForSevereImpact * 0.35;
  const hospitalBedsByRequestedTimeForImpact = availableBedsAfter65PercentOccupied - severeCasesByRequestedTimeForImpactAt35Percent;
  const hospitalBedsByRequestedTimeForSevereImpact = availableBedsAfter65PercentOccupied - severeCasesByRequestedTimeForSevereImpactAt35Percent;
  
  // challange III:
  const casesForICUByRequestedTimeForImpact = infectionsByRequestedTimeForImpact * 0.05;
  const casesForICUByRequestedTimeForServereImpact = infectionsByRequestedTimeForSevereImpact * 0.05;
  
  const casesForVentilatorsByRequestedTimeForImpact = infectionsByRequestedTimeForImpact * 0.02;
  const casesForVentilatorsByRequestedTimeForServereImpact = infectionsByRequestedTimeForSevereImpact;
  const dollarsInFlightforImpact = infectionsByRequestedTimeForImpact * data.region.avgDailyIncomeInUSD;
  const dollarsInFlightfForServereImpact = infectionsByRequestedTimeForSevereImpact * data.region.avgDailyIncomeInUSD;

  return {
    impact: {
      currentlyInfected: currentlyInfectedForImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeForImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeForImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeForImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeForImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeForImpact,
      dollarsInFlight: dollarsInFlightforImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedForsevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeForSevereImpact,
      severeCasesByRequestedTime: severeCasesByRequestedTimeForSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeForSevereImpact,
      casesForICUByRequestedTime: casesForICUByRequestedTimeForServereImpact,
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeForServereImpact,
      dollarsInFlight: dollarsInFlightfForServereImpact
    },
    periodType: data.periodType,
    timeToElapse: data.timeToElapse,
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