CREATE TABLE addresses (
    address_id         SERIAL,
    city              VARCHAR(40) NOT NULL,
    street            VARCHAR(95) NOT NULL,
    street_number     NUMERIC(5,0) NOT NULL,
    apartment_number  NUMERIC(5,0),
    PRIMARY KEY (address_id)
);



CREATE TABLE customers (
    customer_id   SERIAL,
    name          VARCHAR(50) NOT NULL,
    phone_number  CHAR(10) NOT NULL,
    address_id     INTEGER REFERENCES addresses ( address_id ),
    PRIMARY KEY (customer_id)
);



CREATE TABLE customer_orders (
    customer_id  INTEGER REFERENCES customers ( customer_id ),
    date         timestamptz NOT NULL,
    total_price  NUMERIC(7,0) NOT NULL,
    CHECK (total_price > 0),
    delivery     char(1) NOT NULL,
    payment      char(1) NOT NULL,
    PRIMARY KEY (customer_id,date),
    constraint payment_check CHECK (payment in ('R', 'C')),
    constraint delivery_check CHECK (delivery in ('Y', 'N'))
    
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
    customer_id         INTEGER NOT NULL,
    date                timestamp NOT NULL,
    pizza_order_number  NUMERIC(6,0) NOT NULL,
    extra_topping_code  VARCHAR(15)  REFERENCES extra_toppings ( extra_topping_code ),
    pizza_code          VARCHAR(15) NOT NULL,
    size                char(1) NOT NULL,
    PRIMARY KEY (customer_id,date,pizza_order_number),
    FOREIGN KEY (customer_id,date)  REFERENCES customer_orders ( customer_id,date) ON DELETE CASCADE,
    FOREIGN KEY (pizza_code )  REFERENCES pizzas ( pizza_code ),
    constraint size_check CHECK (size in ('S', 'L'))
);

COMMENT ON COLUMN customer_orders.delivery IS 'One character input, Y-yes or N-no';
COMMENT ON COLUMN customer_orders.payment IS 'One character input, R-ready money/cash or C-card';
COMMENT ON COLUMN pizza_orders.size IS 'One character input, S-small or L-large';
