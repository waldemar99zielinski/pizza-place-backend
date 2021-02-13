
CREATE TABLE addresses (
    adress_id         NUMERIC(5,0) NOT NULL,
    city              VARCHAR(40) NOT NULL,
    street            VARCHAR(95) NOT NULL,
    street_number     NUMERIC(5,0) NOT NULL,
    apartment_number  NUMERIC(5,0),
    PRIMARY KEY (adress_id)
);



CREATE TABLE customers (
    customer_id   NUMERIC(6,0) NOT NULL,
    name          VARCHAR(50) NOT NULL,
    phone_number  CHAR(10) NOT NULL,
    adress_id     NUMERIC(5,0) NOT NULL REFERENCES address ( adress_id ),
    PRIMARY KEY (customer_id)
);



CREATE TABLE customer_orders (
    customer_id  NUMERIC(6,0) NOT NULL REFERENCES customer ( customer_id ),
    date         timestamp NOT NULL,
    total_price  NUMERIC(7,0) NOT NULL,
    CHECK (total_price > 0),
    delivery     char(1) NOT NULL,
    payment      char(1) NOT NULL,
    adress_id    NUMERIC(5,0) NOT NULL REFERENCES address ( adress_id ),
    PRIMARY KEY (customer_id,date)
);



CREATE TABLE extra_toppings (
    extra_topping_code  VARCHAR(15) NOT NULL,
    name                VARCHAR(40) NOT NULL,   
    price               NUMERIC(6,0) NOT NULL,
    CHECK (price > 0),
    description         VARCHAR(4000),
    PRIMARY KEY (extra_topping_code)           
    );

CREATE TABLE pizzas (
    pizza_code      VARCHAR(15) NOT NULL,
    name            VARCHAR(40) NOT NULL,
    description     VARCHAR(4000) NOT NULL,
    price_small     NUMERIC(6,0) NOT NULL,
        CHECK (price_small > 0),
    price_big       NUMERIC(6,0) NOT NULL,
        CHECK (price_big > 0),
    PRIMARY KEY (pizza_code)    
);

CREATE TABLE pizza_orders (
    customer_id         NUMERIC(6,0) NOT NULL,
    pizza_order_number  NUMERIC(6,0) NOT NULL,
    date                timestamp NOT NULL,
    extra_topping_code  VARCHAR(15)  REFERENCES extra_topping ( extra_topping_code ),
    pizza_code          VARCHAR(15) NOT NULL,
    price                NUMERIC(6,0) NOT NULL,
    PRIMARY KEY (customer_id,date,pizza_order_number),
    FOREIGN KEY (customer_id,date)  REFERENCES customer_order ( customer_id,date),
    FOREIGN KEY (pizza_code )  REFERENCES pizza ( pizza_code )
);
