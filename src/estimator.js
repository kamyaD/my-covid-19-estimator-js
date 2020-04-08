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

const covid19ImpactEstimator = (data) => {
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

  return {
    impact: {
      currentlyInfected: currentlyInfectedForImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeForImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedForsevereImpact,
      infectionsByRequestedTime: infectionsByRequestedTimeForSevereImpact

    },
    periodType: input.periodType,
    timeToElapse: input.timeToElapse,
    reportedCases: input.reportedCases,
    population: input.population,
    totalHospitalBeds: input.totalHospitalBeds,
    region: {
      name: input.region.name,
      avgAge: input.region.avgAge,
      avgDailyIncomeInUSD: input.region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: input.region.avgDailyIncomePopulation
    }
  };
};

export default covid19ImpactEstimator;
