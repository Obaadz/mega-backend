import GovernorateModel from "../models/governorateModel.js";
import CityModel from "../models/cityModel.js";

export default async (res, req, ctx) => {
  if (req.method === "post") {
    await GovernorateModel.updateMany(
      {},
      {
        $unset: {
          cities: 1,
        },
      }
    );
  }

  const dbGovernorates = await GovernorateModel.find({});

  const cities = await CityModel.find({});

  dbGovernorates.forEach(async (governorate) => {
    const governorateCities = cities.filter((city) => {
      return city.governorate?._id.toJSON() == governorate._id.toJSON();
    });

    await governorate.updateOne({
      $addToSet: {
        cities: governorateCities,
      },
    });
  });

  return res;
};
