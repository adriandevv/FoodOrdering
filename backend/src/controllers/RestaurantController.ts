import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurants = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};
    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      return res
        .status(404)
        .json({ data: [], pagination: { total: 0, page: 1, pages: 0 } });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: searchRegex } },
      ];
    }

    const pageSize = 10;
    const skip = pageSize * (page - 1);
    console.log(query);

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();
    const total = await Restaurant.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: totalPages,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching restaurants" });
  }
};

const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant
      .findById(restaurantId)
      .lean();
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting restaurant" });
  }
}



export default {
  searchRestaurants,
getRestaurantById
};
