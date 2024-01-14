import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

function SearchResults({ cars }) {
  return (
    <div>
      <div className="bg-slate-200 py-20 pl-4">
        <h2 className="text-4xl font-bold text-black mb-4">Search Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {Array.isArray(cars) &&
            cars.map((car) => (
              <Card key={car.id} className="w-92 mb-4">
                <CardHeader shadow={false} floated={false} className="h-96">
                  <img
                    src={car.car_photo}
                    alt="car-image"
                    className="h-full w-full object-full"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {car.brand} {car.car_name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      ${car.price} / day
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                  >
                    {car.description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link
                    to={`/browse-car/${car.id}`}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    View Details
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
