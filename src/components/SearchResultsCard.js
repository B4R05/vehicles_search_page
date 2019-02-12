import React from "react";
import { Card, Header } from "semantic-ui-react";
import Image from "react-graceful-image";

const SearchResultsCard = props => {
  return (
    <Card>
      <div className="card__top--flex">
        {props.info.brand_new && (
          <div className="card__top--ribbon">Brand new!</div>
        )}

        <div>
          <h2>£{props.info.reference_owner_price_pence / 100}</h2>{" "}
          <div>
            <small>A Month</small>
          </div>
        </div>
      </div>

      <Image
        src={props.info.stock_image.image_url}
        alt={props.info.stock_image.image_url}
        width="100%"
        height="100%"
        placeholderColor="rgb(245, 245, 245)"
      />
      <div className="card__bottom--flex">
        <div>
          <small>
            {props.info.year} {props.info.vehicle_make}
          </small>
          <h2>{props.info.vehicle_model}</h2>
        </div>
      </div>
    </Card>
  );
};

export default SearchResultsCard;
