
CREATE TABLE address (
    adress_id         NUMERIC(5,0) NOT NULL,
    city              VARCHAR(40) NOT NULL,
    street            VARCHAR(95) NOT NULL,
    street_number     NUMERIC(5,0) NOT NULL,
    apartment_number  NUMERIC(5,0),
    PRIMARY KEY (adress_id)
);



CREATE TABLE customer (
    customer_id   NUMERIC(6,0) NOT NULL,
    name          VARCHAR(50) NOT NULL,
    phone_number  CHAR(10) NOT NULL,
    adress_id     NUMERIC(5,0) NOT NULL REFERENCES address ( adress_id ),
    PRIMARY KEY (customer_id)
);



CREATE TABLE customer_order (
    customer_id  NUMERIC(6,0) NOT NULL REFERENCES customer ( customer_id ),
    date         timestamp NOT NULL,
    total_price  NUMERIC(7,0) NOT NULL,
    CHECK (total_price > 0),
    delivery     char(1) NOT NULL,
    payment      char(1) NOT NULL,
    adress_id    NUMERIC(5,0) NOT NULL REFERENCES address ( adress_id ),
    PRIMARY KEY (customer_id,date)
);



CREATE TABLE extra_topping (
    extra_topping_code  VARCHAR(15) NOT NULL,
    name                VARCHAR(40) NOT NULL,   
    price               NUMERIC(6,0) NOT NULL,
    CHECK (price > 0),
    description         VARCHAR(4000),
    PRIMARY KEY (extra_topping_code)           
    );

CREATE TABLE pizza (
    pizza_code      VARCHAR(15) NOT NULL,
    name            VARCHAR(40) NOT NULL,
    description     VARCHAR(4000) NOT NULL,
    price_small     NUMERIC(6,0) NOT NULL,
        CHECK (price_small > 0),
    price_big       NUMERIC(6,0) NOT NULL,
        CHECK (price_big > 0),
    PRIMARY KEY (pizza_code)    
);

CREATE TABLE pizza_order (
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






-- ALTER TABLE customer
--     ADD CONSTRAINT customer_address_fk FOREIGN KEY ( adress_id )
--         REFERENCES address ( adress_id );

-- ALTER TABLE customer_order
--     ADD CONSTRAINT customer_order_address_fk FOREIGN KEY ( adress_id )
--         REFERENCES address ( adress_id );

-- ALTER TABLE customer_order
--     ADD CONSTRAINT customer_order_customer_fk FOREIGN KEY ( customer_id )
--         REFERENCES customer ( customer_id );

-- ALTER TABLE pizza_order
--     ADD CONSTRAINT pizza_order_customer_order_fk FOREIGN KEY ( customer_id,
--                                                                "Date" )
--         REFERENCES customer_order ( customer_id,
--                                     "Date" );

-- ALTER TABLE pizza_order
--     ADD CONSTRAINT pizza_order_extra_topping_fk FOREIGN KEY ( extra_topping_code )
--         REFERENCES extra_topping ( extra_topping_code );

-- ALTER TABLE pizza_order
--     ADD CONSTRAINT pizza_order_pizza_size_fk FOREIGN KEY ( pizza_size_code,
--                                                            pizza_code )
--         REFERENCES pizza_size ( pizza_size_code,
--                                 pizza_code );

-- ALTER TABLE pizza_size
--     ADD CONSTRAINT pizza_size_pizza_fk FOREIGN KEY ( pizza_code )
--         REFERENCES pizza ( pizza_code );

