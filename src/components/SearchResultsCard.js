import React from "react";
import { connect } from "react-redux";
import { Card, Header } from "semantic-ui-react";
import Image from "react-graceful-image";

const SearchResultsCard = props => {
  const stockImage =
    props.info.hasOwnProperty("stock_image") &&
    props.info.stock_image.image_url;
  //used this stock photo as the photos given in PCO mode are pretty ugly compared to Consumer!
  const genericImage =
    "https://direct.leaseplan.co.uk/Themes/LeasePlan/Content/Images/Car-placeholder.png";
  const hireTypeBasedUrl =
    props.hireType === "Consumer" ? stockImage : genericImage;

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
        src={hireTypeBasedUrl}
        alt={hireTypeBasedUrl}
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
      <hr />
      {props.hireType === "PCO" && (
        <div className="card-bottom-icon">
          Located in {props.info.postcode}
          <small>Available from {props.info.available_start_date}</small>
          <img src="transmission.svg" />
          {props.info.transmission}
          <img src="fuel.svg" />
          {props.info.fuel}
          <img src="jurisdiction.svg" />
          {props.info.city_jurisdiction}
        </div>
      )}
    </Card>
  );
};

// src={props.info.stock_image.image_url || props.info.images[0].image_url}
// alt={props.info.stock_image.image_url || props.info.images[0].image_url}

const mapStateToProps = state => {
  return {
    hireType: state.data.criteria.vehicle_type
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchResultsCard);
